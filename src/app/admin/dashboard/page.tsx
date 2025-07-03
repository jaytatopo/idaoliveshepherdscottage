import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, GripVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { revalidatePath } from 'next/cache';
import { updateContent, deleteGalleryImage, uploadGalleryImage } from "@/app/actions/content-actions";
import { getContent, getAmenities, getActivities, getGalleryImages, getReviews, getInquiries } from '@/lib/content';
import { InquiriesTab, ActivitiesTab, ReviewsTab, AmenitiesTab } from './management-tabs';

export default async function DashboardPage() {
    const inquiries = await getInquiries();
    const content = await getContent();
    const amenities = await getAmenities();
    const activities = await getActivities();
    const reviews = await getReviews();
    const accommodationImages = await getGalleryImages('accommodation');
    const heroImage = (await getGalleryImages('hero'))[0];
    const reviewsImage = (await getGalleryImages('reviews'))[0];

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage your website content and view inquiries.</p>
                </div>
                <form action={async () => { 'use server'; revalidatePath('/'); revalidatePath('/admin/dashboard'); }}>
                    <Button>Publish Changes</Button>
                </form>
            </header>

            <Tabs defaultValue="inquiries">
                <TabsList className="flex-wrap h-auto">
                    <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                    <TabsTrigger value="general_text">General Text</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="inquiries" className="mt-4">
                    <InquiriesTab inquiries={inquiries} />
                </TabsContent>
                
                <TabsContent value="general_text" className="mt-4">
                    <form action={updateContent}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Manage Website Text</CardTitle>
                                <CardDescription>Edit text for various sections. Remember to publish changes.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="space-y-4 p-4 border rounded-lg">
                                    <h3 className="font-semibold font-serif text-lg">Hero Section</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="hero_heading">Heading</Label>
                                        <Input id="hero_heading" name="hero_heading" defaultValue={content.hero?.heading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="hero_subheading">Subheading</Label>
                                        <Textarea id="hero_subheading" name="hero_subheading" defaultValue={content.hero?.subheading} />
                                    </div>
                                </div>

                                <div className="space-y-4 p-4 border rounded-lg">
                                    <h3 className="font-semibold font-serif text-lg">Accommodation Section</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="accommodation_heading">Heading</Label>
                                        <Input id="accommodation_heading" name="accommodation_heading" defaultValue={content.accommodation?.heading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="accommodation_subheading">Subheading</Label>
                                        <Textarea id="accommodation_subheading" name="accommodation_subheading" defaultValue={content.accommodation?.subheading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="accommodation_main_text">Main Text Block</Label>
                                        <Textarea id="accommodation_main_text" name="accommodation_main_text" rows={5} defaultValue={content.accommodation?.main_text} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="accommodation_secondary_text">Secondary Text (Amenities)</Label>
                                        <Textarea id="accommodation_secondary_text" name="accommodation_secondary_text" rows={5} defaultValue={content.accommodation?.secondary_text} />
                                    </div>
                                </div>

                                 <div className="space-y-4 p-4 border rounded-lg">
                                    <h3 className="font-semibold font-serif text-lg">Activities Section</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="activities_heading">Heading</Label>
                                        <Input id="activities_heading" name="activities_heading" defaultValue={content.activities?.heading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="activities_subheading">Subheading</Label>
                                        <Textarea id="activities_subheading" name="activities_subheading" defaultValue={content.activities?.subheading} />
                                    </div>
                                </div>
                                
                                <div className="space-y-4 p-4 border rounded-lg">
                                    <h3 className="font-semibold font-serif text-lg">Booking Section</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="booking_heading">Heading</Label>
                                        <Input id="booking_heading" name="booking_heading" defaultValue={content.booking?.heading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="booking_subheading">Subheading</Label>
                                        <Textarea id="booking_subheading" name="booking_subheading" defaultValue={content.booking?.subheading} />
                                    </div>
                                </div>

                                <div className="space-y-4 p-4 border rounded-lg">
                                    <h3 className="font-semibold font-serif text-lg">Reviews Section</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="reviews_heading">Heading</Label>
                                        <Input id="reviews_heading" name="reviews_heading" defaultValue={content.reviews?.heading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reviews_subheading">Subheading</Label>
                                        <Textarea id="reviews_subheading" name="reviews_subheading" defaultValue={content.reviews?.subheading} />
                                    </div>
                                </div>

                                <div className="space-y-4 p-4 border rounded-lg">
                                    <h3 className="font-semibold font-serif text-lg">Location & Contact Section</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="location_heading">Heading</Label>
                                        <Input id="location_heading" name="location_heading" defaultValue={content.location?.heading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location_subheading">Subheading</Label>
                                        <Textarea id="location_subheading" name="location_subheading" defaultValue={content.location?.subheading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location_address">Address</Label>
                                        <Input id="location_address" name="location_address" defaultValue={content.location?.address} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="location_email">Email</Label>
                                            <Input id="location_email" name="location_email" type="email" defaultValue={content.location?.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location_phone">Phone</Label>
                                            <Input id="location_phone" name="location_phone" defaultValue={content.location?.phone} />
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit">Save All Text Changes</Button>
                            </CardContent>
                        </Card>
                    </form>
                </TabsContent>

                <TabsContent value="gallery" className="mt-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section Image</CardTitle>
                            <CardDescription>The main background image for the homepage hero section. Only one image can be active.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {heroImage ? (
                                <div className="mb-6 relative group w-full max-w-md">
                                    <Image src={heroImage.src} alt={heroImage.alt} width={400} height={250} className="rounded-md object-cover aspect-video"/>
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <form action={deleteGalleryImage.bind(null, heroImage.id)}>
                                            <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2/></Button>
                                        </form>
                                    </div>
                                </div>
                            ) : <p className="text-sm text-muted-foreground mb-4">No hero image has been uploaded.</p>}
                            
                            <form action={uploadGalleryImage}>
                                <Card className="p-4 bg-muted/50 border-dashed">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <Upload className="h-8 w-8 text-muted-foreground"/>
                                        <p className="text-sm font-medium">{heroImage ? 'Upload a new hero image to replace the current one.' : 'Upload a hero image.'}</p>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="hero_image_upload">Select Image</Label>
                                            <Input id="hero_image_upload" name="image" type="file" required/>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="hero_alt_text">Image Description (Alt Text)</Label>
                                            <Input id="hero_alt_text" name="alt" type="text" placeholder="e.g., Panoramic view of the cottage" required/>
                                        </div>
                                        <input type="hidden" name="section" value="hero" />
                                        <Button type="submit" size="sm" className="mt-2">Upload Hero Image</Button>
                                    </div>
                                </Card>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Reviews Section Image</CardTitle>
                            <CardDescription>The background image for the guest reviews section. Only one image can be active.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {reviewsImage ? (
                                <div className="mb-6 relative group w-full max-w-md">
                                    <Image src={reviewsImage.src} alt={reviewsImage.alt} width={400} height={250} className="rounded-md object-cover aspect-video"/>
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <form action={deleteGalleryImage.bind(null, reviewsImage.id)}>
                                            <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2/></Button>
                                        </form>
                                    </div>
                                </div>
                            ) : <p className="text-sm text-muted-foreground mb-4">No reviews image has been uploaded.</p>}
                            
                            <form action={uploadGalleryImage}>
                                <Card className="p-4 bg-muted/50 border-dashed">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <Upload className="h-8 w-8 text-muted-foreground"/>
                                        <p className="text-sm font-medium">{reviewsImage ? 'Upload a new image to replace the current one.' : 'Upload a reviews image.'}</p>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="reviews_image_upload">Select Image</Label>
                                            <Input id="reviews_image_upload" name="image" type="file" required/>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="reviews_alt_text">Image Description (Alt Text)</Label>
                                            <Input id="reviews_alt_text" name="alt" type="text" placeholder="e.g., View from the stoep" required/>
                                        </div>
                                        <input type="hidden" name="section" value="reviews" />
                                        <Button type="submit" size="sm" className="mt-2">Upload Reviews Image</Button>
                                    </div>
                                </Card>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Accommodation Gallery</CardTitle>
                            <CardDescription>Upload or delete photos for the accommodation gallery.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                                {accommodationImages.map(image => (
                                    <div key={image.id} className="relative group">
                                        <Image src={image.src} alt={image.alt} width={300} height={200} className="rounded-md object-cover aspect-video"/>
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <form action={deleteGalleryImage.bind(null, image.id)}>
                                                 <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2/></Button>
                                             </form>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form action={uploadGalleryImage}>
                                <Card className="p-4 bg-muted/50 border-dashed">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <Upload className="h-8 w-8 text-muted-foreground"/>
                                        <p className="text-sm font-medium">Upload a new image for the Accommodation Gallery.</p>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="accommodation_image_upload">Select Image</Label>
                                            <Input id="accommodation_image_upload" name="image" type="file" required/>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="alt_text">Image Description (Alt Text)</Label>
                                            <Input id="alt_text" name="alt" type="text" placeholder="e.g., View from the stoep" required/>
                                        </div>
                                        <input type="hidden" name="section" value="accommodation" />
                                        <Button type="submit" size="sm" className="mt-2">Upload Image</Button>
                                    </div>
                                </Card>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="amenities" className="mt-4">
                    <AmenitiesTab amenities={amenities} />
                </TabsContent>

                <TabsContent value="activities" className="mt-4">
                    <ActivitiesTab activities={activities} />
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                    <ReviewsTab reviews={reviews} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
