import type { Amenity, GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';
import Image from 'next/image';

interface AmenitiesContent {
  heading: string;
  subheading: string;
}

interface AmenitiesProps {
  content: AmenitiesContent;
  amenities: Amenity[];
  imageBg?: GalleryImage;
}

export default function Amenities({ content, amenities, imageBg }: AmenitiesProps) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <section id="amenities" className="relative py-12 md:py-20 bg-background">
      {imageBg && imageBg.src && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-[0.18] z-0"
          data-ai-hint="cottage details"
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl mx-auto">
            {amenities.map((item, index) => (
                <div key={item.id} 
                  className="flex items-center gap-3 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  <DynamicIcon name={item.icon} className="w-6 h-6 text-primary" />
                  <span className="font-medium">{item.text}</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
