
'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { updateContent } from '@/app/actions/content-actions';
import { PublishButton } from '../publish-button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ContentValue = { [key: string]: string; };
type WebsiteContent = { [section: string]: ContentValue | undefined; };

const initialState = {
  message: null,
  success: false,
};

export function ContentForm({ content }: { content: WebsiteContent }) {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateContent, initialState);

    // State for Textarea components
    const [textareas, setTextareas] = useState({
        hero_subheading: content.hero?.subheading || '',
        accommodation_subheading: content.accommodation?.subheading || '',
        accommodation_main_text: content.accommodation?.main_text || '',
        accommodation_secondary_text: content.accommodation?.secondary_text || '',
        amenities_subheading: content.amenities?.subheading || '',
        facilities_subheading: content.facilities?.subheading || '',
        activities_subheading: content.activities?.subheading || '',
        specials_subheading: content.specials?.subheading || '',
        booking_subheading: content.booking?.subheading || '',
        booking_rules_items: content.booking?.rules_items || '',
        booking_checkin_items: content.booking?.checkin_items || '',
        booking_practical_items: content.booking?.practical_items || '',
        reviews_subheading: content.reviews?.subheading || '',
        host_subheading: content.host?.subheading || '',
        host_bio: content.host?.bio || '',
        faq_subheading: content.faq?.subheading || '',
        cta_subheading: content.cta?.subheading || '',
        video_subheading: content.video?.subheading || '',
        location_subheading: content.location?.subheading || '',
    });

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTextareas(prevState => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        if (state && state.message) {
             if (state.success) {
                toast({
                    title: 'Success!',
                    description: state.message,
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Update Failed',
                    description: state.message,
                });
            }
        }
    }, [state, toast]);

    return (
        <form id="contentForm" action={formAction}>
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Text Content Management</h1>
                    <p className="text-muted-foreground">Manage your website's text content. Click "Publish Changes" when you're done.</p>
                </div>
                <PublishButton form="contentForm" />
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                
                <Card>
                    <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="hero_heading">Heading</Label>
                            <Input id="hero_heading" name="hero_heading" defaultValue={content.hero?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hero_subheading">Subheading</Label>
                            <Textarea id="hero_subheading" name="hero_subheading" value={textareas.hero_subheading} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Accommodation Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="accommodation_heading">Heading</Label>
                            <Input id="accommodation_heading" name="accommodation_heading" defaultValue={content.accommodation?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accommodation_subheading">Subheading</Label>
                            <Textarea id="accommodation_subheading" name="accommodation_subheading" value={textareas.accommodation_subheading} onChange={handleTextareaChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accommodation_main_text">Main Text Block (The Vibe)</Label>
                            <Textarea id="accommodation_main_text" name="accommodation_main_text" rows={5} value={textareas.accommodation_main_text} onChange={handleTextareaChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accommodation_secondary_text">Secondary Text (The Space)</Label>
                            <Textarea id="accommodation_secondary_text" name="accommodation_secondary_text" rows={5} value={textareas.accommodation_secondary_text} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Amenities Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                            <div className="space-y-2">
                            <Label htmlFor="amenities_heading">Heading</Label>
                            <Input id="amenities_heading" name="amenities_heading" defaultValue={content.amenities?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amenities_subheading">Subheading</Label>
                            <Textarea id="amenities_subheading" name="amenities_subheading" value={textareas.amenities_subheading} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Facilities Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                            <div className="space-y-2">
                            <Label htmlFor="facilities_heading">Heading</Label>
                            <Input id="facilities_heading" name="facilities_heading" defaultValue={content.facilities?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="facilities_subheading">Subheading</Label>
                            <Textarea id="facilities_subheading" name="facilities_subheading" value={textareas.facilities_subheading} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                    <Card>
                    <CardHeader><CardTitle>Activities Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="activities_heading">Heading</Label>
                            <Input id="activities_heading" name="activities_heading" defaultValue={content.activities?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="activities_subheading">Subheading</Label>
                            <Textarea id="activities_subheading" name="activities_subheading" value={textareas.activities_subheading} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Specials Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="specials_heading">Heading</Label>
                            <Input id="specials_heading" name="specials_heading" defaultValue={content.specials?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="specials_subheading">Subheading</Label>
                            <Textarea id="specials_subheading" name="specials_subheading" value={textareas.specials_subheading} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Booking Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="booking_heading">Heading</Label>
                            <Input id="booking_heading" name="booking_heading" defaultValue={content.booking?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="booking_subheading">Subheading</Label>
                            <Textarea id="booking_subheading" name="booking_subheading" value={textareas.booking_subheading} onChange={handleTextareaChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="booking_booking_url">Booking Engine URL</Label>
                            <Input id="booking_booking_url" name="booking_booking_url" type="url" defaultValue={content.booking?.booking_url} />
                        </div>
                    </CardContent>
                </Card>

                    <Card>
                    <CardHeader>
                        <CardTitle>Good to Know Section</CardTitle>
                        <CardDescription>Items for the booking section accordion. Use one item per line.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="booking_rules_items">House Rules Items</Label>
                            <Textarea id="booking_rules_items" name="booking_rules_items" rows={4} value={textareas.booking_rules_items} onChange={handleTextareaChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="booking_checkin_items">Check-in & Check-out Items</Label>
                            <Textarea id="booking_checkin_items" name="booking_checkin_items" rows={4} value={textareas.booking_checkin_items} onChange={handleTextareaChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="booking_practical_items">Practical Info Items</Label>
                            <Textarea id="booking_practical_items" name="booking_practical_items" rows={4} value={textareas.booking_practical_items} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Reviews Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="reviews_heading">Heading</Label>
                            <Input id="reviews_heading" name="reviews_heading" defaultValue={content.reviews?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reviews_subheading">Subheading</Label>
                            <Textarea id="reviews_subheading" name="reviews_subheading" value={textareas.reviews_subheading} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                    <Card>
                    <CardHeader><CardTitle>Host Profile Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="host_heading">Heading</Label>
                            <Input id="host_heading" name="host_heading" defaultValue={content.host?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="host_subheading">Subheading</Label>
                            <Textarea id="host_subheading" name="host_subheading" value={textareas.host_subheading} onChange={handleTextareaChange} />
                        </div>
                            <div className="space-y-2">
                            <Label htmlFor="host_name">Host Name</Label>
                            <Input id="host_name" name="host_name" defaultValue={content.host?.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="host_bio">Host Bio</Label>
                            <Textarea id="host_bio" name="host_bio" rows={4} value={textareas.host_bio} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>FAQ Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="faq_heading">Heading</Label>
                            <Input id="faq_heading" name="faq_heading" defaultValue={content.faq?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="faq_subheading">Subheading</Label>
                            <Textarea id="faq_subheading" name="faq_subheading" value={textareas.faq_subheading} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Call To Action (CTA) Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cta_heading">Heading</Label>
                            <Input id="cta_heading" name="cta_heading" defaultValue={content.cta?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cta_subheading">Subheading</Label>
                            <Textarea id="cta_subheading" name="cta_subheading" value={textareas.cta_subheading} onChange={handleTextareaChange} />
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
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Video Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="video_heading">Heading</Label>
                            <Input id="video_heading" name="video_heading" defaultValue={content.video?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="video_subheading">Subheading</Label>
                            <Textarea id="video_subheading" name="video_subheading" value={textareas.video_subheading} onChange={handleTextareaChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="video_url">Video Embed URL</Label>
                            <Input id="video_url" name="video_url" type="url" defaultValue={content.video?.url} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Location & Contact Section</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="location_heading">Heading</Label>
                            <Input id="location_heading" name="location_heading" defaultValue={content.location?.heading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location_subheading">Subheading</Label>
                            <Textarea id="location_subheading" name="location_subheading" value={textareas.location_subheading} onChange={handleTextareaChange} />
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
                         <div className="space-y-2">
                            <Label htmlFor="location_map_embed_url">Google Maps Embed URL</Label>
                            <Input id="location_map_embed_url" name="location_map_embed_url" type="url" defaultValue={content.location?.map_embed_url} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location_map_directions_url">Google Maps Directions URL</Label>
                            <Input id="location_map_directions_url" name="location_map_directions_url" type="url" defaultValue={content.location?.map_directions_url} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
