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
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  checkIn: z.date().optional(),
  checkOut: z.date().optional(),
  guests: z.coerce.number().min(1, { message: 'Must have at least 1 guest.' }).max(4, { message: 'Cannot exceed 4 guests.' }),
  message: z.string().min(10, { message: 'Please provide a message of at least 10 characters.' }),
}).refine((data) => {
    if (data.checkIn && data.checkOut) {
        return data.checkOut > data.checkIn;
    }
    return true;
}, {
  message: "Check-out date must be after check-in date.",
  path: ["checkOut"],
});


interface BookingContent {
    heading: string;
    subheading: string;
}

interface BookingProps {
  content: BookingContent;
  phone?: string;
}

export default function Booking({ content, phone }: BookingProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            guests: 2,
            message: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formattedValues = {
            ...values,
            checkIn: values.checkIn ? format(values.checkIn, 'yyyy-MM-dd') : undefined,
            checkOut: values.checkOut ? format(values.checkOut, 'yyyy-MM-dd') : undefined,
        };

        const result = await saveInquiry(formattedValues);

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
    }

    return (
        <section 
            id="booking" 
            className="relative py-16 md:py-24 bg-background opacity-0 animate-fade-in-up [animation-delay:400ms] overflow-hidden"
        >
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Faded background image of a booking calendar"
              fill
              className="object-cover opacity-5 z-0"
              data-ai-hint="booking calendar"
            />
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
                        {content.subheading}
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-serif">Live Availability</CardTitle>
                                <CardDescription>
                                    Check up-to-the-minute availability and book securely online.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-[4/3] bg-muted rounded-b-lg p-2">
                                     <iframe 
                                        src="https://book.nightsbridge.com/32988"
                                        className="w-full h-full border-0 rounded-md"
                                        title="Nightsbridge Booking Engine"
                                     />
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-2">Powered by Nightsbridge</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-serif">Seasonal Rates</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between"><span>Mid-Season:</span><span className="font-semibold">R1800 / night</span></div>
                                <div className="flex justify-between"><span>High-Season:</span><span className="font-semibold">R2200 / night</span></div>
                                <div className="flex justify-between"><span>Peak-Season:</span><span className="font-semibold">R2500 / night</span></div>
                                <p className="text-sm text-muted-foreground pt-2">Rates are for the entire cottage (sleeps 4). Minimum 2-night stay.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-serif">Send an Enquiry</CardTitle>
                                <CardDescription>Have a question? Fill out the form below and our team will get back to you promptly.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField control={form.control} name="name" render={({ field }) => (
                                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="phone" render={({ field }) => (
                                                <FormItem><FormLabel>Phone (Optional)</FormLabel><FormControl><Input placeholder="+27 12 345 6789" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                             <FormField control={form.control} name="checkIn" render={({ field }) => (
                                                <FormItem className="flex flex-col"><FormLabel>Check-in (Optional)</FormLabel>
                                                    <Popover><PopoverTrigger asChild>
                                                        <FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        </Button></FormControl>
                                                    </PopoverTrigger><PopoverContent className="w-auto p-0">
                                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} initialFocus />
                                                    </PopoverContent></Popover><FormMessage />
                                                </FormItem>
                                            )} />
                                             <FormField control={form.control} name="checkOut" render={({ field }) => (
                                                <FormItem className="flex flex-col"><FormLabel>Check-out (Optional)</FormLabel>
                                                    <Popover><PopoverTrigger asChild>
                                                        <FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        </Button></FormControl>
                                                    </PopoverTrigger><PopoverContent className="w-auto p-0">
                                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} initialFocus />
                                                    </PopoverContent></Popover><FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>
                                         <FormField control={form.control} name="guests" render={({ field }) => (
                                            <FormItem><FormLabel>Number of Guests</FormLabel><FormControl><Input type="number" min="1" max="4" placeholder="2" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="message" render={({ field }) => (
                                            <FormItem><FormLabel>Your Message</FormLabel><FormControl><Textarea placeholder="Tell us about your query..." {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        
                                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                            {form.formState.isSubmitting ? 'Sending...' : 'Send Enquiry'}
                                        </Button>
                                    </form>
                                </Form>
                                <div className="relative my-6 flex items-center justify-center">
                                    <div className="absolute inset-0 flex items-center"> <span className="w-full border-t" /> </div>
                                    <div className="relative flex justify-center text-xs uppercase"> <span className="bg-background px-2 text-muted-foreground"> Or </span> </div>
                                </div>
                                {phone && (
                                    <Button variant="outline" asChild className="w-full bg-[#25D366] text-white hover:bg-[#25D366]/90 hover:text-white">
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
        </section>
    );
}
