'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { saveInquiry } from '@/app/actions/save-inquiry';
import { Textarea } from './ui/textarea';
import type { GalleryImage } from '@/lib/content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';


const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Please provide a message of at least 10 characters.' }),
});

interface BookingContent {
    heading: string;
    subheading: string;
    rules_items?: string;
    checkin_items?: string;
    practical_items?: string;
}

interface BookingProps {
  content: BookingContent;
  phone?: string;
  imageBg?: GalleryImage;
}

export default function Booking({ content, phone, imageBg }: BookingProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await saveInquiry({
            ...values,
            guests: 1, // Default value
        });

        if (result.success) {
            toast({
                title: "Enquiry Sent!",
                description: "Thank you for your interest. We'll get back to you shortly.",
            });
            form.reset();
        } else {
             toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: result.message,
            });
        }
    };

    return (
        <section 
            id="booking" 
            className="relative py-12 md:py-20 bg-background overflow-hidden"
        >
             {imageBg && imageBg.src && (
                <Image
                    src={imageBg.src}
                    alt={imageBg.alt}
                    fill
                    className="object-cover opacity-20 z-0"
                    data-ai-hint="booking calendar"
                />
            )}
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold opacity-0 animate-fade-in-up">
                        {content.heading}
                    </h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up [animation-delay:200ms]">
                        {content.subheading}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8 opacity-0 animate-fade-in-up [animation-delay:300ms]">
                        <Card className="bg-card/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="font-serif">Live Availability & Secure Booking</CardTitle>
                                <CardDescription>
                                    Check up-to-the-minute availability and book your stay securely online.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[750px] bg-muted rounded-lg p-2 shadow-inner">
                                    <iframe 
                                        src="https://book.nightsbridge.com/32988"
                                        className="w-full h-full border-0 rounded-md"
                                        title="Nightsbridge Booking Engine"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-2">Powered by Nightsbridge</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <div className="opacity-0 animate-fade-in-up [animation-delay:400ms]">
                             <Card className="bg-card/80 backdrop-blur-sm">
                                <CardHeader>
                                <CardTitle className="font-serif">Seasonal Rates</CardTitle>
                                <CardDescription>Per night for the cottage (sleeps 4). Min 2-night stay.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex justify-between items-center"><span>Mid-Season:</span> <span className="font-semibold text-primary text-base">R1800</span></li>
                                        <li className="flex justify-between items-center"><span>High-Season:</span> <span className="font-semibold text-primary text-base">R2200</span></li>
                                        <li className="flex justify-between items-center"><span>Peak-Season:</span> <span className="font-semibold text-primary text-base">R2500</span></li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <div className="opacity-0 animate-fade-in-up [animation-delay:500ms]">
                            <Card className="bg-card/80 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="font-serif">Send an Enquiry</CardTitle>
                                    <CardDescription>Have a question? Fill out the form below.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                            <FormField control={form.control} name="name" render={({ field }) => (
                                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="email" render={({ field }) => (
                                                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <FormField control={form.control} name="phone" render={({ field }) => (
                                                    <FormItem><FormLabel>Phone <span className="text-muted-foreground/80">(Opt)</span></FormLabel><FormControl><Input placeholder="+27..." {...field} /></FormControl><FormMessage /></FormItem>
                                                )} />
                                            </div>
                                            <FormField control={form.control} name="message" render={({ field }) => (
                                                <FormItem><FormLabel>Your Message</FormLabel><FormControl><Textarea placeholder="Tell us about your query..." rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            
                                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                                {form.formState.isSubmitting ? 'Sending...' : 'Send Enquiry'}
                                            </Button>
                                        </form>
                                    </Form>
                                    <div className="relative my-4 flex items-center justify-center">
                                        <div className="absolute inset-0 flex items-center"> <span className="w-full border-t" /> </div>
                                        <div className="relative flex justify-center text-xs uppercase"> <span className="bg-card px-2 text-muted-foreground"> Or </span> </div>
                                    </div>
                                    {phone && (
                                        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                            <a href={`https://wa.me/${phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5"><path d="M16.75 13.96c-.25-.12-1.47-.72-1.7-.81-.23-.09-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.28.18-.52.06-.25-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.43-1.38-1.68-.17-.25-.02-.38.1-.51.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.42-.06-.12-.56-1.34-.76-1.84s-.4-.42-.55-.42h-.48c-.17 0-.45.06-.68.31-.23.25-.87 1.03-.87 2.5s.89 2.9,1.01 3.1c.12.21,1.74,2.65,4.22,3.72.59.26,1.05.41,1.41.52.59.17,1.13.14,1.54.09.46-.06,1.47-.6,1.68-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28zM12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z"/></svg>
                                                Chat on WhatsApp
                                            </a>
                                            </Button>
                                        )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="mt-12 max-w-4xl mx-auto opacity-0 animate-fade-in-up [animation-delay:600ms]">
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                        <CardTitle className="font-serif text-center">Good to Know</CardTitle>
                        <CardDescription className="text-center">Important information about your stay at Ida Olive.</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                            <AccordionTrigger>House Rules</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                  {content.rules_items?.split('\n').filter(Boolean).map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                            </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                            <AccordionTrigger>Check-in & Check-out</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                   {content.checkin_items?.split('\n').filter(Boolean).map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                            </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                            <AccordionTrigger>Practical Info</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                   {content.practical_items?.split('\n').filter(Boolean).map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                            </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
