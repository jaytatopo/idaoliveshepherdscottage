import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Location() {
  return (
    <section id="location" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Find Your Way to Paradise</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            We're nestled in the heart of the Karoo, just a few kilometers outside the charming village of McGregor.
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-2 relative h-80 lg:h-full min-h-[300px]">
              <Image
                src="https://placehold.co/800x600.png"
                alt="Map showing the location of Ida Olive Cottage near McGregor"
                fill
                className="object-cover"
                data-ai-hint="map mcgregor south africa"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="font-headline text-2xl font-semibold mb-6">Contact & Directions</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-primary shrink-0" />
                  <span>Giddy Goat Farm, 6km outside McGregor, Western Cape, South Africa</span>
                </div>
                 <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:reservations@idaolivecottagemcgregor.co.za" className="hover:text-primary transition-colors">
                    reservations@idaolivecottagemcgregor.co.za
                  </a>
                </div>
                 <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>+27 12 345 6789 (Sample)</span>
                </div>
              </div>
              <Button asChild className="mt-8">
                 <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                    Get Directions on Google Maps
                 </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
