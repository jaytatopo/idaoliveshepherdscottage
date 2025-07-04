'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Activity, GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';

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
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  return (
    <section 
      id="activities" 
      className="relative py-12 md:py-20 bg-card"
    >
      {imageBg && imageBg.src && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18] z-0"
          data-ai-hint="nature landscape"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
              <div 
                key={activity.id}
                className="cursor-pointer opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
                onClick={() => setSelectedActivity(activity)}
              >
                <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 bg-background/80 backdrop-blur-sm overflow-hidden group">
                    {activity.image_src ? (
                        <>
                            <div className="relative aspect-video w-full overflow-hidden">
                                <Image
                                    src={activity.image_src}
                                    alt={activity.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    data-ai-hint="nature activity"
                                />
                            </div>
                            
                            <div className="relative flex justify-center -mt-7">
                                <span className="bg-background p-3 rounded-full border-4 border-card shadow-lg z-10">
                                    <DynamicIcon name={activity.icon} className="w-8 h-8 text-primary" />
                                </span>
                            </div>

                            <CardHeader className="flex-grow pt-4 text-center">
                                <CardTitle className="font-serif text-xl">
                                    {activity.title}
                                </CardTitle>
                                <CardDescription className="pt-2 text-sm line-clamp-3">{activity.description}</CardDescription>
                            </CardHeader>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-6 h-full">
                            <DynamicIcon name={activity.icon} className="w-12 h-12 text-primary mb-4" />
                            <CardTitle className="font-serif text-xl mb-2">
                                {activity.title}
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-4">{activity.description}</CardDescription>
                        </div>
                    )}
                </Card>
              </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedActivity} onOpenChange={(isOpen) => !isOpen && setSelectedActivity(null)}>
        <DialogContent className="sm:max-w-lg p-0">
            {selectedActivity && (
                <>
                    <div className="relative aspect-video w-full bg-muted overflow-hidden">
                        {selectedActivity.image_src ? (
                            <Image
                                src={selectedActivity.image_src}
                                alt={selectedActivity.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        ) : (
                             <div className="flex items-center justify-center h-full">
                                <DynamicIcon name={selectedActivity.icon} className="w-16 h-16 text-muted-foreground/50" />
                            </div>
                        )}
                    </div>
                    <DialogHeader className="p-6 text-left items-start">
                        <DialogTitle className="font-serif text-2xl mb-2">{selectedActivity.title}</DialogTitle>
                        <DialogDescription className="text-base text-muted-foreground">
                            {selectedActivity.description}
                        </DialogDescription>
                    </DialogHeader>
                </>
            )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
