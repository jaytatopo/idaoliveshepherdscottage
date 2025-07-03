import Image from 'next/image';
import type { Amenity, GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';

interface AccommodationContent {
  heading: string;
  subheading: string;
  main_text: string;
  secondary_text: string;
}

interface AccommodationProps {
  content: AccommodationContent;
  amenities: Amenity[];
  galleryImages: GalleryImage[];
}

export default function Accommodation({ content, amenities, galleryImages }: AccommodationProps) {
  const mainImage = galleryImages[0];
  const otherImages = galleryImages.slice(1, 5);

  return (
    <section id="accommodation" className="py-16 md:py-24 bg-background opacity-0 animate-fade-in-up">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center leading-relaxed text-muted-foreground mb-12">
           <p className="whitespace-pre-line">{content.main_text}</p>
        </div>

        {mainImage && (
           <div className="mb-12 rounded-lg overflow-hidden shadow-xl">
               <Image
                   src={mainImage.src}
                   alt={mainImage.alt}
                   width={1200}
                   height={800}
                   className="w-full object-cover"
                   priority
               />
           </div>
        )}
        
        {otherImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {otherImages.map((img) => (
                    <div key={img.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Image
                            src={img.src}
                            alt={img.alt}
                            width={400}
                            height={300}
                            className="aspect-video object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold">Amenities & Comforts</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                   {content.secondary_text}
                </p>
            </div>
             <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {amenities.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                    <DynamicIcon name={item.icon} className="w-6 h-6 text-primary" />
                    <span className="font-medium">{item.text}</span>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
