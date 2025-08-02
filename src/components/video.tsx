
'use client';

import type { GalleryImage } from '@/lib/content';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getClientGalleryImages } from '@/app/actions/content-actions';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

const VideoPlayer = dynamic(() => Promise.resolve(({ url }: { url: string }) => (
    <iframe
      src={url}
      title="Video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="w-full h-full border-0"
    ></iframe>
  )), {
    loading: () => <Skeleton className="w-full h-full" />,
    ssr: false,
  }
);


interface VideoContent {
  heading: string;
  subheading: string;
  url: string;
}

interface VideoProps {
  content: VideoContent;
}

export default function Video({ content }: VideoProps) {
  const [imageBg, setImageBg] = useState<GalleryImage | undefined>();

  useEffect(() => {
    const loadBgImage = async () => {
      const result = await getClientGalleryImages('video_bg');
      if (result.success && result.data) {
        setImageBg(result.data[0]);
      }
    };
    loadBgImage();
  }, []);

  if (!content.url) return null;

  return (
    <section id="video" className="relative py-12 md:py-20 bg-card">
      {imageBg && imageBg.src_url && (
        <Image
          src={imageBg.src_url}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-[0.18] z-0"
          data-ai-hint="video pattern"
        />
      )}
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold opacity-0 animate-fade-in-up">
                {content.heading}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up [animation-delay:200ms]">
                {content.subheading}
            </p>
        </div>
        <div className="max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl opacity-0 animate-fade-in-up [animation-delay:300ms]">
          <VideoPlayer url={content.url} />
        </div>
      </div>
    </section>
  );
}
