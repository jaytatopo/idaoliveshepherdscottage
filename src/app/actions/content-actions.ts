
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { PageSection, GalleryImage, Activity, Special } from '@/lib/content';
import { 
    getGalleryImages as fetchGalleryImages,
    getActivities as fetchActivities,
    getSpecials as fetchSpecials
} from '@/lib/content';

const MAX_FILE_SIZE_MB = 3;

// Helper function to update a single content entry
async function updateSingleContent(section: string, key: string, value: string) {
    const sql = `
        INSERT INTO page_content (section, content_key, content_value)
        VALUES ($1, $2, $3)
        ON CONFLICT (section, content_key) 
        DO UPDATE SET content_value = $3
    `;
    await db.execute(sql, [section, key, value]);
}

// Action to update text content from a form
export async function updateContent(prevState: any, formData: FormData) {
    const updates = [];
    for (const [key, value] of formData.entries()) {
        const firstUnderscoreIndex = key.indexOf('_');
        // Ensure there's an underscore to split by. If not, it's not a field we can parse.
        if (firstUnderscoreIndex === -1) {
            continue;
        }

        const section = key.substring(0, firstUnderscoreIndex);
        const content_key = key.substring(firstUnderscoreIndex + 1);

        if (section && content_key && value !== null) {
            // Normalize newlines to prevent \r\n issues from different OSes
            const normalizedValue = value.toString().replace(/\r\n/g, '\n');
            updates.push(updateSingleContent(section, content_key, normalizedValue));
        }
    }
    
    try {
        await Promise.all(updates);
        revalidatePath('/', 'layout');
        revalidatePath('/admin/dashboard', 'layout');
        return { success: true, message: 'Content updated successfully.' };
    } catch (error: any) {
        console.error('Failed to update content:', error);
        return { success: false, message: `Failed to update content. Details: ${error.message}` };
    }
}

// Action to upload a new gallery image
export async function uploadGalleryImage(formData: FormData) {
    const file = formData.get('image');
    const section = formData.get('section') as string;
    const alt = formData.get('alt') as string;

    if (!file || !(file instanceof File) || file.size === 0) {
        return { success: false, message: 'No valid image file was selected for upload.' };
    }
    
    if (!section) {
        return { success: false, message: 'Missing section for image upload.' };
    }
    
    // Vercel serverless function has a 4.5MB body limit. Base64 is ~33% larger.
    // Let's set a limit around 3MB for the original file.
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return { success: false, message: `File is too large. Please upload an image under ${MAX_FILE_SIZE_MB}MB.` };
    }

    const singletonSections = [
        'hero', 
        'reviews',
        'accommodation_bg',
        'amenities_bg',
        'facilities_bg',
        'activities_bg',
        'booking_bg',
        'location_bg',
        'host_profile',
        'host_bg',
        'faq_bg',
        'cta_bg',
        'video_bg',
        'specials_bg'
    ];

    // For singleton sections, remove existing image record before uploading a new one.
    if (singletonSections.includes(section)) {
        try {
            await db.execute('DELETE FROM gallery_images WHERE section = $1', [section]);
        } catch (error) {
            console.error(`Failed to cleanup existing image for section ${section}:`, error);
            // Don't block the upload if cleanup fails, just log it.
        }
    }
    
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

        await db.execute(
            'INSERT INTO gallery_images (src, alt, section) VALUES ($1, $2, $3)',
            [dataUri, alt || file.name, section]
        );

        revalidatePath('/');
        revalidatePath('/admin/dashboard/content');
        return { success: true, message: 'Image uploaded successfully.' };

    } catch (error: any) {
        console.error('Failed to upload image:', error);
        // Check for a common Postgres error when data is too long for the column
        if (error.code === '22001') { // data_too_long
             return { success: false, message: 'Image is too large for database storage. The schema might be incorrect; please ensure the `src` column in `gallery_images` is of type TEXT.' };
        }
        return { success: false, message: `Failed to save image to the database. Details: ${error.message}` };
    }
}

// Action to delete a gallery image
export async function deleteGalleryImage(id: number) {
    if (!id) {
        return { success: false, message: 'Missing image ID.' };
    }

    try {
        await db.execute('DELETE FROM gallery_images WHERE id = $1', [id]);
        
        revalidatePath('/');
        revalidatePath('/admin/dashboard/content');
        return { success: true, message: 'Image deleted successfully.' };

    } catch (error: any) {
        console.error('Failed to delete image:', error);
        return { success: false, message: `Failed to delete image. Details: ${error.message}` };
    }
}

// Action to delete an inquiry
export async function deleteInquiry(id: number) {
    if (!id) return { success: false, message: 'Missing inquiry ID.' };
    try {
        await db.execute('DELETE FROM inquiries WHERE id = $1', [id]);
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Inquiry deleted successfully.' };
    } catch (error: any) {
        console.error('Failed to delete inquiry:', error);
        return { success: false, message: `Failed to delete inquiry. Details: ${error.message}` };
    }
}


// --- Amenities Actions ---
const amenitySchema = z.object({ text: z.string().min(1), icon: z.string().min(1), sort_order: z.coerce.number().default(0) });

export async function addAmenity(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = amenitySchema.parse(rawData);
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map((_, i) => `$${i + 1}`).join(', ');
        const values = Object.values(data);
        
        await db.execute(`INSERT INTO amenities (${columns}) VALUES (${placeholders})`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Amenity added successfully.' };
    } catch (error: any) {
        console.error(`Failed to add to amenities:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
};

export async function updateAmenity(id: number, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = amenitySchema.parse(rawData);
        const setClauses = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
        const values = [...Object.values(data), id];

        await db.execute(`UPDATE amenities SET ${setClauses} WHERE id = $${values.length}`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Amenity updated successfully.' };
    } catch (error: any) {
        console.error(`Failed to update amenity:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
};

export async function deleteAmenity(id: number) {
    try {
        await db.execute(`DELETE FROM amenities WHERE id = $1`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Amenity deleted successfully.' };
    } catch (error: any) {
        console.error(`Failed to delete from amenities:`, error);
        return { success: false, message: `Database error: ${error.message}` };
    }
};


// --- Activities Actions ---
const activitySchema = z.object({ title: z.string().min(1), description: z.string().min(1), icon: z.string().min(1), sort_order: z.coerce.number().default(0) });

async function handleActivityImageUpload(file: File | undefined, existingImage: string | null | undefined): Promise<string | null | { error: string }> {
    // If no new file is uploaded, keep the existing image.
    if (!file || file.size === 0) {
        return existingImage || null;
    }

    if (!(file instanceof File)) {
        return { error: 'Invalid file format.' };
    }
    
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return { error: `File is too large. Please upload an image under ${MAX_FILE_SIZE_MB}MB.` };
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;
    
    return dataUri;
}

export async function addActivity(formData: FormData) {
    const imageFile = formData.get('image') as File | undefined;
    const rawData = Object.fromEntries(formData.entries());
    delete rawData.image; // Exclude from Zod parsing

    try {
        const data = activitySchema.parse(rawData);
        const imageResult = await handleActivityImageUpload(imageFile, null);
        
        if (imageResult && typeof imageResult === 'object' && 'error' in imageResult) {
            return { success: false, message: imageResult.error };
        }
        const imageSrc = imageResult;
        
        const columns = [...Object.keys(data), 'image_src'].join(', ');
        const placeholders = [...Object.keys(data).map((_, i) => `$${i + 1}`), `$${Object.keys(data).length + 1}`].join(', ');
        const values = [...Object.values(data), imageSrc];
        
        await db.execute(`INSERT INTO activities (${columns}) VALUES (${placeholders})`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Activity added successfully.' };
    } catch (error: any) {
        console.error(`Failed to add to activities:`, error);
        if (error.code === '22001') {
             return { success: false, message: 'Image is too large for database storage. Please make sure the `image_src` column in `activities` is of type TEXT.' };
        }
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
};

export async function updateActivity(id: number, formData: FormData) {
    const imageFile = formData.get('image') as File | undefined;
    const rawData = Object.fromEntries(formData.entries());
    delete rawData.image; // Exclude from Zod parsing

    try {
        const data = activitySchema.parse(rawData);
        
        // Get the existing image path to decide whether to keep it or replace it.
        const { rows: existingRows } = await db.query('SELECT image_src FROM activities WHERE id = $1', [id]);
        const existingImage = (existingRows as { image_src: string | null }[])[0]?.image_src;
        
        const imageResult = await handleActivityImageUpload(imageFile, existingImage);
        
        if (imageResult && typeof imageResult === 'object' && 'error' in imageResult) {
            return { success: false, message: imageResult.error };
        }
        const imageSrc = imageResult;
        
        const setClauses = [...Object.keys(data).map((key, i) => `${key} = $${i + 1}`), `image_src = $${Object.keys(data).length + 1}`].join(', ');
        const values = [...Object.values(data), imageSrc, id];

        await db.execute(`UPDATE activities SET ${setClauses} WHERE id = $${values.length}`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Activity updated successfully.' };
    } catch (error: any) {
        console.error(`Failed to update activity:`, error);
        if (error.code === '22001') {
             return { success: false, message: 'Image is too large for database storage. Please make sure the `image_src` column in `activities` is of type TEXT.' };
        }
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
};

export async function deleteActivity(id: number) {
    try {
        // Just delete the database record. The image data is stored in it.
        await db.execute(`DELETE FROM activities WHERE id = $1`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Activity deleted successfully.' };
    } catch (error: any) {
        console.error(`Failed to delete from activities:`, error);
        return { success: false, message: `Database error: ${error.message}` };
    }
};


// --- Reviews Actions ---
const reviewSchema = z.object({
    quote: z.string().min(1),
    author: z.string().min(1),
    source: z.string().optional(),
    rating: z.coerce.number().min(1).max(5),
    sort_order: z.coerce.number().default(0)
});

export async function addReview(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = reviewSchema.parse(rawData);
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map((_, i) => `$${i + 1}`).join(', ');
        const values = Object.values(data);
        
        await db.execute(`INSERT INTO reviews (${columns}) VALUES (${placeholders})`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Review added successfully.' };
    } catch (error: any) {
        console.error(`Failed to add to reviews:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
};

export async function updateReview(id: number, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = reviewSchema.parse(rawData);
        const setClauses = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
        const values = [...Object.values(data), id];

        await db.execute(`UPDATE reviews SET ${setClauses} WHERE id = $${values.length}`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Review updated successfully.' };
    } catch (error: any) {
        console.error(`Failed to update review:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
};

export async function deleteReview(id: number) {
    try {
        await db.execute(`DELETE FROM reviews WHERE id = $1`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Review deleted successfully.' };
    } catch (error: any) {
        console.error(`Failed to delete from reviews:`, error);
        return { success: false, message: `Database error: ${error.message}` };
    }
};

// --- Facilities Actions ---
const facilitySchema = z.object({ 
    category: z.string().min(1),
    items: z.string().min(1),
    icon: z.string().min(1),
    sort_order: z.coerce.number().default(0)
});

export async function addFacility(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = facilitySchema.parse(rawData);
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map((_, i) => `$${i + 1}`).join(', ');
        const values = Object.values(data);
        await db.execute(`INSERT INTO facilities (${columns}) VALUES (${placeholders})`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/facilities');
        return { success: true, message: 'Facility category added successfully.' };
    } catch (error: any) {
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
}

export async function updateFacility(id: number, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = facilitySchema.parse(rawData);
        const setClauses = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
        const values = [...Object.values(data), id];
        await db.execute(`UPDATE facilities SET ${setClauses} WHERE id = $${values.length}`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/facilities');
        return { success: true, message: 'Facility category updated successfully.' };
    } catch (error: any) {
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
}

export async function deleteFacility(id: number) {
    try {
        await db.execute(`DELETE FROM facilities WHERE id = $1`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/facilities');
        return { success: true, message: 'Facility category deleted successfully.' };
    } catch (error: any) {
        return { success: false, message: `Database error: ${error.message}` };
    }
}


// --- FAQ Actions ---
const faqSchema = z.object({ 
    question: z.string().min(1),
    answer: z.string().min(1),
    sort_order: z.coerce.number().default(0)
});

export async function addFaq(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = faqSchema.parse(rawData);
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map((_, i) => `$${i + 1}`).join(', ');
        const values = Object.values(data);
        await db.execute(`INSERT INTO faq (${columns}) VALUES (${placeholders})`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/faq');
        return { success: true, message: 'FAQ added successfully.' };
    } catch (error: any) {
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
}

export async function updateFaq(id: number, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = faqSchema.parse(rawData);
        const setClauses = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
        const values = [...Object.values(data), id];
        await db.execute(`UPDATE faq SET ${setClauses} WHERE id = $${values.length}`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/faq');
        return { success: true, message: 'FAQ updated successfully.' };
    } catch (error: any) {
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
}

export async function deleteFaq(id: number) {
    try {
        await db.execute(`DELETE FROM faq WHERE id = $1`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/faq');
        return { success: true, message: 'FAQ deleted successfully.' };
    } catch (error: any) {
        return { success: false, message: `Database error: ${error.message}` };
    }
}


// --- Specials Actions ---
const specialSchema = z.object({
    headline: z.string().min(1, 'Headline is required'),
    description: z.string().min(1, 'Description is required'),
    duration: z.string().optional(),
    normal_price: z.coerce.number().positive('Normal price must be a positive number').optional().nullable(),
    special_price: z.coerce.number().positive('Special price must be a positive number').optional().nullable(),
    is_active: z.preprocess((val) => val === 'on' || val === true, z.boolean()),
    sort_order: z.coerce.number().default(0)
});

export async function addSpecial(formData: FormData) {
    const imageFile = formData.get('image') as File | undefined;
    const rawData = Object.fromEntries(formData.entries());
    delete rawData.image; 

    try {
        const data = specialSchema.parse(rawData);
        const imageResult = await handleActivityImageUpload(imageFile, null);
        
        if (imageResult && typeof imageResult === 'object' && 'error' in imageResult) {
            return { success: false, message: imageResult.error };
        }
        const imageSrc = imageResult;

        const columns = [...Object.keys(data), 'image_src'].join(', ');
        const placeholders = [...Object.keys(data).map((_, i) => `$${i + 1}`), `$${Object.keys(data).length + 1}`].join(', ');
        const values = [...Object.values(data), imageSrc];
        
        await db.execute(`INSERT INTO specials (${columns}) VALUES (${placeholders})`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard/specials');
        return { success: true, message: 'Special added successfully.' };
    } catch (error: any) {
        console.error(`Failed to add special:`, error);
        if (error.code === '22001') {
             return { success: false, message: 'Image is too large for database storage. Please make sure the `image_src` column in `specials` is of type TEXT.' };
        }
        return { success: false, message: error instanceof z.ZodError ? error.flatten().fieldErrors.headline?.[0] || error.message : `Database error: ${error.message}` };
    }
}

export async function updateSpecial(id: number, formData: FormData) {
    const imageFile = formData.get('image') as File | undefined;
    const rawData = Object.fromEntries(formData.entries());
    delete rawData.image; // Exclude from Zod parsing

    try {
        const data = specialSchema.parse(rawData);
        
        const { rows: existingRows } = await db.query('SELECT image_src FROM specials WHERE id = $1', [id]);
        const existingImage = (existingRows as { image_src: string | null }[])[0]?.image_src;
        
        const imageResult = await handleActivityImageUpload(imageFile, existingImage);
        
        if (imageResult && typeof imageResult === 'object' && 'error' in imageResult) {
            return { success: false, message: imageResult.error };
        }
        const imageSrc = imageResult;
        
        const setClauses = [...Object.keys(data).map((key, i) => `${key} = $${i + 1}`), `image_src = $${Object.keys(data).length + 1}`].join(', ');
        const values = [...Object.values(data), imageSrc, id];

        await db.execute(`UPDATE specials SET ${setClauses} WHERE id = $${values.length}`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard/specials');
        return { success: true, message: 'Special updated successfully.' };
    } catch (error: any) {
        console.error(`Failed to update special:`, error);
        if (error.code === '22001') {
             return { success: false, message: 'Image is too large for database storage. Please make sure the `image_src` column in `specials` is of type TEXT.' };
        }
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
}

export async function deleteSpecial(id: number) {
    try {
        await db.execute(`DELETE FROM specials WHERE id = $1`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/specials');
        return { success: true, message: 'Special deleted successfully.' };
    } catch (error: any) {
        console.error(`Failed to delete from specials:`, error);
        return { success: false, message: `Database error: ${error.message}` };
    }
}



// --- Page Layout Actions ---
export async function updatePageLayout(sections: PageSection[]) {
    try {
        const queries = sections.map(section => 
            db.execute(
                'UPDATE page_sections SET sort_order = $1, is_visible = $2 WHERE id = $3',
                [section.sort_order, section.is_visible, section.id]
            )
        );
        await Promise.all(queries);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/layout');
        return { success: true };
    } catch (error: any) {
        console.error('Failed to update page layout:', error);
        return { success: false, message: `Database error while updating layout. Details: ${error.message}` };
    }
}

// --- New Actions for Client-Side Fetching ---

export async function getClientGalleryImages(section: string): Promise<{ success: boolean; data?: GalleryImage[]; message?: string; }> {
    try {
        const images = await fetchGalleryImages(section);
        return { success: true, data: images };
    } catch (error: any) {
        console.error(`Failed to fetch gallery images for section ${section} via action:`, error);
        return { success: false, message: `Failed to fetch images. Details: ${error.message}` };
    }
}

export async function getClientActivities(): Promise<{ success: boolean; data?: Activity[]; message?: string; }> {
    try {
        const activities = await fetchActivities();
        return { success: true, data: activities };
    } catch (error: any) {
        console.error(`Failed to fetch activities via action:`, error);
        return { success: false, message: `Failed to fetch activities. Details: ${error.message}` };
    }
}


export async function getClientSpecials(): Promise<{ success: boolean; data?: Special[]; message?: string; }> {
    try {
        const specials = await fetchSpecials();
        return { success: true, data: specials };
    } catch (error: any) {
        console.error(`Failed to fetch specials via action:`, error);
        return { success: false, message: `Failed to fetch specials. Details: ${error.message}` };
    }
}
