import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { Activity } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';
import Image from 'next/image';

interface ActivitiesContent {
  heading: string;
  subheading: string;
}

interface ActivitiesProps {
    content: ActivitiesContent;
    activities: Activity[];
}

const activityImageMap: { [key: string]: { src: string; hint: string } } = {
    Mountain: { src: '/Farm Road.jpg', hint: 'hiking trail' },
    Milk: { src: '/BabyGoats.jpg', hint: 'baby goats' },
    Star: { src: '/Cottage 3.jpg', hint: 'night sky' },
    Bird: { src: '/Flowers 2.jpg', hint: 'bird nature' },
    Wine: { src: '/Flowers.jpg', hint: 'vineyard flowers' },
    Bike: { src: '/Farm Road.jpg', hint: 'mountain bike' },
    Fish: { src: '/Dam.jpg', hint: 'dam fishing' },
    BookOpen: { src: '/Stoep.jpg', hint: 'cottage stoep' },
};


export default function Activities({ content, activities }: ActivitiesProps) {
  return (
    <section id="activities" className="py-16 md:py-24 bg-card opacity-0 animate-fade-in-up [animation-delay:200ms]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => {
            const imageInfo = activityImageMap[activity.icon] || { src: '/Cottage.jpg', hint: 'activity' };
            return (
                <Card key={activity.id} className="flex flex-col text-center hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="relative">
                        <Image
                            src={imageInfo.src}
                            alt={activity.title}
                            width={400}
                            height={250}
                            className="aspect-[4/3] object-cover w-full"
                            data-ai-hint={imageInfo.hint}
                        />
                         <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-background p-3 rounded-full border">
                            <DynamicIcon name={activity.icon} className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <CardHeader className="items-center flex-grow pt-10">
                        <CardTitle className="font-serif">{activity.title}</CardTitle>
                        <CardDescription className="pt-2">{activity.description}</CardDescription>
                    </CardHeader>
                </Card>
            );
        })}
        </div>
      </div>
    </section>
  );
}
