import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Activity, GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';
import Image from 'next/image';

interface ActivitiesContent {
  heading: string;
  subheading: string;
}

interface ActivitiesProps {
    content: ActivitiesContent;
    activities: Activity[];
    imageBg?: GalleryImage;
}

export default function Activities({ content, activities, imageBg }: ActivitiesProps) {
  return (
    <section 
      id="activities" 
      className="relative py-12 md:py-16 bg-card"
    >
      {imageBg && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-5 z-0"
          data-ai-hint="nature landscape"
        />
      )}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold opacity-0 animate-fade-in-up">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up [animation-delay:200ms]">
            {content.subheading}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => {
            return (
                <Card 
                  key={activity.id} 
                  className="flex flex-col text-center hover:shadow-xl transition-shadow duration-300 group bg-background/80 backdrop-blur-sm overflow-visible opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                    <div className="relative z-10">
                        <div className="aspect-video w-full transition-transform duration-300 group-hover:scale-105 relative bg-muted">
                            {activity.image_src ? (
                                <Image
                                    src={activity.image_src}
                                    alt={activity.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint="nature activity"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <DynamicIcon name={activity.icon} className="w-12 h-12 text-muted-foreground/50" />
                                </div>
                            )}
                        </div>
                         <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background p-3 rounded-full border-2 transition-transform duration-300 group-hover:scale-110">
                            <DynamicIcon name={activity.icon} className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <CardHeader className="items-center flex-grow pt-12">
                        <CardTitle className="font-serif text-xl">{activity.title}</CardTitle>
                        <CardDescription className="pt-2 text-sm">{activity.description}</CardDescription>
                    </CardHeader>
                </Card>
            );
        })}
        </div>
      </div>
    </section>
  );
}
