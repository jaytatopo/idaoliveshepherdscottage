
import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import { 
    getContent, 
    getAmenities as fetchAmenities, 
    getFacilities as fetchFacilities,
    getReviews as fetchReviews, 
    getFaqs,
    getPageSections,
    getSpecials
} from '@/lib/content';
import StructuredData from '@/components/structured-data';

export const revalidate = 3600; // Revalidate at most every hour

// Lazy load components that are not critical for the initial view
const Accommodation = dynamic(() => import('@/components/accommodation'));
const Activities = dynamic(() => import('@/components/activities'));
const Booking = dynamic(() => import('@/components/booking'));
const Reviews = dynamic(() => import('@/components/reviews'));
const Location = dynamic(() => import('@/components/location'));
const Gallery = dynamic(() => import('@/components/gallery'));
const Facilities = dynamic(() => import('@/components/facilities'));
const Amenities = dynamic(() => import('@/components/amenities'));
const Faq = dynamic(() => import('@/components/faq'));
const HostProfile = dynamic(() => import('@/components/host-profile'));
const CallToAction = dynamic(() => import('@/components/cta'));
const Video = dynamic(() => import('@/components/video'));
const Specials = dynamic(() => import('@/components/specials'));

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  hero: Hero,
  accommodation: Accommodation,
  amenities: Amenities,
  facilities: Facilities,
  activities: Activities,
  gallery: Gallery,
  booking: Booking,
  reviews: Reviews,
  location: Location,
  faq: Faq,
  host: HostProfile,
  cta: CallToAction,
  video: Video,
  specials: Specials,
};

// Fetch only the data needed for the initial server render.
// All other data (especially images) will be fetched client-side inside each component.
async function getInitialPageData() {
    const [
        content,
        amenities,
        facilities,
        reviews,
        faqs,
        specials,
    ] = await Promise.all([
        getContent(),
        fetchAmenities(),
        fetchFacilities(),
        fetchReviews(),
        getFaqs(),
        getSpecials(),
    ]);

    return {
        content,
        amenities,
        facilities,
        reviews,
        faqs,
        specials,
    };
}


export default async function Home() {
  const pageSections = await getPageSections();
  const initialData = await getInitialPageData();

  const getSectionProps = (type: string) => {
    switch (type) {
      case 'hero':
        return { content: initialData.content.hero };
      case 'accommodation':
        return { content: initialData.content.accommodation };
      case 'gallery':
        return {};
      case 'amenities':
        return { content: initialData.content.amenities, amenities: initialData.amenities };
      case 'facilities':
        return { content: initialData.content.facilities, facilities: initialData.facilities };
      case 'activities':
        return { content: initialData.content.activities };
      case 'booking':
        return { content: initialData.content.booking, phone: initialData.content.location?.phone };
      case 'reviews':
        return { content: initialData.content.reviews, reviews: initialData.reviews };
      case 'location':
        return { content: initialData.content.location };
      case 'faq':
        return { content: initialData.content.faq, faqs: initialData.faqs };
      case 'host':
        return { content: initialData.content.host };
      case 'cta':
        return { content: initialData.content.cta };
      case 'video':
        return { content: initialData.content.video };
      case 'specials':
        return { content: initialData.content.specials, specials: initialData.specials };
      default:
        return {};
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <StructuredData content={initialData.content} />
      <Header />
      <main className="flex-1">
        {pageSections.map((section) => {
            if (!section.is_visible) return null;
            const Component = sectionComponents[section.section_type];
            if (!Component) return null;

            return (
                <Component key={section.id} {...getSectionProps(section.section_type)} />
            );
        })}
      </main>
      <Footer />
    </div>
  );
}
