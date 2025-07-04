import { db } from './db';
import { unstable_noStore as noStore } from 'next/cache';

export interface Amenity {
    id: number;
    icon: string;
    text: string;
    sort_order: number;
}

export interface Facility {
    id: number;
    icon: string;
    category: string;
    items: string;
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
    source: string | null;
    sort_order: number;
}

export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    check_in: string | null;
    check_out: string | null;
    guests: number;
    message: string;
    created_at: string;
}

export interface PageSection {
    id: number;
    section_type: string;
    title: string;
    is_visible: boolean;
    sort_order: number;
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
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
        hero: { 
            heading: 'Ida Olive Shepherd’s Cottage', 
            subheading: 'A rustic, off-the-grid, self-catering retreat for adults seeking a peaceful and romantic Karoo escape.' 
        },
        accommodation: { 
            heading: 'The Cottage: Rustic Luxe Meets Off-Grid Charm', 
            subheading: 'Experience the authentic Karoo in a beautifully restored shepherd\'s cottage, blending original character with modern comforts.',
            main_text: `Ida Olive Shepherd's Cottage is a sanctuary on the Giddy Goat Farm—a working dairy goat farm and wildlife sanctuary. It features beautifully restored stone and timber architecture, offering a unique "rustic-luxe" feel.\n\nThe property is completely off-grid, making it ideal for nature lovers wanting to disconnect and reconnect with the serene surroundings of the endangered Robertson Succulent Karoo.`,
            secondary_text: 'The cottage accommodates a maximum of 4 adults, perfect for a romantic getaway or a quiet retreat with friends. It includes two bedrooms (one king, one queen) and a main bathroom with a bath, walk-in indoor shower, and a separate outdoor shower for a truly immersive nature experience.',
        },
        amenities: {
            heading: 'Amenities',
            subheading: 'Curated comforts for an unforgettable off-grid experience.'
        },
        facilities: {
            heading: 'Facilities',
            subheading: 'Details about what the cottage includes.',
        },
        activities: { 
            heading: 'Explore & Experience', 
            subheading: `Enjoy on-site hiking, birdwatching, and unique "goat experiences." The lack of light pollution makes for exceptional stargazing. Nearby, explore McGregor's wineries, restaurants, and the Vrolijkheid Nature Reserve.` 
        },
        booking: { 
            heading: 'Rates & Availability', 
            subheading: 'Ready for your peaceful escape? Check availability below or send us an enquiry.',
            rules_items: 'Strictly for adults only. No children or infants.\nNo pets allowed.\nNo parties or events.\nSmoking is not permitted on the property.',
            checkin_items: 'Check-in is from 14:00. Closing times vary by booking site (17:00-20:00). Please confirm your arrival time.\nCheck-out is between 10:00 and 11:00.\nDaily cleaning is not included but can be arranged for longer stays.',
            practical_items: 'Guests are advised to bring their own drinking water.\nWe are off-grid: there is no Wi-Fi and limited mobile signal.\nPlease bring cash for any on-site extras like farm produce.',
        },
        reviews: { 
            heading: 'What Our Guests Say', 
            subheading: 'Heartfelt words from those who have experienced the magic of Ida Olive.' 
        },
        location: { 
            heading: 'Find Your Way to Paradise', 
            subheading: `We're nestled in a remote wildlife sanctuary on Rheeboks Kraal Farm, just 6km outside the historic village of McGregor. Access is via a gravel road.`, 
            address: 'Rheeboks Kraal Farm, McGregor, 6708, Western Cape', 
            email: 'reservations@idaolivecottagemcgregor.co.za', 
            phone: '+27 12 345 6789', 
            facebook_url: '', 
            instagram_url: '' 
        },
        faq: {
            heading: 'Frequently Asked Questions',
            subheading: 'Your questions, answered.'
        },
        host: {
            heading: 'Meet Your Hosts',
            subheading: 'We\'re delighted to welcome you to our little piece of paradise.',
            name: 'Tina & The Giddy Goats',
            bio: 'As your hosts, we are passionate about sustainable living, conservation, and sharing the unique beauty of the Karoo. We live on the farm and are available to assist with anything you need, from farm-fresh goat milk for your coffee to recommendations for local activities. Our goal is to make your stay unforgettable.'
        },
        cta: {
            heading: 'Ready for a Digital Detox?',
            subheading: 'Escape the noise. Reconnect with nature. Find your peace at Ida Olive.',
            button_text: 'Book Your Escape Now',
            button_url: '#booking',
        },
        video: {
            heading: 'A Glimpse of Ida Olive',
            subheading: 'Press play and transport yourself to the tranquility of the Karoo.',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
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
        const { rows } = await db.query('SELECT section, content_key, content_value FROM page_content');
        return shapeContent(rows);
    } catch (error) {
        console.error("Failed to fetch page content, serving default content:", error);
        // Return a default structure that prevents the page from crashing.
        return shapeContent([]);
    }
}

export async function getAmenities(): Promise<Amenity[]> {
    noStore();
    try {
        const { rows } = await db.query('SELECT id, icon, text, sort_order FROM amenities ORDER BY sort_order ASC');
        return rows as Amenity[];
    } catch (error) {
        console.error("Failed to fetch amenities:", error);
        return [];
    }
}

export async function getFacilities(): Promise<Facility[]> {
    noStore();
    try {
        const { rows } = await db.query('SELECT id, icon, category, items, sort_order FROM facilities ORDER BY sort_order ASC');
        return rows as Facility[];
    } catch (error) {
        console.error("Failed to fetch facilities:", error);
        return [];
    }
}

export async function getFaqs(): Promise<FAQ[]> {
    noStore();
    try {
        const { rows } = await db.query('SELECT id, question, answer, sort_order FROM faq ORDER BY sort_order ASC');
        return rows as FAQ[];
    } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        return [];
    }
}

export async function getActivities(): Promise<Activity[]> {
    noStore();
    try {
        const { rows } = await db.query('SELECT id, icon, title, description, image_src, sort_order FROM activities ORDER BY sort_order ASC');
        return rows as Activity[];
    } catch (error) {
        console.error("Failed to fetch activities:", error);
        return [];
    }
}

export async function getGalleryImages(section: string): Promise<GalleryImage[]> {
    noStore();
    try {
        const { rows } = await db.query('SELECT id, src, alt, section, sort_order FROM gallery_images WHERE section = $1 ORDER BY sort_order ASC', [section]);
        return rows as GalleryImage[];
    } catch (error) {
        console.error(`Failed to fetch gallery images for section "${section}":`, error);
        return [];
    }
}

export async function getReviews(): Promise<Review[]> {
    noStore();
    try {
        const { rows } = await db.query('SELECT id, quote, author, rating, source, sort_order FROM reviews ORDER BY sort_order ASC');
        return rows as Review[];
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return [];
    }
}

export async function getInquiries(): Promise<Inquiry[]> {
    noStore();
    try {
        const { rows } = await db.query('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 50');
        return rows as Inquiry[];
    } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        return [];
    }
}

export async function getPageSections(): Promise<PageSection[]> {
    noStore();
    try {
        const { rows } = await db.query('SELECT * FROM page_sections WHERE is_visible = TRUE ORDER BY sort_order ASC');
        if (rows.length === 0) throw new Error("No sections found");
        return rows as PageSection[];
    } catch (error) {
        console.error("Failed to fetch page sections, returning default order:", error);
        // Fallback to a default order if table doesn't exist or is empty
        return [
            { id: 1, section_type: 'hero', title: 'Hero', is_visible: true, sort_order: 10 },
            { id: 2, section_type: 'accommodation', title: 'Accommodation', is_visible: true, sort_order: 20 },
            { id: 3, section_type: 'amenities', title: 'Amenities', is_visible: true, sort_order: 30 },
            { id: 4, section_type: 'facilities', title: 'Facilities', is_visible: true, sort_order: 40 },
            { id: 5, section_type: 'activities', title: 'Activities', is_visible: true, sort_order: 50 },
            { id: 6, section_type: 'gallery', title: 'Gallery', is_visible: true, sort_order: 60 },
            { id: 7, section_type: 'booking', title: 'Rates & Booking', is_visible: true, sort_order: 70 },
            { id: 8, section_type: 'reviews', title: 'Reviews', is_visible: true, sort_order: 80 },
            { id: 9, section_type: 'location', title: 'Location', is_visible: true, sort_order: 90 },
        ];
    }
}

export async function getAllPageSections(): Promise<PageSection[]> {
    noStore();
    try {
        const { rows } = await db.query('SELECT * FROM page_sections ORDER BY sort_order ASC');
        if (rows.length === 0) {
             // Fallback to a default order if table is empty
            return getPageSections();
        }
        return rows as PageSection[];
    } catch (error) {
        console.error("Failed to fetch all page sections, returning default visible sections:", error);
        return getPageSections();
    }
}
