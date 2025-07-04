
import Header from '@/components/header';
import Hero from '@/components/hero';
import Accommodation from '@/components/accommodation';
import Activities from '@/components/activities';
import Booking from '@/components/booking';
import Reviews from '@/components/reviews';
import Location from '@/components/location';
import Gallery from '@/components/gallery';
import Footer from '@/components/footer';
import { getContent, getAmenities, getActivities, getGalleryImages, getReviews as fetchReviews } from '@/lib/content';

export const revalidate = 3600; // Revalidate at most every hour

export default async function Home() {
  const content = await getContent();
  const amenities = await getAmenities();
  const activities = await getActivities();
  const accommodationGalleryImages = await getGalleryImages('accommodation');
  const heroImage = (await getGalleryImages('hero'))[0];
  const reviewsData = await fetchReviews();
  const reviewsImage = (await getGalleryImages('reviews'))[0];
  const phone = content.location?.phone;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero content={content.hero} image={heroImage} />
        <Accommodation 
          content={content.accommodation} 
          amenities={amenities}
          images={accommodationGalleryImages.slice(0, 2)}
        />
        <Gallery galleryImages={accommodationGalleryImages} />
        <Activities content={content.activities} activities={activities} />
        <Booking content={content.booking} phone={phone} />
        <Reviews content={content.reviews} reviews={reviewsData} image={reviewsImage} />
        <Location content={content.location}/>
      </main>
      <Footer />
    </div>
  );
}
