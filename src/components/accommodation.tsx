
'use client';

import type { GalleryImage } from '@/lib/content';
import Image from 'next/image';
import { Card } from './ui/card';
import { BedDouble, Users, ZapOff } from 'lucide-react';
import { getClientGalleryImages } from '@/app/actions/content-actions';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface AccommodationContent {
  heading: string;
  subheading: string;
  main_text: string;
  secondary_text: string;
}

interface AccommodationProps {
  content: AccommodationContent;
}

export default function Accommodation({ content }: AccommodationProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [imageBg, setImageBg] = useState<GalleryImage | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [imagesResult, bgResult] = await Promise.all([
          getClientGalleryImages('accommodation'),
          getClientGalleryImages('accommodation_bg')
        ]);
        if (imagesResult.success && imagesResult.data) {
          setImages(imagesResult.data);
        }
        if (bgResult.success && bgResult.data) {
          setImageBg(bgResult.data[0]);
        }
      } catch (error) {
        console.error("Failed to load accommodation images", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const image1 = images?.[0]?.src_url ? images[0] : null;
  const image2 = images?.[1]?.src_url ? images[1] : null;

  return (
    <section id="accommodation" className="relative py-12 md:py-20 bg-card">
      {imageBg && imageBg.src_url && (
        <Image
          src={imageBg.src_url}
          alt={imageBg.alt}
          fill
          sizes="100vw"
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {isLoading ? (
            <>
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="aspect-video w-full rounded-lg" />
            </>
          ) : (
            <>
                <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl group opacity-0 animate-fade-in [animation-delay:300ms]">
                  <Image
                      src={image1?.src_url || 'https://placehold.co/600x400.png'}
                      alt={image1?.alt || 'Interior view of the cottage'}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint="cottage interior"
                    />
                </div>
                <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl group opacity-0 animate-fade-in [animation-delay:400ms]">
                  <Image
                      src={image2?.src_url || 'https://placehold.co/600x400.png'}
                      alt={image2?.alt || 'Cottage amenities'}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint="cottage amenities"
                    />
                </div>
            </>
          )}
        </div>
        
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
