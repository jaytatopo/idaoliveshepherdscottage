import type { GalleryImage } from '@/lib/content';
import Image from 'next/image';

interface HostContent {
  heading: string;
  subheading: string;
  name: string;
  bio: string;
}

interface HostProfileProps {
  content: HostContent;
  image?: GalleryImage;
  imageBg?: GalleryImage;
}

export default function HostProfile({ content, image, imageBg }: HostProfileProps) {
  if (!content.name) return null;

  return (
    <section id="host" className="relative py-12 md:py-20 bg-background">
      {imageBg && imageBg.src && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-20 z-0"
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
            {image && image.src && (
                <div className="md:col-span-1 opacity-0 animate-fade-in-up [animation-delay:300ms]">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={300}
                        height={300}
                        className="rounded-full aspect-square object-cover mx-auto shadow-lg border-4 border-card"
                    />
                </div>
            )}
            <div className={`opacity-0 animate-fade-in-up [animation-delay:400ms] ${image && image.src ? 'md:col-span-2' : 'md:col-span-3 text-center'}`}>
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
