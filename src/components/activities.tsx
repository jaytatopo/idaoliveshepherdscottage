
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Activity, GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';
import { Image as ImageIcon } from 'lucide-react';
import { getClientActivities, getClientGalleryImages } from '@/app/actions/content-actions';
import { Skeleton } from './ui/skeleton';

interface ActivitiesContent {
  heading: string;
  subheading: string;
}

interface ActivitiesProps {
    content: ActivitiesContent;
}

export default function Activities({ content }: ActivitiesProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [imageBg, setImageBg] = useState<GalleryImage | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [activitiesResult, bgResult] = await Promise.all([
          getClientActivities(),
          getClientGalleryImages('activities_bg')
        ]);
        if (activitiesResult.success && activitiesResult.data) {
          setActivities(activitiesResult.data);
        }
        if (bgResult.success && bgResult.data) {
          setImageBg(bgResult.data[0]);
        }
      } catch (error) {
        console.error("Failed to load activities data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <section 
      id="activities" 
      className="relative py-12 md:py-20 bg-card"
    >
      {imageBg && imageBg.src_url && (
        <Image
          src={imageBg.src_url}
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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="flex flex-col h-full bg-background/80 backdrop-blur-sm overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="relative flex justify-center -mt-7">
                  <Skeleton className="w-16 h-16 rounded-full" />
                </div>
                <CardHeader className="flex-grow pt-4 text-center">
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-5/6 mt-1 mx-auto" />
                </CardHeader>
              </Card>
            ))
          ) : (
            activities.map((activity, index) => (
                <div 
                  key={activity.id}
                  className="cursor-pointer opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                  onClick={() => setSelectedActivity(activity)}
                >
                  <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 bg-background/80 backdrop-blur-sm overflow-hidden group">
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          {activity.src_url ? (
                              <Image
                                  src={activity.src_url}
                                  alt={activity.title}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  data-ai-hint="nature activity"
                              />
                          ) : (
                               <div className="flex items-center justify-center h-full">
                                  <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
                              </div>
                          )}
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
                  </Card>
                </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={!!selectedActivity} onOpenChange={(isOpen) => !isOpen && setSelectedActivity(null)}>
        <DialogContent className="sm:max-w-lg p-0">
            {selectedActivity && (
                <>
                    <div className="relative aspect-video w-full bg-muted overflow-hidden">
                        {selectedActivity.src_url ? (
                            <Image
                                src={selectedActivity.src_url}
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
