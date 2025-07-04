'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, StarHalf } from 'lucide-react';
import type { Review, GalleryImage } from '@/lib/content';
import Image from 'next/image';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

interface ReviewsProps {
  content: {
    heading: string;
    subheading: string;
  };
  reviews: Review[];
  imageBg?: GalleryImage;
}

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full_${i}`} className="w-5 h-5 text-accent fill-current" />);
  }
  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className="w-5 h-5 text-accent fill-current" />);
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty_${i}`} className="w-5 h-5 text-accent" />);
  }
  return stars;
};

// Reusable ReviewCard component
const ReviewCard = ({ review, truncate = false }: { review: Review, truncate?: boolean }) => (
    <Card className="flex flex-col bg-background/80 backdrop-blur-sm shadow-md h-full">
        <CardContent className="p-6 flex-grow flex flex-col">
            <div className="flex mb-2">{renderStars(review.rating)}</div>
            <blockquote className={cn(
              "text-muted-foreground italic flex-grow",
              truncate && "line-clamp-4"
            )}>
                "{review.quote}"
            </blockquote>
        </CardContent>
        <div className="p-6 pt-0 text-right">
            <p className="font-semibold font-serif">- {review.author}</p>
            {review.source && (
                <p className="text-xs text-muted-foreground">From {review.source}</p>
            )}
        </div>
    </Card>
);


export default function Reviews({ content, reviews, imageBg }: ReviewsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviewsToShow = reviews.slice(0, 4);

  return (
    <section 
        id="reviews" 
        className="relative py-12 md:py-16 bg-card opacity-0 animate-fade-in-up [animation-delay:600ms] overflow-hidden"
    >
      {imageBg && (
        <Image
          src={imageBg.src}
          alt={imageBg.alt}
          fill
          className="object-cover opacity-5 z-0"
          data-ai-hint="cozy setting"
        />
      )}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviewsToShow.map((testimonial) => (
            <ReviewCard key={testimonial.id} review={testimonial} truncate={true} />
          ))}
        </div>

        {reviews.length > 4 && (
          <div className="text-center mt-12">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button>Show All {reviews.length} Reviews</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">All Guest Reviews</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow pr-6 -mr-6">
                  <div className="space-y-6">
                    {reviews.map((testimonial) => (
                      <ReviewCard key={`modal-${testimonial.id}`} review={testimonial} />
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </section>
  );
}
