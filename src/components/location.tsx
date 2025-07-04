import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Mail, Phone } from 'lucide-react';

interface LocationContent {
  heading: string;
  subheading: string;
  address: string;
  email: string;
  phone: string;
}

export default function Location({ content }: { content: LocationContent }) {
  return (
    <section id="location" className="relative py-16 md:py-24 bg-background opacity-0 animate-fade-in-up [animation-delay:800ms] overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-2 relative h-80 lg:h-full min-h-[300px]">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.106517852355!2d19.82606087570201!3d-33.96414777328905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dd243491f893d5d%3A0xf6b5860731a31b41!2sMcGregor%2C%206708!5e0!3m2!1sen!2sza!4v1716900238148!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location of Ida Olive Cottage"
                  className='absolute inset-0 w-full h-full'
                ></iframe>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="font-serif text-2xl font-semibold mb-6">Contact & Directions</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-primary shrink-0" />
                  <span>{content.address}</span>
                </div>
                 <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href={`mailto:${content.email}`} className="hover:text-primary transition-colors">
                    {content.email}
                  </a>
                </div>
                 <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>{content.phone}</span>
                </div>
              </div>
              <Button asChild className="mt-8">
                 <a href="https://www.google.com/maps/place/McGregor,+6708/@-33.9641478,19.8260609,17z/data=!3m1!4b1!4m6!3m5!1s0x1dd243491f893d5d:0xf6b5860731a31b41!8m2!3d-33.9641523!4d19.8286358!16s%2Fm%2F02pw_yq?entry=ttu" target="_blank" rel="noopener noreferrer">
                    Get Directions on Google Maps
                 </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
