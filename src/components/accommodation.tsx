import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Amenity, GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';

interface AccommodationContent {
  heading: string;
  subheading: string;
  main_text: string;
}

interface AccommodationProps {
  content: AccommodationContent;
  amenities: Amenity[];
  galleryImages: GalleryImage[];
}

export default function Accommodation({ content, amenities, galleryImages }: AccommodationProps) {
  return (
    <section id="accommodation" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-semibold">The Heart of the Cottage</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {content.main_text}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {amenities.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <DynamicIcon name={item.icon} className="w-6 h-6 text-primary" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.slice(0, 4).map((img) => (
              <Card key={img.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="aspect-video object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
