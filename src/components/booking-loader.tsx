
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically load the Booking component only on the client-side to prevent hydration errors
// caused by browser extensions modifying the form inputs.
const Booking = dynamic(() => import('@/components/booking'), {
    ssr: false,
    loading: () => (
      <section id="booking" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <Skeleton className="h-10 w-1/2 mx-auto" />
                <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
            </div>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                 <div className="lg:col-span-2 space-y-8">
                    <Skeleton className="h-[850px] w-full" />
                 </div>
                 <div className="lg:col-span-1 space-y-8">
                    <Skeleton className="h-[200px] w-full" />
                    <Skeleton className="h-[550px] w-full" />
                 </div>
            </div>
        </div>
      </section>
    ),
});

export default function BookingLoader(props: any) {
    return <Booking {...props} />;
}
