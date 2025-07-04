
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import type { Activity, Amenity, Review } from '@/lib/content';
import { useToast } from '@/hooks/use-toast';
import {
    addAmenity, updateAmenity, deleteAmenity,
    addActivity, updateActivity, deleteActivity,
    addReview, updateReview, deleteReview,
} from '@/app/actions/content-actions';


// AMENITIES
function AmenityForm({ amenity, onDone }: { amenity?: Amenity, onDone: () => void }) {
    const { toast } = useToast();
    const action = amenity 
        ? updateAmenity.bind(null, amenity.id) 
        : addAmenity;

    async function handleSubmit(formData: FormData) {
        const result = await action(formData);
        if (result.success) {
            toast({ title: amenity ? 'Amenity Updated' : 'Amenity Added', description: 'Your changes have been saved successfully.' });
            onDone();
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="text">Amenity Text</Label>
                <Input id="text" name="text" defaultValue={amenity?.text} required />
            </div>
            <div>
                <Label htmlFor="icon">Icon Name</Label>
                <Input id="icon" name="icon" defaultValue={amenity?.icon} placeholder="e.g., Wifi, Wind" required />
                <p className="text-xs text-muted-foreground mt-1">Use any icon name from <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">lucide.dev</a>.</p>
            </div>
             <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input id="sort_order" name="sort_order" type="number" defaultValue={amenity?.sort_order ?? 0} required />
            </div>
            <DialogFooter>
                <Button type="submit">{amenity ? 'Save Changes' : 'Add Amenity'}</Button>
            </DialogFooter>
        </form>
    );
}

function AmenityRow({ amenity }: { amenity: Amenity }) {
    const { toast } = useToast();
    const [isEditOpen, setIsEditOpen] = useState(false);
    
    async function handleDelete() {
        if (!confirm(`Are you sure you want to delete the amenity "${amenity.text}"?`)) return;
        const result = await deleteAmenity(amenity.id);
        if (result.success) {
            toast({ title: 'Amenity Deleted', description: `The amenity "${amenity.text}" has been removed.` });
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
    }

    return (
        <TableRow>
            <TableCell>{amenity.text}</TableCell>
            <TableCell>{amenity.icon}</TableCell>
            <TableCell>{amenity.sort_order}</TableCell>
            <TableCell className="text-right">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit /></Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Edit Amenity</DialogTitle></DialogHeader>
                        <AmenityForm amenity={amenity} onDone={() => setIsEditOpen(false)} />
                    </DialogContent>
                </Dialog>
                <form action={handleDelete} className="inline-block">
                    <Button type="submit" variant="ghost" size="icon" className="text-destructive"><Trash2 /></Button>
                </form>
            </TableCell>
        </TableRow>
    );
}

export function AmenitiesClientPage({ amenities }: { amenities: Amenity[] }) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Manage Amenities</CardTitle>
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild><Button><PlusCircle className="mr-2"/> Add Amenity</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Amenity</DialogTitle>
                            </DialogHeader>
                            <AmenityForm onDone={() => setIsAddOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Text</TableHead><TableHead>Icon</TableHead><TableHead>Order</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {amenities.map(item => <AmenityRow key={item.id} amenity={item} />)}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


// ACTIVITIES
function ActivityForm({ activity, onDone }: { activity?: Activity, onDone: () => void }) {
    const { toast } = useToast();
    const action = activity 
        ? updateActivity.bind(null, activity.id) 
        : addActivity;

    async function handleSubmit(formData: FormData) {
        const result = await action(formData);
        if (result.success) {
            toast({ title: activity ? 'Activity Updated' : 'Activity Added', description: 'Your changes have been saved successfully.' });
            onDone();
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={activity?.title} required />
            </div>
             <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={activity?.description} required />
            </div>
            <div>
                <Label htmlFor="icon">Icon Name</Label>
                <Input id="icon" name="icon" defaultValue={activity?.icon} placeholder="e.g., Mountain, Wine" required />
            </div>
             <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input id="sort_order" name="sort_order" type="number" defaultValue={activity?.sort_order ?? 0} required />
            </div>
            <div>
                <Label htmlFor="image">Activity Image</Label>
                {activity?.image_src && (
                    <div className="my-2">
                        <p className="text-sm text-muted-foreground mb-2">Current Image:</p>
                        <Image src={activity.image_src} alt={activity.title} width={100} height={60} className="rounded-md object-cover" />
                    </div>
                )}
                <Input id="image" name="image" type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground mt-1">{activity?.image_src ? 'Leave blank to keep the current image.' : 'Upload an image for this activity.'}</p>
            </div>
            <DialogFooter>
                <Button type="submit">{activity ? 'Save Changes' : 'Add Activity'}</Button>
            </DialogFooter>
        </form>
    );
}

function ActivityRow({ activity }: { activity: Activity }) {
    const { toast } = useToast();
    const [isEditOpen, setIsEditOpen] = useState(false);

    async function handleDelete() {
        if (!confirm(`Are you sure you want to delete the activity "${activity.title}"?`)) return;
        const result = await deleteActivity(activity.id);
        if (result.success) {
            toast({ title: 'Activity Deleted', description: `The activity "${activity.title}" has been removed.` });
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
    }

    return (
        <TableRow>
             <TableCell>
                {activity.image_src ? (
                     <Image src={activity.image_src} alt={activity.title} width={64} height={48} className="rounded-md object-cover" />
                ) : (
                    <div className="w-16 h-12 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                )}
            </TableCell>
            <TableCell>{activity.title}</TableCell>
            <TableCell className="max-w-sm truncate">{activity.description}</TableCell>
            <TableCell>{activity.icon}</TableCell>
            <TableCell>{activity.sort_order}</TableCell>
            <TableCell className="text-right">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit /></Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Edit Activity</DialogTitle></DialogHeader>
                        <ActivityForm activity={activity} onDone={() => setIsEditOpen(false)} />
                    </DialogContent>
                </Dialog>
                <form action={handleDelete} className="inline-block">
                    <Button type="submit" variant="ghost" size="icon" className="text-destructive"><Trash2 /></Button>
                </form>
            </TableCell>
        </TableRow>
    );
}

export function ActivitiesClientPage({ activities }: { activities: Activity[] }) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Manage Activities</CardTitle>
                     <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild><Button><PlusCircle className="mr-2"/> Add Activity</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add New Activity</DialogTitle></DialogHeader>
                            <ActivityForm onDone={() => setIsAddOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Image</TableHead><TableHead>Title</TableHead><TableHead>Description</TableHead><TableHead>Icon</TableHead><TableHead>Order</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {activities.map(item => <ActivityRow key={item.id} activity={item} />)}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


// REVIEWS
function ReviewForm({ review, onDone }: { review?: Review, onDone: () => void }) {
    const { toast } = useToast();
    const action = review
        ? updateReview.bind(null, review.id)
        : addReview;
    
    async function handleSubmit(formData: FormData) {
        const result = await action(formData);
        if (result.success) {
            toast({ title: review ? 'Review Updated' : 'Review Added', description: 'Your changes have been saved successfully.' });
            onDone();
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="quote">Quote</Label>
                <Textarea id="quote" name="quote" defaultValue={review?.quote} required />
            </div>
            <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" defaultValue={review?.author} required />
            </div>
            <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input id="rating" name="rating" type="number" min="1" max="5" step="0.5" defaultValue={review?.rating} required />
            </div>
            <div>
                <Label htmlFor="source">Source (Optional)</Label>
                <Input id="source" name="source" defaultValue={review?.source || ''} placeholder="e.g., Google, Airbnb" />
            </div>
            <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input id="sort_order" name="sort_order" type="number" defaultValue={review?.sort_order ?? 0} required />
            </div>
            <DialogFooter>
                <Button type="submit">{review ? 'Save Changes' : 'Add Review'}</Button>
            </DialogFooter>
        </form>
    );
}

function ReviewRow({ review }: { review: Review }) {
    const { toast } = useToast();
    const [isEditOpen, setIsEditOpen] = useState(false);

    async function handleDelete() {
        if (!confirm(`Are you sure you want to delete the review by "${review.author}"?`)) return;
        const result = await deleteReview(review.id);
        if (result.success) {
            toast({ title: 'Review Deleted', description: `The review by "${review.author}" has been removed.` });
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
    }

    return (
        <TableRow>
            <TableCell>{review.author}</TableCell>
            <TableCell className="max-w-sm truncate">"{review.quote}"</TableCell>
            <TableCell>{review.rating} / 5</TableCell>
            <TableCell>{review.source || 'N/A'}</TableCell>
            <TableCell>{review.sort_order}</TableCell>
            <TableCell className="text-right">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit /></Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Edit Review</DialogTitle></DialogHeader>
                        <ReviewForm review={review} onDone={() => setIsEditOpen(false)} />
                    </DialogContent>
                </Dialog>
                <form action={handleDelete} className="inline-block">
                    <Button type="submit" variant="ghost" size="icon" className="text-destructive"><Trash2 /></Button>
                </form>
            </TableCell>
        </TableRow>
    );
}

export function ReviewsClientPage({ reviews }: { reviews: Review[] }) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Manage Reviews</CardTitle>
                     <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild><Button><PlusCircle className="mr-2"/> Add Review</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add New Review</DialogTitle></DialogHeader>
                            <ReviewForm onDone={() => setIsAddOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Author</TableHead><TableHead>Quote</TableHead><TableHead>Rating</TableHead><TableHead>Source</TableHead><TableHead>Order</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {reviews.map(item => <ReviewRow key={item.id} review={item} />)}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
