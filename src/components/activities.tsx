
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

export default function Activities({ content, activities }: ActivitiesProps) {
  return (
    <section 
      id="activities" 
      className="py-16 md:py-24 bg-card opacity-0 animate-fade-in-up [animation-delay:200ms]"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => {
            return (
                <Card key={activity.id} className="flex flex-col text-center hover:shadow-xl transition-shadow duration-300 overflow-hidden group bg-background">
                    <div className="relative overflow-hidden">
                        <Image
                            src={activity.image_src || 'https://placehold.co/300x200.png'}
                            alt={activity.title}
                            width={300}
                            height={200}
                            className="aspect-video object-cover w-full transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint="nature activity"
                        />
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
