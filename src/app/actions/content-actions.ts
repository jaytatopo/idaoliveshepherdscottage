
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { PageSection, GalleryImage, Activity, Special, Rate } from '@/lib/content';
import { 
    getGalleryImages as fetchGalleryImages,
    getActivities as fetchActivities,
    getSpecials as fetchSpecials,
    getRates as fetchRates
} from '@/lib/content';
import { put, del } from '@vercel/blob';

const MAX_FILE_SIZE_MB = 4; // Vercel Blob hobby plan limit is 4.5MB

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
            const { rows } = await db.query('SELECT id, src_url FROM gallery_images WHERE section = $1', [section]);
            if ((rows as { id: number, src_url: string }[]).length > 0) {
                const oldImage = (rows as { id: number, src_url: string }[])[0];
                if (oldImage.src_url) {
                    await del(oldImage.src_url);
                }
                await db.execute('DELETE FROM gallery_images WHERE id = $1', [oldImage.id]);
            }
        } catch (error) {
            console.error(`Failed to cleanup existing image for section ${section}:`, error);
        }
    }
    
    try {
        const blob = await put(file.name, file, { access: 'public' });

        await db.execute(
            'INSERT INTO gallery_images (src_url, alt, section) VALUES ($1, $2, $3)',
            [blob.url, alt || file.name, section]
        );

        revalidatePath('/');
        revalidatePath('/admin/dashboard/content');
        return { success: true, message: 'Image uploaded successfully.' };

    } catch (error: any) {
        console.error('Failed to upload image:', error);
        return { success: false, message: `Failed to save image to blob storage. Details: ${error.message}` };
    }
}

// Action to delete a gallery image
export async function deleteGalleryImage(id: number) {
    if (!id) {
        return { success: false, message: 'Missing image ID.' };
    }

    try {
        // First get the image URL to delete it from blob storage
        const { rows } = await db.query('SELECT src_url FROM gallery_images WHERE id = $1', [id]);
        const imageUrl = (rows as { src_url: string }[])[0]?.src_url;
        
        if (imageUrl) {
            await del(imageUrl);
        }

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

async function handleActivityImageUpload(file: File | undefined, existingImageUrl: string | null | undefined): Promise<string | null | { error: string }> {
    if (!file || file.size === 0) {
        return existingImageUrl || null;
    }

    if (!(file instanceof File)) {
        return { error: 'Invalid file format.' };
    }
    
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return { error: `File is too large. Please upload an image under ${MAX_FILE_SIZE_MB}MB.` };
    }
    
    try {
        if (existingImageUrl) {
            await del(existingImageUrl);
        }
        const blob = await put(file.name, file, { access: 'public' });
        return blob.url;
    } catch (error: any) {
        return { error: `Failed to upload image: ${error.message}` };
    }
}

export async function addActivity(formData: FormData) {
    const imageFile = formData.get('image') as File | undefined;
    const rawData = Object.fromEntries(formData.entries());
    delete rawData.image; 

    try {
        const data = activitySchema.parse(rawData);
        const imageResult = await handleActivityImageUpload(imageFile, null);
        
        if (imageResult && typeof imageResult === 'object' && 'error' in imageResult) {
            return { success: false, message: imageResult.error };
        }
        const src_url = imageResult;
        
        const columns = [...Object.keys(data), 'src_url'].join(', ');
        const placeholders = [...Object.keys(data).map((_, i) => `$${i + 1}`), `$${Object.keys(data).length + 1}`].join(', ');
        const values = [...Object.values(data), src_url];
        
        await db.execute(`INSERT INTO activities (${columns}) VALUES (${placeholders})`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Activity added successfully.' };
    } catch (error: any) {
        console.error(`Failed to add to activities:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
};

export async function updateActivity(id: number, formData: FormData) {
    const imageFile = formData.get('image') as File | undefined;
    const rawData = Object.fromEntries(formData.entries());
    delete rawData.image;

    try {
        const data = activitySchema.parse(rawData);
        
        const { rows: existingRows } = await db.query('SELECT src_url FROM activities WHERE id = $1', [id]);
        const existingImage = (existingRows as { src_url: string | null }[])[0]?.src_url;
        
        const imageResult = await handleActivityImageUpload(imageFile, existingImage);
        
        if (imageResult && typeof imageResult === 'object' && 'error' in imageResult) {
            return { success: false, message: imageResult.error };
        }
        const src_url = imageResult;
        
        const setClauses = [...Object.keys(data).map((key, i) => `${key} = $${i + 1}`), `src_url = $${Object.keys(data).length + 1}`].join(', ');
        const values = [...Object.values(data), src_url, id];

        await db.execute(`UPDATE activities SET ${setClauses} WHERE id = $${values.length}`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Activity updated successfully.' };
    } catch (error: any) {
        console.error(`Failed to update activity:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
};

export async function deleteActivity(id: number) {
    try {
        const { rows } = await db.query('SELECT src_url FROM activities WHERE id = $1', [id]);
        const imageUrl = (rows as { src_url: string | null }[])[0]?.src_url;

        if (imageUrl) {
            await del(imageUrl);
        }

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
        const src_url = imageResult;

        const columns = [...Object.keys(data), 'src_url'].join(', ');
        const placeholders = [...Object.keys(data).map((_, i) => `$${i + 1}`), `$${Object.keys(data).length + 1}`].join(', ');
        const values = [...Object.values(data), src_url];
        
        await db.execute(`INSERT INTO specials (${columns}) VALUES (${placeholders})`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard/specials');
        return { success: true, message: 'Special added successfully.' };
    } catch (error: any) {
        console.error(`Failed to add special:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.flatten().fieldErrors.headline?.[0] || error.message : `Database error: ${error.message}` };
    }
}

export async function updateSpecial(id: number, formData: FormData) {
    const imageFile = formData.get('image') as File | undefined;
    const rawData = Object.fromEntries(formData.entries());
    delete rawData.image;

    try {
        const data = specialSchema.parse(rawData);
        
        const { rows: existingRows } = await db.query('SELECT src_url FROM specials WHERE id = $1', [id]);
        const existingImage = (existingRows as { src_url: string | null }[])[0]?.src_url;
        
        const imageResult = await handleActivityImageUpload(imageFile, existingImage);
        
        if (imageResult && typeof imageResult === 'object' && 'error' in imageResult) {
            return { success: false, message: imageResult.error };
        }
        const src_url = imageResult;
        
        const setClauses = [...Object.keys(data).map((key, i) => `${key} = $${i + 1}`), `src_url = $${Object.keys(data).length + 1}`].join(', ');
        const values = [...Object.values(data), src_url, id];

        await db.execute(`UPDATE specials SET ${setClauses} WHERE id = $${values.length}`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard/specials');
        return { success: true, message: 'Special updated successfully.' };
    } catch (error: any) {
        console.error(`Failed to update special:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
}

export async function deleteSpecial(id: number) {
    try {
        const { rows } = await db.query('SELECT src_url FROM specials WHERE id = $1', [id]);
        const imageUrl = (rows as { src_url: string | null }[])[0]?.src_url;
        
        if (imageUrl) {
            await del(imageUrl);
        }

        await db.execute(`DELETE FROM specials WHERE id = $1`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/specials');
        return { success: true, message: 'Special deleted successfully.' };
    } catch (error: any) {
        console.error(`Failed to delete from specials:`, error);
        return { success: false, message: `Database error: ${error.message}` };
    }
}


// --- Rates Actions ---
const rateSchema = z.object({
    validity_period_label: z.string().min(1, 'Label is required'),
    persons: z.coerce.number().min(1, 'Persons must be at least 1'),
    price: z.coerce.number().positive('Price must be a positive number'),
    sort_order: z.coerce.number().default(0)
});

export async function addRate(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = rateSchema.parse(rawData);
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map((_, i) => `$${i + 1}`).join(', ');
        const values = Object.values(data);
        await db.execute(`INSERT INTO rates (${columns}) VALUES (${placeholders})`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/rates');
        return { success: true, message: 'Rate added successfully.' };
    } catch (error: any) {
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
}

export async function updateRate(id: number, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = rateSchema.parse(rawData);
        const setClauses = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
        const values = [...Object.values(data), id];
        await db.execute(`UPDATE rates SET ${setClauses} WHERE id = $${values.length}`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/rates');
        return { success: true, message: 'Rate updated successfully.' };
    } catch (error: any) {
        return { success: false, message: error instanceof z.ZodError ? error.message : `Database error: ${error.message}` };
    }
}

export async function deleteRate(id: number) {
    try {
        await db.execute(`DELETE FROM rates WHERE id = $1`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/rates');
        return { success: true, message: 'Rate deleted successfully.' };
    } catch (error: any) {
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

export async function getClientRates(): Promise<{ success: boolean; data?: Rate[]; message?: string; }> {
    try {
        const rates = await fetchRates();
        return { success: true, data: rates };
    } catch (error: any) {
        console.error(`Failed to fetch rates via action:`, error);
        return { success: false, message: `Failed to fetch rates. Details: ${error.message}` };
    }
}

// Action to update the sort order of gallery images
export async function updateGalleryImageOrder(imageId: number, newSortOrder: number) {
    try {
        await db.execute('UPDATE gallery_images SET sort_order = $1 WHERE id = $2', [newSortOrder, imageId]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard/images');
        return { success: true, message: 'Image order updated successfully.' };
    } catch (error: any) {
        console.error('Failed to update image order:', error);
        return { success: false, message: `Failed to update image order. Details: ${error.message}` };
    }
}
