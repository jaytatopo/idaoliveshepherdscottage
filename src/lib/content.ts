import { db } from './db';
import { unstable_noStore as noStore } from 'next/cache';

export interface Amenity {
    id: number;
    icon: string;
    text: string;
}

export interface Activity {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    section: string;
}

export interface Review {
    id: number;
    quote: string;
    author: string;
    rating: number;
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
    for (const row of rows) {
        if (!content[row.section]) {
            content[row.section] = {};
        }
        content[row.section][row.content_key] = row.content_value;
    }
    return content;
}


export async function getContent(): Promise<WebsiteContent> {
    noStore(); // Opt out of caching for this function
    try {
        const [rows] = await db.query('SELECT section, content_key, content_value FROM page_content');
        const content = shapeContent(rows as any[]);
        // If no content is found, throw to be caught and handled with defaults
        if (Object.keys(content).length === 0) {
            throw new Error("No content rows found in the database.");
        }
        return content;
    } catch (error) {
        console.error("Failed to fetch page content, serving default content:", error);
        // Return a default structure that prevents the page from crashing.
        return {
            hero: { heading: 'Ida Olive Shepherd’s Cottage', subheading: 'A serene, off-the-grid escape for nature lovers.' },
            accommodation: { heading: 'The Accommodation', subheading: 'Explore the comfort and charm of our cottage.', main_text: 'Default main text about the cottage.', secondary_text: 'Default secondary text with more details.' },
            activities: { heading: 'Things to Do', subheading: 'Discover local attractions and activities.' },
            booking: { heading: 'Rates & Booking', subheading: 'Check availability or send us an enquiry.' },
            reviews: { heading: 'Guest Reviews', subheading: 'Hear what our guests have to say.' },
            location: { heading: 'Our Location', subheading: 'Find your way to our peaceful retreat.', address: 'McGregor, Western Cape, South Africa', email: 'reservations@idaolive.co.za', phone: '+27 12 345 6789' },
        };
    }
}

export async function getAmenities(): Promise<Amenity[]> {
    noStore();
    try {
        const [rows] = await db.query('SELECT id, icon, text FROM amenities ORDER BY sort_order ASC');
        return rows as Amenity[];
    } catch (error) {
        console.error("Failed to fetch amenities:", error);
        return [];
    }
}

export async function getActivities(): Promise<Activity[]> {
    noStore();
    try {
        const [rows] = await db.query('SELECT id, icon, title, description FROM activities ORDER BY sort_order ASC');
        return rows as Activity[];
    } catch (error) {
        console.error("Failed to fetch activities:", error);
        return [];
    }
}

export async function getGalleryImages(section: string): Promise<GalleryImage[]> {
    noStore();
    try {
        const [rows] = await db.query('SELECT id, src, alt, section FROM gallery_images WHERE section = ? ORDER BY sort_order ASC', [section]);
        return rows as GalleryImage[];
    } catch (error) {
        console.error(`Failed to fetch gallery images for section "${section}":`, error);
        return [];
    }
}

export async function getReviews(): Promise<Review[]> {
    noStore();
    try {
        const [rows] = await db.query('SELECT id, quote, author, rating FROM reviews ORDER BY sort_order ASC');
        return rows as Review[];
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return [];
    }
}
