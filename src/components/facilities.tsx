import type { GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Leaf } from 'lucide-react';

interface FacilitiesContent {
  heading: string;
  subheading: string;
  power_tech_items?: string;
  kitchen_living_items?: string;
  outdoor_living_items?: string;
  parking_access_items?: string;
}

interface FacilitiesProps {
  content: FacilitiesContent;
  imageBg?: GalleryImage;
}

export default function Facilities({ content, imageBg }: FacilitiesProps) {
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
    <section id="facilities" className="relative py-16 md:py-24 bg-background">
      {imageBg && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-5 z-0"
          data-ai-hint="cottage amenities"
        />
      )}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold opacity-0 animate-fade-in-up flex items-center justify-center gap-3">
             <Leaf className="w-7 h-7 text-primary/80" />
            {content.heading}
            <Leaf className="w-7 h-7 text-primary/80 scale-x-[-1]" />
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up [animation-delay:200ms]">
            {content.subheading}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
            <Card key={index} className="opacity-0 animate-fade-in-up bg-background/70 backdrop-blur-sm" style={{ animationDelay: `${300 + index * 100}ms` }}>
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
    </section>
  );
}
