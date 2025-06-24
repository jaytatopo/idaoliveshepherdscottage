import Header from '@/components/header';
import Hero from '@/components/hero';
import Accommodation from '@/components/accommodation';
import Activities from '@/components/activities';
import Booking from '@/components/booking';
import Reviews from '@/components/reviews';
import Location from '@/components/location';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Accommodation />
        <Activities />
        <Booking />
        <Reviews />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
