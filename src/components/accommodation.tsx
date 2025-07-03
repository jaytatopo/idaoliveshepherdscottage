import type { Amenity } from '@/lib/content';
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
}

export default function Accommodation({ content, amenities }: AccommodationProps) {
  return (
    <section id="accommodation" className="py-16 md:py-24 bg-background opacity-0 animate-fade-in-up">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-4">
              <h3 className="font-serif text-2xl font-semibold">The Heart of the Cottage</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {content.main_text}
              </p>
          </div>
          <div className="space-y-4">
              <h3 className="font-serif text-2xl font-semibold">Amenities & Comforts</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {content.secondary_text}
              </p>
               <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4">
                  {amenities.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                      <DynamicIcon name={item.icon} className="w-6 h-6 text-primary" />
                      <span className="font-medium">{item.text}</span>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
