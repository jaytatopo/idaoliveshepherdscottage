import type { GalleryImage } from '@/lib/content';
import Image from 'next/image';

interface VideoContent {
  heading: string;
  subheading: string;
  url: string;
}

interface VideoProps {
  content: VideoContent;
  imageBg?: GalleryImage;
}

export default function Video({ content, imageBg }: VideoProps) {
  if (!content.url) return null;

  return (
    <section id="video" className="relative py-12 md:py-20 bg-card">
      {imageBg && imageBg.src && (
        <Image
          src={imageBg.src}
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
          <iframe
            src={content.url}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
