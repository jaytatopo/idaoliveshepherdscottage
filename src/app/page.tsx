import React from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Accommodation from '@/components/accommodation';
import Activities from '@/components/activities';
import Booking from '@/components/booking';
import Reviews from '@/components/reviews';
import Location from '@/components/location';
import Gallery from '@/components/gallery';
import Facilities from '@/components/facilities';
import Amenities from '@/components/amenities';
import Faq from '@/components/faq';
import HostProfile from '@/components/host-profile';
import CallToAction from '@/components/cta';
import Video from '@/components/video';
import Footer from '@/components/footer';
import { 
    getContent, 
    getAmenities as fetchAmenities, 
    getFacilities as fetchFacilities,
    getActivities as fetchActivities, 
    getGalleryImages, 
    getReviews as fetchReviews, 
    getFaqs,
    getPageSections 
} from '@/lib/content';

export const revalidate = 3600; // Revalidate at most every hour

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
};

async function getAllData() {
    const [
        content,
        amenities,
        facilities,
        activities,
        reviews,
        faqs,
        accommodationGalleryImages,
        heroImage,
        accommodationBg,
        amenitiesBg,
        facilitiesBg,
        activitiesBg,
        reviewsBg,
        bookingBg,
        locationBg,
        hostProfileImage,
        hostBg,
        faqBg,
        ctaBg,
        videoBg,
    ] = await Promise.all([
        getContent(),
        fetchAmenities(),
        fetchFacilities(),
        fetchActivities(),
        fetchReviews(),
        getFaqs(),
        getGalleryImages('accommodation'),
        getGalleryImages('hero').then(images => images[0]),
        getGalleryImages('accommodation_bg').then(images => images[0]),
        getGalleryImages('amenities_bg').then(images => images[0]),
        getGalleryImages('facilities_bg').then(images => images[0]),
        getGalleryImages('activities_bg').then(images => images[0]),
        getGalleryImages('reviews').then(images => images[0]),
        getGalleryImages('booking_bg').then(images => images[0]),
        getGalleryImages('location_bg').then(images => images[0]),
        getGalleryImages('host_profile').then(images => images[0]),
        getGalleryImages('host_bg').then(images => images[0]),
        getGalleryImages('faq_bg').then(images => images[0]),
        getGalleryImages('cta_bg').then(images => images[0]),
        getGalleryImages('video_bg').then(images => images[0]),
    ]);

    return {
        content,
        amenities,
        facilities,
        activities,
        reviews,
        faqs,
        accommodationGalleryImages,
        hostProfileImage,
        backgrounds: {
            hero: heroImage,
            accommodation: accommodationBg,
            amenities: amenitiesBg,
            facilities: facilitiesBg,
            activities: activitiesBg,
            reviews: reviewsBg,
            booking: bookingBg,
            location: locationBg,
            host: hostBg,
            faq: faqBg,
            cta: ctaBg,
            video: videoBg,
        },
    };
}


export default async function Home() {
  const pageSections = await getPageSections();
  const allData = await getAllData();

  const getSectionProps = (type: string) => {
    switch (type) {
      case 'hero':
        return { content: allData.content.hero, image: allData.backgrounds.hero };
      case 'accommodation':
        return { content: allData.content.accommodation, images: allData.accommodationGalleryImages.slice(0, 2), imageBg: allData.backgrounds.accommodation };
      case 'gallery':
        return { galleryImages: allData.accommodationGalleryImages };
      case 'amenities':
        return { content: allData.content.amenities, amenities: allData.amenities, imageBg: allData.backgrounds.amenities };
      case 'facilities':
        return { content: allData.content.facilities, facilities: allData.facilities, imageBg: allData.backgrounds.facilities };
      case 'activities':
        return { content: allData.content.activities, activities: allData.activities, imageBg: allData.backgrounds.activities };
      case 'booking':
        return { content: allData.content.booking, phone: allData.content.location?.phone, imageBg: allData.backgrounds.booking };
      case 'reviews':
        return { content: allData.content.reviews, reviews: allData.reviews, imageBg: allData.backgrounds.reviews };
      case 'location':
        return { content: allData.content.location, imageBg: allData.backgrounds.location };
      case 'faq':
        return { content: allData.content.faq, faqs: allData.faqs, imageBg: allData.backgrounds.faq };
      case 'host':
        return { content: allData.content.host, image: allData.hostProfileImage, imageBg: allData.backgrounds.host };
      case 'cta':
        return { content: allData.content.cta, imageBg: allData.backgrounds.cta };
      case 'video':
        return { content: allData.content.video, imageBg: allData.backgrounds.video };
      default:
        return {};
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
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
