import type { GalleryImage } from '@/lib/content';
import Image from 'next/image';
import { Card } from './ui/card';
import { BedDouble, Users, ZapOff } from 'lucide-react';

interface AccommodationContent {
  heading: string;
  subheading: string;
  main_text: string;
  secondary_text: string;
}

interface AccommodationProps {
  content: AccommodationContent;
  images: GalleryImage[];
  imageBg?: GalleryImage;
}

export default function Accommodation({ content, images, imageBg }: AccommodationProps) {
  const image1 = images?.[0];
  const image2 = images?.[1];

  return (
    <section id="accommodation" className="relative py-12 md:py-20 bg-card">
      {imageBg && imageBg.src && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-[0.18] z-0"
          data-ai-hint="cottage pattern"
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

        {(image1 || image2) && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {image1 && (
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl group opacity-0 animate-fade-in [animation-delay:300ms]">
                <Image
                    src={image1.src}
                    alt={image1.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="cottage interior"
                  />
              </div>
            )}
            {image2 && (
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl group opacity-0 animate-fade-in [animation-delay:400ms]">
                <Image
                    src={image2.src}
                    alt={image2.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="cottage amenities"
                  />
              </div>
            )}
            {(image1 && !image2) && <Card className="hidden md:block bg-muted/50"/>}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
            <Card className="p-6 flex flex-col items-center justify-center opacity-0 animate-fade-in-up [animation-delay:300ms] bg-background/70 backdrop-blur-sm">
                <Users className="w-10 h-10 text-primary mb-3"/>
                <h4 className="font-serif font-semibold text-lg">Sleeps 4 Adults</h4>
                <p className="text-sm text-muted-foreground">Max capacity, ideal for 2</p>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center opacity-0 animate-fade-in-up [animation-delay:400ms] bg-background/70 backdrop-blur-sm">
                <BedDouble className="w-10 h-10 text-primary mb-3"/>
                <h4 className="font-serif font-semibold text-lg">2 Bedrooms</h4>
                <p className="text-sm text-muted-foreground">1 King Bed, 1 Queen Bed</p>
            </Card>
             <Card className="p-6 flex flex-col items-center justify-center opacity-0 animate-fade-in-up [animation-delay:500ms] bg-background/70 backdrop-blur-sm">
                <ZapOff className="w-10 h-10 text-primary mb-3"/>
                <h4 className="font-serif font-semibold text-lg">Off-Grid Serenity</h4>
                <p className="text-sm text-muted-foreground">Unplug and reconnect</p>
            </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 opacity-0 animate-fade-in-up [animation-delay:500ms]">
              <h3 className="font-serif text-2xl font-semibold">The Vibe</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {content.main_text}
              </p>
            </div>
            <div className="space-y-4 opacity-0 animate-fade-in-up [animation-delay:600ms]">
              <h3 className="font-serif text-2xl font-semibold">The Space</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {content.secondary_text}
              </p>
            </div>
        </div>
      </div>
    </section>
  );
}
