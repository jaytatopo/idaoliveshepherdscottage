'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  checkIn: z.string().min(1, { message: 'Please select a check-in date.' }),
  checkOut: z.string().min(1, { message: 'Please select a check-out date.' }),
  guests: z.coerce.number().min(1, { message: 'Must have at least 1 guest.' }).max(4, { message: 'Cannot exceed 4 guests.' }),
});

export default function Booking() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            checkIn: '',
            checkOut: '',
            guests: 2,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Enquiry Submitted:', values);
        // In a real application, this would send an email and/or save to a database.
        toast({
            title: "Enquiry Sent!",
            description: "Thank you for your interest. We'll get back to you shortly.",
        });
        form.reset();
    }

    return (
        <section id="booking" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold">Rates & Availability</h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Ready for your peaceful escape? Check our availability or send us an enquiry.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-serif">Live Availability</CardTitle>
                                <CardDescription>
                                    Check up-to-the-minute availability and book securely.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-[4/3] bg-muted rounded-b-lg p-2">
                                     <iframe 
                                        src="https://www.nightsbridge.co.za/bridge/book?bbid=16933"
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

                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-serif">Send an Enquiry</CardTitle>
                                <CardDescription>Fill out the form below and our team will get back to you promptly.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="phone" render={({ field }) => (
                                                <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input placeholder="+27 12 345 6789" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                             <FormField control={form.control} name="checkIn" render={({ field }) => (
                                                <FormItem><FormLabel>Check-in Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                             <FormField control={form.control} name="checkOut" render={({ field }) => (
                                                <FormItem><FormLabel>Check-out Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                        </div>
                                         <FormField control={form.control} name="guests" render={({ field }) => (
                                            <FormItem><FormLabel>Number of Guests</FormLabel><FormControl><Input type="number" min="1" max="4" placeholder="2" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        
                                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                            {form.formState.isSubmitting ? 'Sending...' : 'Send Enquiry'}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
