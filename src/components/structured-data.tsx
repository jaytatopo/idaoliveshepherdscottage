
import type { WebsiteContent, GalleryImage } from '@/lib/content';

interface StructuredDataProps {
    content: WebsiteContent;
}

export default function StructuredData({ content }: StructuredDataProps) {
    const location = content.location;
    const hero = content.hero;
    
    if (!location || !hero) return null;

    // TODO: Replace with your actual production domain
    const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const ogImageUrl = 'https://placehold.co/1200x630.png';

    const data = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": "Ida Olive Shepherd’s Cottage",
        "description": hero.subheading,
        "image": ogImageUrl,
        "telephone": location.phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rheeboks Kraal Farm",
            "addressLocality": "McGregor",
            "addressRegion": "Western Cape",
            "postalCode": "6708",
            "addressCountry": "ZA"
        },
        "priceRange": "R1800 - R2500",
        "url": siteUrl,
        "hasMap": "https://www.google.com/maps/place/McGregor,+6708/@-33.9641478,19.8260609,17z/data=!3m1!4b1!4m6!3m5!1s0x1dd243491f893d5d%3A0xf6b5860731a31b41!8m2!3d-33.9641523!4d19.8286358!16s%2Fm%2F02pw_yq?entry=ttu",
        "amenityFeature": [
            {
                "@type": "LocationFeatureSpecification",
                "name": "Off-grid"
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "2 Bedrooms"
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Sleeps 4 Adults"
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Self-catering"
            }
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
