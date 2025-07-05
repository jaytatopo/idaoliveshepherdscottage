'use client';

import type { GalleryImage } from '@/lib/content';
import Image from 'next/image';
import { getClientGalleryImages } from '@/app/actions/content-actions';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface HostContent {
  heading: string;
  subheading: string;
  name: string;
  bio: string;
}

interface HostProfileProps {
  content: HostContent;
}

export default function HostProfile({ content }: HostProfileProps) {
  const [image, setImage] = useState<GalleryImage | undefined>();
  const [imageBg, setImageBg] = useState<GalleryImage | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const [profileResult, bgResult] = await Promise.all([
          getClientGalleryImages('host_profile'),
          getClientGalleryImages('host_bg')
        ]);
        if (profileResult.success && profileResult.data) {
          setImage(profileResult.data[0]);
        }
        if (bgResult.success && bgResult.data) {
          setImageBg(bgResult.data[0]);
        }
      } catch(error) {
        console.error("Failed to load host images", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, []);

  if (!content.name) return null;

  return (
    <section id="host" className="relative py-12 md:py-20 bg-background">
      {imageBg && imageBg.src && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-[0.18] z-0"
          data-ai-hint="farmhouse pattern"
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
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 items-center">
            {isLoading ? (
               <div className="md:col-span-1 flex justify-center">
                  <Skeleton className="w-[300px] h-[300px] rounded-full" />
                </div>
            ) : (
              image && image.src && (
                  <div className="md:col-span-1 opacity-0 animate-fade-in-up [animation-delay:300ms]">
                      <Image
                          src={image.src}
                          alt={image.alt}
                          width={300}
                          height={300}
                          className="rounded-full aspect-square object-cover mx-auto shadow-lg border-4 border-card"
                      />
                  </div>
              )
            )}
            <div className={`opacity-0 animate-fade-in-up [animation-delay:400ms] ${(image && image.src && !isLoading) ? 'md:col-span-2' : 'md:col-span-3 text-center'}`}>
                <h3 className="font-serif text-2xl font-semibold">{content.name}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                    {content.bio}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
