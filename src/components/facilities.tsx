import type { Facility, GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FacilitiesContent {
  heading: string;
  subheading: string;
}

interface FacilitiesProps {
  content: FacilitiesContent;
  facilities: Facility[];
  imageBg?: GalleryImage;
}

export default function Facilities({ content, facilities, imageBg }: FacilitiesProps) {
  if (!facilities || facilities.length === 0) return null;

  return (
    <section id="facilities" className="relative py-12 md:py-20 bg-background">
      {imageBg && imageBg.src && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-[0.18] z-0"
          data-ai-hint="cottage amenities"
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
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {facilities.map((feature, index) => (
            <Card key={index} className="opacity-0 animate-fade-in-up bg-background/70 backdrop-blur-sm" style={{ animationDelay: `${300 + index * 100}ms` }}>
                <CardHeader className="flex flex-row items-center gap-4">
                <DynamicIcon name={feature.icon} className="w-8 h-8 text-primary shrink-0" />
                <CardTitle className="font-serif text-xl">{feature.category}</CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                    {feature.items.split('\n').filter(Boolean).map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
