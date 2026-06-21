
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import type { Special, GalleryImage } from '@/lib/content';
import { getClientGalleryImages, getClientSpecials } from '@/app/actions/content-actions';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

interface SpecialsContent {
  heading: string;
  subheading: string;
}

interface SpecialsProps {
    content: SpecialsContent;
    specials: Special[]; // Pass initial specials to avoid waiting for client-side fetch if possible
}

export default function Specials({ content, specials: initialSpecials }: SpecialsProps) {
  const [specials, setSpecials] = useState<Special[]>(initialSpecials);
  const [imageBg, setImageBg] = useState<GalleryImage | undefined>();
  const [isLoading, setIsLoading] = useState(initialSpecials.length === 0);

  useEffect(() => {
    const loadData = async () => {
      // Only fetch specials client-side if they weren't passed from the server
      if (initialSpecials.length === 0) {
        try {
          const specialsResult = await getClientSpecials();
          if (specialsResult.success && specialsResult.data) {
            setSpecials(specialsResult.data);
          }
        } catch (error) {
          console.error("Failed to load specials data", error);
        }
      }
      try {
        const bgResult = await getClientGalleryImages('specials_bg');
        if (bgResult.success && bgResult.data) {
          setImageBg(bgResult.data[0]);
        }
      } catch (error) {
        console.error("Failed to load specials background", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [initialSpecials]);
  
  if (isLoading) {
    return (
      <section id="specials" className="relative py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Skeleton className="h-10 w-1/2 mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({length: 2}).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                  <CardFooter>
                     <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
      </section>
    )
  }

  if (!specials || specials.length === 0) {
    return null;
  }

  return (
    <section 
      id="specials" 
      className="relative py-12 md:py-20 bg-background"
    >
      {imageBg && imageBg.src_url && (
        <Image
          src={imageBg.src_url}
          alt={imageBg.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18] z-0"
          data-ai-hint="leaves pattern"
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
        <div
          className={cn(
            'gap-8 items-stretch',
            specials.length === 1
              ? 'flex justify-center'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center'
          )}
        >
          {specials.map((special, index) => (
            <div
              key={special.id}
              className={cn(
                'opacity-0 animate-fade-in-up',
                specials.length === 1 && 'w-full max-w-md'
              )}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm group">
                {special.src_url && (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={special.src_url}
                      alt={special.headline}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint="special offer"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{special.headline}</CardTitle>
                  {special.duration && (
                    <CardDescription>{special.duration}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">{special.description}</p>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4 bg-muted/50 p-4">
                  <div className="flex items-baseline gap-2">
                    {special.normal_price && (
                      <span className="text-lg text-muted-foreground line-through">
                        R{special.normal_price}
                      </span>
                    )}
                    {special.special_price && (
                      <span className="text-3xl font-bold text-primary">
                        R{special.special_price}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground -mt-2">For 2 Persons for 3 Nights</p>
                  <Button asChild className="w-full">
                    <Link href="#booking">Book This Special</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
