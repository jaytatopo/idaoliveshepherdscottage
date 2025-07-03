import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Activity } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';


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
    <section id="activities" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity) => (
            <Card key={activity.id} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <DynamicIcon name={activity.icon} className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-serif">{activity.title}</CardTitle>
                <CardDescription className="pt-2">{activity.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
