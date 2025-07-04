import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { revalidatePath } from 'next/cache';
import { updateContent } from "@/app/actions/content-actions";
import { getContent, getGalleryImages } from '@/lib/content';
import { ImageUploadSection } from "../content-image-forms";
import { ContentSubmitButton } from "../content-submit-button";
import { PublishButton } from "../publish-button";

export default async function ContentPage() {
    const content = await getContent();
    const accommodationGalleryImages = await getGalleryImages('accommodation');
    const heroImage = await getGalleryImages('hero');
    const reviewsImage = await getGalleryImages('reviews');
    const hostProfileImage = await getGalleryImages('host_profile');
    const accommodationBg = await getGalleryImages('accommodation_bg');
    const amenitiesBg = await getGalleryImages('amenities_bg');
    const facilitiesBg = await getGalleryImages('facilities_bg');
    const activitiesBg = await getGalleryImages('activities_bg');
    const bookingBg = await getGalleryImages('booking_bg');
    const locationBg = await getGalleryImages('location_bg');
    const faqBg = await getGalleryImages('faq_bg');
    const hostBg = await getGalleryImages('host_bg');
    const ctaBg = await getGalleryImages('cta_bg');
    const videoBg = await getGalleryImages('video_bg');

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Content Management</h1>
                    <p className="text-muted-foreground">Manage your website's text and images.</p>
                </div>
                 <form action={async () => { 'use server'; revalidatePath('/', 'layout'); revalidatePath('/admin/dashboard', 'layout'); }}>
                    <PublishButton />
                </form>
            </header>
            
            <form action={updateContent}>
                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Section Content</CardTitle>
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
                                <h3 className="font-semibold font-serif text-lg">Amenities Section</h3>
                                 <div className="space-y-2">
                                    <Label htmlFor="amenities_heading">Heading</Label>
                                    <Input id="amenities_heading" name="amenities_heading" defaultValue={content.amenities?.heading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amenities_subheading">Subheading</Label>
                                    <Textarea id="amenities_subheading" name="amenities_subheading" defaultValue={content.amenities?.subheading} />
                                </div>
                            </div>

                            <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold font-serif text-lg">Facilities Section</h3>
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
                                <h3 className="font-semibold font-serif text-lg">Host Profile Section</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="host_heading">Heading</Label>
                                    <Input id="host_heading" name="host_heading" defaultValue={content.host?.heading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="host_subheading">Subheading</Label>
                                    <Textarea id="host_subheading" name="host_subheading" defaultValue={content.host?.subheading} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="host_name">Host Name</Label>
                                    <Input id="host_name" name="host_name" defaultValue={content.host?.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="host_bio">Host Bio</Label>
                                    <Textarea id="host_bio" name="host_bio" rows={4} defaultValue={content.host?.bio} />
                                </div>
                            </div>

                            <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold font-serif text-lg">FAQ Section</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="faq_heading">Heading</Label>
                                    <Input id="faq_heading" name="faq_heading" defaultValue={content.faq?.heading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="faq_subheading">Subheading</Label>
                                    <Textarea id="faq_subheading" name="faq_subheading" defaultValue={content.faq?.subheading} />
                                </div>
                            </div>

                            <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold font-serif text-lg">Call To Action (CTA) Section</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="cta_heading">Heading</Label>
                                    <Input id="cta_heading" name="cta_heading" defaultValue={content.cta?.heading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cta_subheading">Subheading</Label>
                                    <Textarea id="cta_subheading" name="cta_subheading" defaultValue={content.cta?.subheading} />
                                </div>
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="cta_button_text">Button Text</Label>
                                        <Input id="cta_button_text" name="cta_button_text" defaultValue={content.cta?.button_text} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cta_button_url">Button URL</Label>
                                        <Input id="cta_button_url" name="cta_button_url" defaultValue={content.cta?.button_url} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="font-semibold font-serif text-lg">Video Section</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="video_heading">Heading</Label>
                                    <Input id="video_heading" name="video_heading" defaultValue={content.video?.heading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="video_subheading">Subheading</Label>
                                    <Textarea id="video_subheading" name="video_subheading" defaultValue={content.video?.subheading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="video_url">Video Embed URL</Label>
                                    <Input id="video_url" name="video_url" type="url" defaultValue={content.video?.url} />
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
                            <CardTitle>Good to Know Section</CardTitle>
                            <CardDescription>Edit the list items for the "Good to Know" section within the booking area. Place each item on a new line.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
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
                        </CardContent>
                    </Card>
                </div>

                <ContentSubmitButton />
            </form>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Manage Website Images</CardTitle>
                    <CardDescription>Upload and manage images for different sections of your website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="gallery" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="gallery">Accommodation Gallery</TabsTrigger>
                             <TabsTrigger value="profile">Profile Pictures</TabsTrigger>
                            <TabsTrigger value="backgrounds">Section Backgrounds</TabsTrigger>
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
                         <TabsContent value="profile" className="mt-6">
                            <ImageUploadSection 
                                section="host_profile"
                                title="Host Profile Picture"
                                description="The picture for the 'Meet Your Hosts' section."
                                images={hostProfileImage}
                                isSingleton={true}
                            />
                        </TabsContent>
                        <TabsContent value="backgrounds" className="mt-6 grid md:grid-cols-2 gap-6">
                             <ImageUploadSection 
                                section="hero"
                                title="Hero Section Background"
                                description="The main background image for the homepage hero section."
                                images={heroImage}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="accommodation_bg"
                                title="Accommodation Section Background"
                                description="Optional background image for the accommodation section."
                                images={accommodationBg}
                                isSingleton={true}
                            />
                            <ImageUploadSection 
                                section="amenities_bg"
                                title="Amenities Section Background"
                                description="Optional background image for the amenities section."
                                images={amenitiesBg}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="facilities_bg"
                                title="Facilities Section Background"
                                description="Optional background image for the facilities & amenities section."
                                images={facilitiesBg}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="activities_bg"
                                title="Activities Section Background"
                                description="Optional background image for the activities section."
                                images={activitiesBg}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="reviews"
                                title="Reviews Section Background"
                                description="Optional background image for the guest reviews section."
                                images={reviewsImage}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="booking_bg"
                                title="Booking Section Background"
                                description="Optional background image for the booking section."
                                images={bookingBg}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="location_bg"
                                title="Location Section Background"
                                description="Optional background image for the location section."
                                images={locationBg}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="faq_bg"
                                title="FAQ Section Background"
                                description="Optional background image for the FAQ section."
                                images={faqBg}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="host_bg"
                                title="Host Profile Section Background"
                                description="Optional background for the host profile section."
                                images={hostBg}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="cta_bg"
                                title="Call to Action Section Background"
                                description="Optional background for the CTA section."
                                images={ctaBg}
                                isSingleton={true}
                            />
                             <ImageUploadSection 
                                section="video_bg"
                                title="Video Section Background"
                                description="Optional background for the video section."
                                images={videoBg}
                                isSingleton={true}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
