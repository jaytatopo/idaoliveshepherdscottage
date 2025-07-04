import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGalleryImages } from '@/lib/content';
import { ImageUploadSection } from "../content-image-forms";

export default async function ImagesPage() {
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
            <header>
                <h1 className="text-3xl font-bold font-serif">Image Management</h1>
                <p className="text-muted-foreground">Manage the images used throughout your website.</p>
            </header>
            
            <Tabs defaultValue="gallery" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="gallery">Accommodation Gallery</TabsTrigger>
                    <TabsTrigger value="page_images">Other Page Images</TabsTrigger>
                </TabsList>

                <TabsContent value="gallery" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Accommodation Gallery</CardTitle>
                            <CardDescription>Upload or delete photos for the main accommodation gallery. These appear on the homepage and in the gallery lightbox.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ImageUploadSection 
                                section="accommodation"
                                title=""
                                description=""
                                images={accommodationGalleryImages}
                                isSingleton={false}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="page_images" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Other Page Images</CardTitle>
                            <CardDescription>Manage profile pictures and background images for various sections.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <ImageUploadSection 
                                section="host_profile"
                                title="Host Profile Picture"
                                description="The picture for the 'Meet Your Hosts' section."
                                images={hostProfileImage}
                                isSingleton={true}
                            />
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
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
