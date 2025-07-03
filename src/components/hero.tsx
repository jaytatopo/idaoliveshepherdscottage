import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroContent {
  heading: string;
  subheading: string;
}

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section id="home" className="relative h-[85vh] w-full text-white">
      <Image
        src="/hero-background.jpg"
        alt="Panoramic view of Ida Olive Shepherds Cottage and surrounding nature"
        fill
        className="object-cover"
        priority
        data-ai-hint="cottage landscape"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <div className="max-w-4xl p-6 rounded-lg bg-black/20 backdrop-blur-sm">
            <h1 className="font-serif text-4xl font-bold md:text-6xl lg:text-7xl">
              {content.heading}
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              {content.subheading}
            </p>
            <div className="mt-8 flex justify-center gap-4">
            <Link href="#accommodation" passHref>
                <Button size="lg" variant="secondary">
                Explore the Cottage
                </Button>
            </Link>
            <Link href="#booking" passHref>
                <Button size="lg" variant="default">
                Check Availability
                </Button>
            </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
