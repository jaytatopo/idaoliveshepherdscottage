import { Card, CardContent } from '@/components/ui/card';
import { Star, StarHalf } from 'lucide-react';

const testimonials = [
  {
    quote: "The cottage was an absolute dream! So peaceful and quiet, we felt a million miles away. The outdoor shower is a must-try.",
    author: "Sarah L.",
    rating: 5,
  },
  {
    quote: "A perfect romantic getaway. The stars at night are unbelievable. The hosts were lovely and the goat cheese was delicious.",
    author: "Michael B.",
    rating: 5,
  },
  {
    quote: "Great base for hiking and exploring the McGregor area. The cottage had everything we needed for a comfortable stay.",
    author: "The van der Merwe Family",
    rating: 4.5,
  },
   {
    quote: "Waking up to the sounds of nature was the best part. A truly special place to disconnect and recharge.",
    author: "Chloe T.",
    rating: 5,
  },
];

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


export default function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">What Our Guests Say</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            Heartfelt words from those who have experienced the magic of Ida Olive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
                <Card key={index} className="flex flex-col">
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
