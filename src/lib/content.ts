import { db } from './db';
import { unstable_noStore as noStore } from 'next/cache';

export interface Amenity {
    id: number;
    icon: string;
    text: string;
    sort_order: number;
}

export interface Activity {
    id: number;
    icon: string;
    title: string;
    description: string;
    image_src: string | null;
    sort_order: number;
}

export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    section: string;
    sort_order: number;
}

export interface Review {
    id: number;
    quote: string;
    author: string;
    rating: number;
    sort_order: number;
}

export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    check_in: string;
    check_out: string;
    guests: number;
    created_at: string;
}


type ContentValue = {
    [key: string]: string;
};

type WebsiteContent = {
    [section: string]: ContentValue;
};

// Helper function to shape raw DB results into a nested object
function shapeContent(rows: any[]): WebsiteContent {
    const content: WebsiteContent = {};
    const defaultContent = {
        hero: { heading: 'Your Serene, Off-Grid Karoo Escape', subheading: 'Discover tranquility at Ida Olive Shepherd’s Cottage, a nature lover’s haven on a working dairy goat farm.' },
        accommodation: { heading: 'A Cozy, Off-Grid Retreat', subheading: 'Experience the charm of shepherd’s cottage living, thoughtfully equipped for a comfortable and memorable stay in nature.', main_text: `Ida Olive Shepherd’s Cottage is a self-catering sanctuary on the remote Giddy Goat Farm. Surrounded by the endangered Robertson Succulent Karoo, large glass sliding doors and windows seamlessly connect you to the natural beauty outside, where indigenous vegetation and wildlife thrive.`, secondary_text: 'Completely off the grid, the cottage has no electricity. The open-plan lounge and kitchen feature a gas stove and refrigerator, while an indoor fireplace keeps the space warm on cooler nights. Solar lamps, candles, and fairy lights provide a magical ambiance.' },
        activities: { heading: 'Reconnect with Nature & Adventure', subheading: `From serene on-site activities to exciting local excursions, there's something for every nature enthusiast.` },
        booking: { heading: 'Rates & Availability', subheading: 'Ready for your peaceful escape? Check our availability or send us an enquiry.' },
        reviews: { heading: 'What Our Guests Say', subheading: 'Heartfelt words from those who have experienced the magic of Ida Olive.' },
        location: { heading: 'Find Your Way to Paradise', subheading: `We're nestled in the heart of the Karoo, just a few kilometers outside the charming village of McGregor.`, address: 'Giddy Goat Farm, 6km outside McGregor, Western Cape, South Africa', email: 'reservations@idaolivecottagemcgregor.co.za', phone: '+27 12 345 6789' },
    };

    for (const row of rows) {
        if (!content[row.section]) {
            content[row.section] = {};
        }
        content[row.section][row.content_key] = row.content_value;
    }

    // Ensure all sections have a value, falling back to defaults
    for (const section in defaultContent) {
        if (!content[section]) {
            content[section] = defaultContent[section as keyof typeof defaultContent];
        } else {
            for (const key in defaultContent[section as keyof typeof defaultContent]) {
                if (!content[section][key]) {
                    content[section][key] = defaultContent[section as keyof typeof defaultContent][key as keyof typeof content[section]];
                }
            }
        }
    }

    return content;
}


export async function getContent(): Promise<WebsiteContent> {
    noStore(); // Opt out of caching for this function
    try {
        const [rows] = await db.query('SELECT section, content_key, content_value FROM page_content');
        return shapeContent(rows as any[]);
    } catch (error) {
        console.error("Failed to fetch page content, serving default content:", error);
        // Return a default structure that prevents the page from crashing.
        return shapeContent([]);
    }
}

export async function getAmenities(): Promise<Amenity[]> {
    noStore();
    try {
        const [rows] = await db.query('SELECT id, icon, text, sort_order FROM amenities ORDER BY sort_order ASC');
        return rows as Amenity[];
    } catch (error) {
        console.error("Failed to fetch amenities:", error);
        return [];
    }
}

export async function getActivities(): Promise<Activity[]> {
    noStore();
    try {
        const [rows] = await db.query('SELECT id, icon, title, description, image_src, sort_order FROM activities ORDER BY sort_order ASC');
        return rows as Activity[];
    } catch (error) {
        console.error("Failed to fetch activities:", error);
        return [];
    }
}

export async function getGalleryImages(section: string): Promise<GalleryImage[]> {
    noStore();
    try {
        const [rows] = await db.query('SELECT id, src, alt, section, sort_order FROM gallery_images WHERE section = ? ORDER BY sort_order ASC', [section]);
        return rows as GalleryImage[];
    } catch (error) {
        console.error(`Failed to fetch gallery images for section "${section}":`, error);
        return [];
    }
}

export async function getReviews(): Promise<Review[]> {
    noStore();
    try {
        const [rows] = await db.query('SELECT id, quote, author, rating, sort_order FROM reviews ORDER BY sort_order ASC');
        return rows as Review[];
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return [];
    }
}

export async function getInquiries(): Promise<Inquiry[]> {
    noStore();
    try {
        const [rows] = await db.query('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 50');
        return rows as Inquiry[];
    } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        return [];
    }
}
