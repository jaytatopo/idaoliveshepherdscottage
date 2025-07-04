
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
import Footer from '@/components/footer';
import { getContent, getAmenities as fetchAmenities, getActivities as fetchActivities, getGalleryImages, getReviews as fetchReviews, getPageSections } from '@/lib/content';

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
};

async function getAllData() {
    const [
        content,
        amenities,
        activities,
        reviews,
        accommodationGalleryImages,
        heroImage,
        accommodationBg,
        amenitiesBg,
        facilitiesBg,
        activitiesBg,
        reviewsBg,
        bookingBg,
        locationBg,
    ] = await Promise.all([
        getContent(),
        fetchAmenities(),
        fetchActivities(),
        fetchReviews(),
        getGalleryImages('accommodation'),
        getGalleryImages('hero').then(images => images[0]),
        getGalleryImages('accommodation_bg').then(images => images[0]),
        getGalleryImages('amenities_bg').then(images => images[0]),
        getGalleryImages('facilities_bg').then(images => images[0]),
        getGalleryImages('activities_bg').then(images => images[0]),
        getGalleryImages('reviews').then(images => images[0]),
        getGalleryImages('booking_bg').then(images => images[0]),
        getGalleryImages('location_bg').then(images => images[0]),
    ]);

    return {
        content,
        amenities,
        activities,
        reviews,
        accommodationGalleryImages,
        backgrounds: {
            hero: heroImage,
            accommodation: accommodationBg,
            amenities: amenitiesBg,
            facilities: facilitiesBg,
            activities: activitiesBg,
            reviews: reviewsBg,
            booking: bookingBg,
            location: locationBg,
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
        return { content: allData.content.facilities, imageBg: allData.backgrounds.facilities };
      case 'activities':
        return { content: allData.content.activities, activities: allData.activities, imageBg: allData.backgrounds.activities };
      case 'booking':
        return { content: allData.content.booking, phone: allData.content.location?.phone, imageBg: allData.backgrounds.booking };
      case 'reviews':
        return { content: allData.content.reviews, reviews: allData.reviews, imageBg: allData.backgrounds.reviews };
      case 'location':
        return { content: allData.content.location, imageBg: allData.backgrounds.location };
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
