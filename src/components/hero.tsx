
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, BedDouble, Camera, Sparkles } from 'lucide-react';
import type { GalleryImage, Special } from '@/lib/content';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getClientGalleryImages, getClientSpecials } from '@/app/actions/content-actions';
import { Skeleton } from './ui/skeleton';

interface HeroContent {
  heading: string;
  subheading: string;
}

export default function Hero({ content }: { content: HeroContent }) {
  const [image, setImage] = useState<GalleryImage | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [special, setSpecial] = useState<Special | undefined>();

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

  useEffect(() => {
    const loadSpecial = async () => {
      try {
        const result = await getClientSpecials();
        if (result.success && result.data && result.data.length > 0) {
          setSpecial(result.data[0]);
        }
      } catch (error) {
        console.error("Failed to load hero special", error);
      }
    };
    loadSpecial();
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
        "bg-gradient-to-t from-black/70 via-black/30 to-black/10"
      )} />
      <div className={cn(
        "relative z-10 flex h-full flex-col items-center justify-center text-center",
        "text-primary-foreground"
      )}>
        <div className="max-w-4xl p-6">
            {special && (
              <Link
                href="#specials"
                className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/90 px-4 py-1.5 text-sm font-medium text-accent-foreground shadow-lg backdrop-blur-sm transition-transform hover:scale-105 hover:bg-accent opacity-0 animate-fade-in-up"
              >
                <Sparkles className="h-4 w-4" />
                <span>{special.headline}</span>
                {special.duration && (
                  <span className="hidden sm:inline opacity-80">· {special.duration}</span>
                )}
              </Link>
            )}
            <h1 className="mt-4 font-serif text-5xl font-bold leading-tight md:text-7xl lg:text-8xl [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)] opacity-0 animate-fade-in [animation-delay:200ms]">
              {content.heading}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)] opacity-0 animate-fade-in [animation-delay:400ms]">
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
