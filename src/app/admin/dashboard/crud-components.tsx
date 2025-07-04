
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
import { PlusCircle, Edit } from "lucide-react";
import type { Activity, Amenity, Review, Facility, FAQ } from '@/lib/content';
import { useToast } from '@/hooks/use-toast';
import {
    addAmenity, updateAmenity, deleteAmenity,
    addActivity, updateActivity, deleteActivity,
    addReview, updateReview, deleteReview,
    addFacility, updateFacility, deleteFacility,
    addFaq, updateFaq, deleteFaq,
} from '@/app/actions/content-actions';
import { DeleteActionButton } from './delete-action-button';

// AMENITIES
function AmenityForm({ amenity, onDone }: { amenity?: Amenity, onDone: () => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const action = amenity 
        ? updateAmenity.bind(null, amenity.id) 
        : addAmenity;

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const result = await action(formData);
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
            onDone();
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
        setIsSubmitting(false);
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <fieldset className="space-y-4" disabled={isSubmitting}>
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
            </fieldset>
            <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (amenity ? 'Save Changes' : 'Add Amenity')}
                </Button>
            </DialogFooter>
        </form>
    );
}

function AmenityRow({ amenity }: { amenity: Amenity }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    
    return (
        <TableRow>
            <TableCell>{amenity.text}</TableCell>
            <TableCell className="hidden sm:table-cell">{amenity.icon}</TableCell>
            <TableCell className="hidden md:table-cell">{amenity.sort_order}</TableCell>
            <TableCell className="text-right">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit /></Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Edit Amenity</DialogTitle></DialogHeader>
                        <AmenityForm amenity={amenity} onDone={() => setIsEditOpen(false)} />
                    </DialogContent>
                </Dialog>
                <DeleteActionButton 
                    itemName={amenity.text}
                    deleteAction={deleteAmenity.bind(null, amenity.id)}
                />
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
                    <TableHeader><TableRow>
                        <TableHead>Text</TableHead>
                        <TableHead className="hidden sm:table-cell">Icon</TableHead>
                        <TableHead className="hidden md:table-cell">Order</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow></TableHeader>
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const action = activity 
        ? updateActivity.bind(null, activity.id) 
        : addActivity;

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const result = await action(formData);
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
            onDone();
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
        setIsSubmitting(false);
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <fieldset className="space-y-4" disabled={isSubmitting}>
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
                    <p className="text-xs text-muted-foreground mt-1">Use any icon name from <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">lucide.dev</a>.</p>
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
            </fieldset>
            <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (activity ? 'Save Changes' : 'Add Activity')}
                </Button>
            </DialogFooter>
        </form>
    );
}

function ActivityRow({ activity }: { activity: Activity }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

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
            <TableCell className="hidden md:table-cell max-w-sm truncate">{activity.description}</TableCell>
            <TableCell className="hidden sm:table-cell">{activity.icon}</TableCell>
            <TableCell className="hidden lg:table-cell">{activity.sort_order}</TableCell>
            <TableCell className="text-right">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit /></Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Edit Activity</DialogTitle></DialogHeader>
                        <ActivityForm activity={activity} onDone={() => setIsEditOpen(false)} />
                    </DialogContent>
                </Dialog>
                <DeleteActionButton 
                    itemName={activity.title}
                    deleteAction={deleteActivity.bind(null, activity.id)}
                />
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
                    <TableHeader><TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead className="hidden sm:table-cell">Icon</TableHead>
                        <TableHead className="hidden lg:table-cell">Order</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow></TableHeader>
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const action = review
        ? updateReview.bind(null, review.id)
        : addReview;
    
    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const result = await action(formData);
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
            onDone();
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
        setIsSubmitting(false);
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <fieldset className="space-y-4" disabled={isSubmitting}>
                <div>
                    <Label htmlFor="quote">Quote</Label>
                    <Textarea id="quote" name="quote" defaultValue={review?.quote} required />
                </div>
                <div>
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" name="author" defaultValue={review?.author} required />
                </div>
                <div>
                    <Label htmlFor="source">Source (e.g. Airbnb, Google)</Label>
                    <Input id="source" name="source" defaultValue={review?.source ?? ''} placeholder="Airbnb" />
                </div>
                <div>
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input id="rating" name="rating" type="number" min="1" max="5" step="0.5" defaultValue={review?.rating} required />
                </div>
                <div>
                    <Label htmlFor="sort_order">Sort Order</Label>
                    <Input id="sort_order" name="sort_order" type="number" defaultValue={review?.sort_order ?? 0} required />
                </div>
            </fieldset>
            <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (review ? 'Save Changes' : 'Add Review')}
                </Button>
            </DialogFooter>
        </form>
    );
}

function ReviewRow({ review }: { review: Review }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <TableRow>
            <TableCell>{review.author}</TableCell>
            <TableCell className="hidden md:table-cell max-w-sm truncate">"{review.quote}"</TableCell>
            <TableCell className="hidden sm:table-cell">{review.source}</TableCell>
            <TableCell>{review.rating} / 5</TableCell>
            <TableCell className="hidden lg:table-cell">{review.sort_order}</TableCell>
            <TableCell className="text-right">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit /></Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Edit Review</DialogTitle></DialogHeader>
                        <ReviewForm review={review} onDone={() => setIsEditOpen(false)} />
                    </DialogContent>
                </Dialog>
                <DeleteActionButton 
                    itemName={`review by ${review.author}`}
                    deleteAction={deleteReview.bind(null, review.id)}
                />
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
                    <TableHeader><TableRow>
                        <TableHead>Author</TableHead>
                        <TableHead className="hidden md:table-cell">Quote</TableHead>
                        <TableHead className="hidden sm:table-cell">Source</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="hidden lg:table-cell">Order</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                        {reviews.map(item => <ReviewRow key={item.id} review={item} />)}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

// FACILITIES
function FacilityForm({ facility, onDone }: { facility?: Facility, onDone: () => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const action = facility ? updateFacility.bind(null, facility.id) : addFacility;

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const result = await action(formData);
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
            onDone();
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
        setIsSubmitting(false);
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <fieldset className="space-y-4" disabled={isSubmitting}>
                <div>
                    <Label htmlFor="category">Category Title</Label>
                    <Input id="category" name="category" defaultValue={facility?.category} required />
                </div>
                <div>
                    <Label htmlFor="icon">Icon Name</Label>
                    <Input id="icon" name="icon" defaultValue={facility?.icon} placeholder="e.g., ZapOff, Car" required />
                     <p className="text-xs text-muted-foreground mt-1">Use any icon name from <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">lucide.dev</a>.</p>
                </div>
                <div>
                    <Label htmlFor="items">List Items (one per line)</Label>
                    <Textarea id="items" name="items" defaultValue={facility?.items} required rows={5} />
                </div>
                <div>
                    <Label htmlFor="sort_order">Sort Order</Label>
                    <Input id="sort_order" name="sort_order" type="number" defaultValue={facility?.sort_order ?? 0} required />
                </div>
            </fieldset>
            <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (facility ? 'Save Changes' : 'Add Facility Category')}
                </Button>
            </DialogFooter>
        </form>
    );
}

function FacilityRow({ facility }: { facility: Facility }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <TableRow>
            <TableCell>{facility.category}</TableCell>
            <TableCell className="hidden sm:table-cell">{facility.icon}</TableCell>
            <TableCell className="hidden md:table-cell max-w-sm truncate">{facility.items}</TableCell>
            <TableCell className="hidden lg:table-cell">{facility.sort_order}</TableCell>
            <TableCell className="text-right">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit /></Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Edit Facility Category</DialogTitle></DialogHeader><FacilityForm facility={facility} onDone={() => setIsEditOpen(false)} /></DialogContent>
                </Dialog>
                <DeleteActionButton 
                    itemName={facility.category}
                    deleteAction={deleteFacility.bind(null, facility.id)}
                />
            </TableCell>
        </TableRow>
    );
}

export function FacilitiesClientPage({ facilities }: { facilities: Facility[] }) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center"><CardTitle>Manage Facility Categories</CardTitle>
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild><Button><PlusCircle className="mr-2"/> Add Category</Button></DialogTrigger>
                        <DialogContent><DialogHeader><DialogTitle>Add New Facility Category</DialogTitle></DialogHeader><FacilityForm onDone={() => setIsAddOpen(false)} /></DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden sm:table-cell">Icon</TableHead>
                        <TableHead className="hidden md:table-cell">Items</TableHead>
                        <TableHead className="hidden lg:table-cell">Order</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>{facilities.map(item => <FacilityRow key={item.id} facility={item} />)}</TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


// FAQs
function FaqForm({ faq, onDone }: { faq?: FAQ, onDone: () => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const action = faq ? updateFaq.bind(null, faq.id) : addFaq;

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const result = await action(formData);
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
            onDone();
        } else {
            toast({ variant: 'destructive', title: 'An error occurred', description: result.message });
        }
        setIsSubmitting(false);
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <fieldset className="space-y-4" disabled={isSubmitting}>
                <div>
                    <Label htmlFor="question">Question</Label>
                    <Input id="question" name="question" defaultValue={faq?.question} required />
                </div>
                <div>
                    <Label htmlFor="answer">Answer</Label>
                    <Textarea id="answer" name="answer" defaultValue={faq?.answer} required rows={5} />
                </div>
                <div>
                    <Label htmlFor="sort_order">Sort Order</Label>
                    <Input id="sort_order" name="sort_order" type="number" defaultValue={faq?.sort_order ?? 0} required />
                </div>
            </fieldset>
            <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (faq ? 'Save Changes' : 'Add FAQ')}
                </Button>
            </DialogFooter>
        </form>
    );
}

function FaqRow({ faq }: { faq: FAQ }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <TableRow>
            <TableCell className="font-medium">{faq.question}</TableCell>
            <TableCell className="hidden md:table-cell max-w-sm truncate">{faq.answer}</TableCell>
            <TableCell className="hidden lg:table-cell">{faq.sort_order}</TableCell>
            <TableCell className="text-right">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit /></Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Edit FAQ</DialogTitle></DialogHeader><FaqForm faq={faq} onDone={() => setIsEditOpen(false)} /></DialogContent>
                </Dialog>
                <DeleteActionButton 
                    itemName={faq.question}
                    deleteAction={deleteFaq.bind(null, faq.id)}
                />
            </TableCell>
        </TableRow>
    );
}

export function FaqsClientPage({ faqs }: { faqs: FAQ[] }) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center"><CardTitle>Manage FAQs</CardTitle>
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild><Button><PlusCircle className="mr-2"/> Add FAQ</Button></DialogTrigger>
                        <DialogContent><DialogHeader><DialogTitle>Add New FAQ</DialogTitle></DialogHeader><FaqForm onDone={() => setIsAddOpen(false)} /></DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead className="hidden md:table-cell">Answer</TableHead>
                        <TableHead className="hidden lg:table-cell">Order</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>{faqs.map(item => <FaqRow key={item.id} faq={item} />)}</TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
