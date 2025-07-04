import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Mail, Phone } from 'lucide-react';
import type { GalleryImage } from '@/lib/content';
import Image from 'next/image';

interface LocationContent {
  heading: string;
  subheading: string;
  address: string;
  email: string;
  phone: string;
  map_embed_url: string;
  map_directions_url: string;
}

interface LocationProps {
    content: LocationContent;
    imageBg?: GalleryImage;
}

export default function Location({ content, imageBg }: LocationProps) {
  return (
    <section id="location" className="relative py-12 md:py-20 bg-background overflow-hidden">
        {imageBg && imageBg.src && (
            <Image
                src={imageBg.src}
                alt={imageBg.alt}
                fill
                sizes="100vw"
                className="object-cover opacity-[0.18] z-0"
                data-ai-hint="map location"
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

        <Card className="overflow-hidden shadow-xl bg-background/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 relative h-80 md:h-full min-h-[300px] opacity-0 animate-slide-in-from-left [animation-delay:300ms]">
               {content.map_embed_url ? (
                    <iframe
                        src={content.map_embed_url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location of Ida Olive Cottage on Google Maps"
                        aria-label="Location of Ida Olive Cottage on Google Maps"
                        className='absolute inset-0 w-full h-full'
                    ></iframe>
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">Map not configured.</p>
                    </div>
                )}
            </div>
            <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center opacity-0 animate-slide-in-from-right [animation-delay:300ms]">
              <h3 className="font-serif text-2xl font-semibold mb-6">Contact & Directions</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-primary shrink-0" />
                  <span>{content.address}</span>
                </div>
                 <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href={`mailto:${content.email}`} className="hover:text-primary transition-colors">
                    {content.email}
                  </a>
                </div>
                 <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>{content.phone}</span>
                </div>
              </div>
              {content.map_directions_url && (
                <Button asChild className="mt-8">
                    <a href={content.map_directions_url} target="_blank" rel="noopener noreferrer">
                        Get Directions on Google Maps
                    </a>
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
