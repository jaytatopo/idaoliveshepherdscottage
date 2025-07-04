import type { Amenity, GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BedDouble, Bath, Users } from 'lucide-react';

interface AccommodationContent {
  heading: string;
  subheading: string;
  main_text: string;
  secondary_text: string;
  power_tech_items?: string;
  kitchen_living_items?: string;
  outdoor_living_items?: string;
  parking_access_items?: string;
}

interface AccommodationProps {
  content: AccommodationContent;
  amenities: Amenity[];
  images: GalleryImage[];
  imageBg?: GalleryImage;
}

export default function Accommodation({ content, amenities, images, imageBg }: AccommodationProps) {
  const image1 = images?.[0];
  const image2 = images?.[1];

  const features = [
    {
      category: 'Power & Tech',
      icon: 'ZapOff',
      items: content.power_tech_items?.split('\n').filter(Boolean) || []
    },
    {
      category: 'Kitchen & Living',
      icon: 'UtensilsCrossed',
      items: content.kitchen_living_items?.split('\n').filter(Boolean) || []
    },
    {
      category: 'Outdoor Living',
      icon: 'Sun',
      items: content.outdoor_living_items?.split('\n').filter(Boolean) || []
    },
    {
      category: 'Parking & Access',
      icon: 'Car',
      items: content.parking_access_items?.split('\n').filter(Boolean) || []
    }
  ];

  return (
    <section id="accommodation" className="relative py-10 md:py-12 bg-background">
      {imageBg && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-5 z-0"
          data-ai-hint="cottage pattern"
        />
      )}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold opacity-0 animate-fade-in-up">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up [animation-delay:200ms]">
            {content.subheading}
          </p>
        </div>

        {(image1 || image2) && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {image1 && (
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl group opacity-0 animate-fade-in [animation-delay:300ms]">
                <Image
                    src={image1.src}
                    alt={image1.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="cottage interior"
                  />
              </div>
            )}
            {image2 && (
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl group opacity-0 animate-fade-in [animation-delay:400ms]">
                <Image
                    src={image2.src}
                    alt={image2.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="cottage amenities"
                  />
              </div>
            )}
            {(image1 && !image2) && <Card className="hidden md:block bg-muted/50"/>}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 text-center">
            <Card className="p-6 flex flex-col items-center justify-center opacity-0 animate-fade-in-up [animation-delay:300ms]">
                <Users className="w-10 h-10 text-primary mb-3"/>
                <h4 className="font-serif font-semibold text-lg">Sleeps 4 Adults</h4>
                <p className="text-sm text-muted-foreground">Max capacity, ideal for 2</p>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center opacity-0 animate-fade-in-up [animation-delay:400ms]">
                <BedDouble className="w-10 h-10 text-primary mb-3"/>
                <h4 className="font-serif font-semibold text-lg">2 Bedrooms</h4>
                <p className="text-sm text-muted-foreground">1 King Bed, 1 Queen Bed</p>
            </Card>
             <Card className="p-6 flex flex-col items-center justify-center sm:col-span-2 md:col-span-1 opacity-0 animate-fade-in-up [animation-delay:500ms]">
                <Bath className="w-10 h-10 text-primary mb-3"/>
                <h4 className="font-serif font-semibold text-lg">Full Bathroom</h4>
                <p className="text-sm text-muted-foreground">Bath, indoor & outdoor showers</p>
            </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 opacity-0 animate-fade-in-up [animation-delay:500ms]">
              <h3 className="font-serif text-2xl font-semibold">The Vibe</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {content.main_text}
              </p>
            </div>
            <div className="space-y-4 opacity-0 animate-fade-in-up [animation-delay:600ms]">
              <h3 className="font-serif text-2xl font-semibold">The Space</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {content.secondary_text}
              </p>
            </div>
        </div>

        <div className="mt-16 pt-12 border-t">
            <h3 className="font-serif text-2xl font-semibold text-center mb-8 opacity-0 animate-fade-in-up [animation-delay:700ms]">Facilities & Amenities</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {features.map((feature, index) => (
                <Card key={index} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${800 + index * 100}ms` }}>
                    <CardHeader className="flex flex-row items-center gap-4">
                    <DynamicIcon name={feature.icon} className="w-8 h-8 text-primary shrink-0" />
                    <CardTitle className="font-serif text-xl">{feature.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                        {feature.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>
        
        {amenities.length > 0 && (
            <div className="mt-16 pt-12 border-t">
                <h3 className="font-serif text-2xl font-semibold text-center mb-8 opacity-0 animate-fade-in-up [animation-delay:700ms]">What We Offer</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl mx-auto">
                    {amenities.map((item, index) => (
                        <div key={item.id} 
                          className="flex items-center gap-3 opacity-0 animate-fade-in-up"
                          style={{ animationDelay: `${800 + index * 50}ms` }}
                        >
                          <DynamicIcon name={item.icon} className="w-6 h-6 text-primary" />
                          <span className="font-medium">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </section>
  );
}
