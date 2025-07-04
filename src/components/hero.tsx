import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, BedDouble, Camera } from 'lucide-react';
import type { GalleryImage } from '@/lib/content';
import { cn } from '@/lib/utils';

interface HeroContent {
  heading: string;
  subheading: string;
}

export default function Hero({ content, image }: { content: HeroContent, image?: GalleryImage }) {
  return (
    <section id="home" className="relative h-screen w-full bg-secondary">
      {image && image.src ? (
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
        image && image.src ? "bg-gradient-to-t from-black/60 to-transparent" : "bg-gradient-to-t from-primary/30 to-transparent"
      )} />
      <div className={cn(
        "relative z-10 flex h-full flex-col items-center justify-center text-center",
        image && image.src ? "text-white" : "text-primary-foreground"
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
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto hover:bg-white/20 text-white backdrop-blur-sm transform hover:scale-105 transition-transform">
                    <Camera />
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
