import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import type { GalleryImage } from '@/lib/content';

interface HeroContent {
  heading: string;
  subheading: string;
}

export default function Hero({ content, image }: { content: HeroContent, image?: GalleryImage }) {
  return (
    <section id="home" className="relative h-screen w-full">
      <Image
        src={image?.src || "https://placehold.co/1920x1080.png"}
        alt={image?.alt || "Panoramic view of Ida Olive Shepherds Cottage and surrounding nature"}
        fill
        className="object-cover"
        priority
        data-ai-hint="cottage landscape"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
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
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
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
