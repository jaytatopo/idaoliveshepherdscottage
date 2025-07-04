import type { GalleryImage } from '@/lib/content';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

interface CTAContent {
  heading: string;
  subheading: string;
  button_text: string;
  button_url: string;
}

interface CTAProps {
  content: CTAContent;
  imageBg?: GalleryImage;
}

export default function CallToAction({ content, imageBg }: CTAProps) {
  if (!content.heading) return null;

  return (
    <section id="cta" className="relative py-12 md:py-20 bg-background">
      {imageBg && imageBg.src && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-[0.18] z-0"
          data-ai-hint="nature pattern"
        />
      )}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="bg-card/70 backdrop-blur-sm rounded-lg p-8 md:p-12 text-center shadow-lg">
            <h2 className="font-serif text-3xl md:text-4xl font-bold opacity-0 animate-fade-in-up">
                {content.heading}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up [animation-delay:200ms]">
                {content.subheading}
            </p>
            {content.button_text && content.button_url && (
                <div className="mt-8 opacity-0 animate-fade-in-up [animation-delay:400ms]">
                    <Button asChild size="lg">
                        <Link href={content.button_url}>
                            {content.button_text}
                        </Link>
                    </Button>
                </div>
            )}
        </div>
      </div>
    </section>
  );
}
