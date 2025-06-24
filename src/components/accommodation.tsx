import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BedDouble, Bath, Wind, FlameKindling, UtensilsCrossed, Star, WifiOff, Trees } from 'lucide-react';

const amenities = [
  { icon: BedDouble, text: '2 Bedrooms (King & Queen)' },
  { icon: Bath, text: 'Indoor & Outdoor Showers' },
  { icon: FlameKindling, text: 'Cozy Indoor Fireplace' },
  { icon: UtensilsCrossed, text: 'Gas Stove & Fridge' },
  { icon: Star, text: 'Boma & Gas Braai Areas' },
  { icon: WifiOff, text: 'Completely Off-the-Grid' },
  { icon: Trees, text: 'Robertson Succulent Karoo' },
];

const galleryImages = [
  { src: 'https://placehold.co/600x400.png', alt: 'Cozy bedroom with a king-size bed', hint: 'cottage bedroom' },
  { src: 'https://placehold.co/600x400.png', alt: 'Open-plan living area with fireplace', hint: 'cottage living room' },
  { src: 'https://placehold.co/600x400.png', alt: 'Bathroom with a view of the Karoo', hint: 'cottage bathroom' },
  { src: 'https://placehold.co/600x400.png', alt: 'Outdoor shower surrounded by nature', hint: 'outdoor shower nature' },
];

export default function Accommodation() {
  return (
    <section id="accommodation" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">A Cozy, Off-Grid Retreat</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the charm of shepherd’s cottage living, thoughtfully equipped for a comfortable and memorable stay in nature.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-semibold">The Heart of the Cottage</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ida Olive Shepherd’s Cottage is a self-catering sanctuary on the remote Giddy Goat Farm. Surrounded by the endangered Robertson Succulent Karoo, large glass sliding doors and windows seamlessly connect you to the natural beauty outside, where indigenous vegetation and wildlife thrive.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Completely off the grid, the cottage has no electricity. The open-plan lounge and kitchen feature a gas stove and refrigerator, while an indoor fireplace keeps the space warm on cooler nights. Solar lamps, candles, and fairy lights provide a magical ambiance.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {amenities.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon className="w-6 h-6 text-primary" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((img, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="aspect-video object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                    data-ai-hint={img.hint}
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
