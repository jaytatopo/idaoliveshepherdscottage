
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
    const specialsBg = await getGalleryImages('specials_bg');

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold font-serif">Image Management</h1>
                <p className="text-muted-foreground">Manage the images used throughout your website.</p>
            </header>
            
            <Tabs defaultValue="gallery" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2">
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
                                images={accommodationGalleryImages}
                                isSingleton={false}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="page_images" className="mt-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Host Profile Picture</CardTitle>
                                <CardDescription>The picture for the 'Meet Your Hosts' section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="host_profile"
                                    images={hostProfileImage}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Hero Section Background</CardTitle>
                                <CardDescription>The main background image for the homepage hero section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="hero"
                                    images={heroImage}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Accommodation Section Background</CardTitle>
                                <CardDescription>Optional background image for the accommodation section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="accommodation_bg"
                                    images={accommodationBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Amenities Section Background</CardTitle>
                                <CardDescription>Optional background image for the amenities section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="amenities_bg"
                                    images={amenitiesBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Facilities Section Background</CardTitle>
                                <CardDescription>Optional background image for the facilities & amenities section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="facilities_bg"
                                    images={facilitiesBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Activities Section Background</CardTitle>
                                <CardDescription>Optional background image for the activities section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="activities_bg"
                                    images={activitiesBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                          <Card>
                            <CardHeader>
                                <CardTitle>Specials Section Background</CardTitle>
                                <CardDescription>Optional background image for the specials section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="specials_bg"
                                    images={specialsBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Reviews Section Background</CardTitle>
                                <CardDescription>Optional background image for the guest reviews section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="reviews"
                                    images={reviewsImage}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Booking Section Background</CardTitle>
                                <CardDescription>Optional background image for the booking section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="booking_bg"
                                    images={bookingBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Location Section Background</CardTitle>
                                <CardDescription>Optional background image for the location section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="location_bg"
                                    images={locationBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>FAQ Section Background</CardTitle>
                                <CardDescription>Optional background image for the FAQ section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="faq_bg"
                                    images={faqBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Host Profile Section Background</CardTitle>
                                <CardDescription>Optional background for the host profile section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="host_bg"
                                    images={hostBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Call to Action Section Background</CardTitle>
                                <CardDescription>Optional background for the CTA section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="cta_bg"
                                    images={ctaBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Video Section Background</CardTitle>
                                <CardDescription>Optional background for the video section.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploadSection 
                                    section="video_bg"
                                    images={videoBg}
                                    isSingleton={true}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
