
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, BedDouble, Camera } from 'lucide-react';
import type { GalleryImage } from '@/lib/content';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getClientGalleryImages } from '@/app/actions/content-actions';
import { Skeleton } from './ui/skeleton';

interface HeroContent {
  heading: string;
  subheading: string;
}

export default function Hero({ content }: { content: HeroContent }) {
  const [image, setImage] = useState<GalleryImage | undefined>();
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    const loadImage = async () => {
      try {
        const result = await getClientGalleryImages('hero');
        if (result.success && result.data && result.data.length > 0) {
          setImage(result.data[0]);
        }
      } catch (error) {
        console.error("Failed to load hero image", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadImage();
  }, []);

  return (
    <section id="home" className="relative h-screen w-full bg-secondary">
      {isLoading ? (
        <Skeleton className="absolute inset-0" />
      ) : (
        <Image
          src={image?.src_url || 'https://placehold.co/1920x1080.png'}
          alt={image?.alt || 'A placeholder landscape view of the cottage'}
          fill
          sizes="100vw"
          className="object-cover animate-fade-in"
          priority
          fetchPriority="high"
          data-ai-hint="cottage landscape"
        />
      )}

      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      )} />
      <div className={cn(
        "relative z-10 flex h-full flex-col items-center justify-center text-center",
        "text-primary-foreground"
      )}>
        <div className="max-w-4xl p-6">
            <h1 className="font-serif text-5xl font-bold leading-tight md:text-7xl lg:text-8xl drop-shadow-lg opacity-0 animate-fade-in [animation-delay:200ms]">
              {content.heading}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl drop-shadow-md opacity-0 animate-fade-in [animation-delay:400ms]">
              {content.subheading}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up [animation-delay:600ms]">
              <Link href="#booking" passHref>
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform">
                    <BedDouble />
                    Book Your Stay
                  </Button>
              </Link>
              <Link href="#gallery" passHref>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10 backdrop-blur-sm transform hover:scale-105 transition-transform">
                    <Camera />
                    Explore the Gallery
                  </Button>
              </Link>
            </div>
        </div>
        <Link href="#accommodation" className="absolute bottom-10 animate-bounce">
            <ArrowDown className="h-8 w-8 text-primary-foreground/80"/>
            <span className="sr-only">Scroll down</span>
        </Link>
      </div>
    </section>
  );
}
