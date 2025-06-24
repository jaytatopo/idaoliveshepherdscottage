import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mountain, Wine, Star, Bird, Bike, Fish, Milk, BookOpen } from 'lucide-react';

const activities = [
  {
    icon: Mountain,
    title: "Hiking Trails",
    description: "Explore the scenic beauty of the Karoo on foot with our on-site trails."
  },
  {
    icon: Milk,
    title: "Goat Experiences",
    description: "Meet our dairy goats and enjoy a unique cheese tasting session on the farm."
  },
  {
    icon: Star,
    title: "Stargazing",
    description: "With no light pollution, the night sky offers a breathtaking celestial display."
  },
  {
    icon: Bird,
    title: "Birdwatching",
    description: "A haven for bird lovers, with diverse species to spot in their natural habitat."
  },
  {
    icon: Wine,
    title: "Wine Tasting",
    description: "The McGregor and Robertson valleys offer world-class wineries just a short drive away."
  },
  {
    icon: Bike,
    title: "Mountain Biking",
    description: "Challenge yourself on the numerous MTB routes available in the surrounding area."
  },
   {
    icon: Fish,
    title: "Fishing",
    description: "Cast a line in nearby dams and rivers for a relaxing day by the water."
  },
  {
    icon: BookOpen,
    title: "Visit McGregor",
    description: "Explore the charming village with its craft shops, restaurants, and theatre."
  },
];

export default function Activities() {
  return (
    <section id="activities" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Reconnect with Nature & Adventure</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            From serene on-site activities to exciting local excursions, there's something for every nature enthusiast.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <activity.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline">{activity.title}</CardTitle>
                <CardDescription className="pt-2">{activity.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
