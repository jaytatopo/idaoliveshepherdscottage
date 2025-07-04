import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import type { GalleryImage } from '@/lib/content';
import { cn } from '@/lib/utils';

interface HeroContent {
  heading: string;
  subheading: string;
}

export default function Hero({ content, image }: { content: HeroContent, image?: GalleryImage }) {
  return (
    <section id="home" className="relative h-screen w-full bg-secondary">
      {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority
            data-ai-hint="cottage landscape"
          />
      ) : (
        <div className="absolute inset-0 bg-primary/20" />
      )}
      <div className={cn(
        "absolute inset-0",
        image ? "bg-gradient-to-t from-black/60 to-transparent" : "bg-gradient-to-t from-primary/30 to-transparent"
      )} />
      <div className={cn(
        "relative z-10 flex h-full flex-col items-center justify-center text-center",
        image ? "text-white" : "text-primary-foreground"
      )}>
        <div className="max-w-4xl p-6">
            <h1 className="font-serif text-5xl font-bold leading-tight md:text-7xl lg:text-8xl drop-shadow-lg">
              {content.heading}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl drop-shadow-md">
              {content.subheading}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#booking" passHref>
                  <Button size="lg" className="w-full sm:w-auto">
                    Book Your Stay
                  </Button>
              </Link>
              <Link href="#gallery" passHref>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white bg-transparent text-white hover:bg-white hover:text-primary">
                    Explore the Gallery
                  </Button>
              </Link>
            </div>
        </div>
        <Link href="#accommodation" className="absolute bottom-10 animate-bounce">
            <ArrowDown className="h-8 w-8 text-white/80"/>
            <span className="sr-only">Scroll down</span>
        </Link>
      </div>
    </section>
  );
}
