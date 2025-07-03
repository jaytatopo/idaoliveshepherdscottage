import { Card, CardContent } from '@/components/ui/card';
import { Star, StarHalf } from 'lucide-react';
import type { Review } from '@/lib/content';

interface ReviewsContent {
  heading: string;
  subheading: string;
}

interface ReviewsProps {
  content: ReviewsContent;
  reviews: Review[];
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

export default function Reviews({ content, reviews }: ReviewsProps) {
  return (
    <section 
        id="reviews" 
        className="py-20 md:py-32 bg-card opacity-0 animate-fade-in-up [animation-delay:600ms] relative bg-cover bg-center bg-fixed"
        style={{backgroundImage: "url('/Stoep 1.jpg')"}}
        data-ai-hint="cottage stoep"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.slice(0, 4).map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col bg-background/80 backdrop-blur-md">
              <CardContent className="p-6 flex-grow">
                <div className="flex mb-2">
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
              <div className="p-6 pt-0 text-right">
                <p className="font-semibold font-serif">- {testimonial.author}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
