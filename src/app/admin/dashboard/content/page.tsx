import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { revalidatePath } from 'next/cache';
import { updateContent } from "@/app/actions/content-actions";
import { getContent, getGalleryImages } from '@/lib/content';
import { ImageUploadSection } from "../content-image-forms";

export default async function ContentPage() {
    const content = await getContent();
    const accommodationGalleryImages = await getGalleryImages('accommodation');
    const heroImage = await getGalleryImages('hero');
    const reviewsImage = await getGalleryImages('reviews');
    const accommodationBg = await getGalleryImages('accommodation_bg');
    const facilitiesBg = await getGalleryImages('facilities_bg');
    const activitiesBg = await getGalleryImages('activities_bg');
    const bookingBg = await getGalleryImages('booking_bg');
    const locationBg = await getGalleryImages('location_bg');

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Content Management</h1>
                    <p className="text-muted-foreground">Manage your website's text and images.</p>
                </div>
                 <form action={async () => { 'use server'; revalidatePath('/', 'layout'); revalidatePath('/admin/dashboard', 'layout'); }}>
                    <Button>Publish Changes</Button>
                </form>
            </header>
            
            <form action={updateContent}>
                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Page Text</CardTitle>
                            <CardDescription>Edit text for various sections of your website here. Click "Save All Text Changes" at the bottom when you're done.</CardDescription>
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
                                    <Label htmlFor="accommodation_main_text">Main Text Block (The Vibe)</Label>
                                    <Textarea id="accommodation_main_text" name="accommodation_main_text" rows={5} defaultValue={content.accommodation?.main_text} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accommodation_secondary_text">Secondary Text (The Space)</Label>
                                    <Textarea id="accommodation_secondary_text" name="accommodation_secondary_text" rows={5} defaultValue={content.accommodation?.secondary_text} />
                                </div>
                            </div>

                            <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold font-serif text-lg">Facilities & Amenities Section</h3>
                                 <div className="space-y-2">
                                    <Label htmlFor="facilities_heading">Heading</Label>
                                    <Input id="facilities_heading" name="facilities_heading" defaultValue={content.facilities?.heading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="facilities_subheading">Subheading</Label>
                                    <Textarea id="facilities_subheading" name="facilities_subheading" defaultValue={content.facilities?.subheading} />
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="location_facebook_url">Facebook URL</Label>
                                        <Input id="location_facebook_url" name="location_facebook_url" type="url" defaultValue={content.location?.facebook_url} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location_instagram_url">Instagram URL</Label>
                                        <Input id="location_instagram_url" name="location_instagram_url" type="url" defaultValue={content.location?.instagram_url} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Content Lists</CardTitle>
                            <CardDescription>Edit the list items for various sections. Place each item on a new line.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                             <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold font-serif text-lg">Facilities - Item Lists</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="facilities_power_tech_items">Power & Tech Items</Label>
                                        <Textarea id="facilities_power_tech_items" name="facilities_power_tech_items" rows={5} defaultValue={content.facilities?.power_tech_items} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="facilities_kitchen_living_items">Kitchen & Living Items</Label>
                                        <Textarea id="facilities_kitchen_living_items" name="facilities_kitchen_living_items" rows={5} defaultValue={content.facilities?.kitchen_living_items} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="facilities_outdoor_living_items">Outdoor Living Items</Label>
                                        <Textarea id="facilities_outdoor_living_items" name="facilities_outdoor_living_items" rows={5} defaultValue={content.facilities?.outdoor_living_items} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="facilities_parking_access_items">Parking & Access Items</Label>
                                        <Textarea id="facilities_parking_access_items" name="facilities_parking_access_items" rows={5} defaultValue={content.facilities?.parking_access_items} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold font-serif text-lg">Booking - Good to Know Section</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="booking_rules_items">House Rules Items</Label>
                                        <Textarea id="booking_rules_items" name="booking_rules_items" rows={5} defaultValue={content.booking?.rules_items} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="booking_checkin_items">Check-in & Check-out Items</Label>
                                        <Textarea id="booking_checkin_items" name="booking_checkin_items" rows={5} defaultValue={content.booking?.checkin_items} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="booking_practical_items">Practical Info Items</Label>
                                        <Textarea id="booking_practical_items" name="booking_practical_items" rows={5} defaultValue={content.booking?.practical_items} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Button type="submit" className="mt-8">Save All Text Changes</Button>
            </form>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Manage Website Images</CardTitle>
                    <CardDescription>Upload and manage images for different sections of your website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="gallery" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                            <TabsTrigger value="gallery">Gallery</TabsTrigger>
                            <TabsTrigger value="hero">Hero BG</TabsTrigger>
                            <TabsTrigger value="accommodation">Accom. BG</TabsTrigger>
                            <TabsTrigger value="facilities">Facilities BG</TabsTrigger>
                            <TabsTrigger value="activities">Activities BG</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews BG</TabsTrigger>
                            <TabsTrigger value="booking">Booking BG</TabsTrigger>
                            <TabsTrigger value="location">Location BG</TabsTrigger>
                        </TabsList>
                        <TabsContent value="gallery" className="mt-6">
                            <ImageUploadSection 
                                section="accommodation"
                                title="Accommodation Gallery"
                                description="Upload or delete photos for the main accommodation gallery."
                                images={accommodationGalleryImages}
                                isSingleton={false}
                            />
                        </TabsContent>
                        <TabsContent value="hero" className="mt-6">
                             <ImageUploadSection 
                                section="hero"
                                title="Hero Section Background"
                                description="The main background image for the homepage hero section."
                                images={heroImage}
                                isSingleton={true}
                            />
                        </TabsContent>
                         <TabsContent value="accommodation" className="mt-6">
                             <ImageUploadSection 
                                section="accommodation_bg"
                                title="Accommodation Section Background"
                                description="Optional background image for the accommodation section."
                                images={accommodationBg}
                                isSingleton={true}
                            />
                        </TabsContent>
                        <TabsContent value="facilities" className="mt-6">
                             <ImageUploadSection 
                                section="facilities_bg"
                                title="Facilities Section Background"
                                description="Optional background image for the facilities & amenities section."
                                images={facilitiesBg}
                                isSingleton={true}
                            />
                        </TabsContent>
                         <TabsContent value="activities" className="mt-6">
                             <ImageUploadSection 
                                section="activities_bg"
                                title="Activities Section Background"
                                description="Optional background image for the activities section."
                                images={activitiesBg}
                                isSingleton={true}
                            />
                        </TabsContent>
                        <TabsContent value="reviews" className="mt-6">
                             <ImageUploadSection 
                                section="reviews"
                                title="Reviews Section Background"
                                description="Optional background image for the guest reviews section."
                                images={reviewsImage}
                                isSingleton={true}
                            />
                        </TabsContent>
                         <TabsContent value="booking" className="mt-6">
                             <ImageUploadSection 
                                section="booking_bg"
                                title="Booking Section Background"
                                description="Optional background image for the booking section."
                                images={bookingBg}
                                isSingleton={true}
                            />
                        </TabsContent>
                         <TabsContent value="location" className="mt-6">
                             <ImageUploadSection 
                                section="location_bg"
                                title="Location Section Background"
                                description="Optional background image for the location section."
                                images={locationBg}
                                isSingleton={true}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
