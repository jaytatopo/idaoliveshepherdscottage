'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { z } from 'zod';

// Helper function to update a single content entry
async function updateSingleContent(section: string, key: string, value: string) {
    const sql = `
        INSERT INTO page_content (section, content_key, content_value)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE content_value = ?
    `;
    await db.execute(sql, [section, key, value, value]);
}

// Action to update text content from a form
export async function updateContent(formData: FormData) {
    const updates = [];
    for (const [key, value] of formData.entries()) {
        const [section, content_key] = key.split('_');
        if (section && content_key && value !== null) {
            updates.push(updateSingleContent(section, content_key, value.toString()));
        }
    }
    
    try {
        await Promise.all(updates);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Content updated successfully.' };
    } catch (error) {
        console.error('Failed to update content:', error);
        return { success: false, message: 'Failed to update content.' };
    }
}

// Action to upload a new gallery image
export async function uploadGalleryImage(formData: FormData) {
    const file = formData.get('image') as File;
    const section = formData.get('section') as string;
    const alt = formData.get('alt') as string;

    if (!file || !section) {
        return { success: false, message: 'Missing file or section.' };
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
    const filepath = join(process.cwd(), 'public', filename);
    
    try {
        await writeFile(filepath, buffer);
        const src = `/${filename}`;

        await db.execute(
            'INSERT INTO gallery_images (src, alt, section) VALUES (?, ?, ?)',
            [src, alt || file.name, section]
        );

        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Image uploaded successfully.' };

    } catch (error) {
        console.error('Failed to upload image:', error);
        return { success: false, message: 'Failed to upload image.' };
    }
}

// Action to delete a gallery image
export async function deleteGalleryImage(id: number) {
    if (!id) {
        return { success: false, message: 'Missing image ID.' };
    }

    try {
        const [rows] = await db.query('SELECT src FROM gallery_images WHERE id = ?', [id]);
        const images = rows as { src: string }[];

        if (images.length > 0) {
            const src = images[0].src;
            const filepath = join(process.cwd(), 'public', src);
            await unlink(filepath).catch(err => console.error(`Failed to delete file ${filepath}:`, err));
        }

        await db.execute('DELETE FROM gallery_images WHERE id = ?', [id]);
        
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Image deleted successfully.' };

    } catch (error) {
        console.error('Failed to delete image:', error);
        return { success: false, message: 'Failed to delete image.' };
    }
}

// Action to delete an inquiry
export async function deleteInquiry(id: number) {
    if (!id) return { success: false, message: 'Missing inquiry ID.' };
    try {
        await db.execute('DELETE FROM inquiries WHERE id = ?', [id]);
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Inquiry deleted successfully.' };
    } catch (error) {
        console.error('Failed to delete inquiry:', error);
        return { success: false, message: 'Failed to delete inquiry.' };
    }
}


// --- Amenities Actions ---
const amenitySchema = z.object({ text: z.string().min(1), icon: z.string().min(1), sort_order: z.coerce.number().default(0) });

export async function addAmenity(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = amenitySchema.parse(rawData);
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        
        await db.execute(`INSERT INTO amenities (${columns}) VALUES (${placeholders})`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Failed to add to amenities:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : 'Database error.' };
    }
};

export async function updateAmenity(id: number, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = amenitySchema.parse(rawData);
        const setClauses = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(data), id];

        await db.execute(`UPDATE amenities SET ${setClauses} WHERE id = ?`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Failed to update amenity:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : 'Database error.' };
    }
};

export async function deleteAmenity(id: number) {
    try {
        await db.execute(`DELETE FROM amenities WHERE id = ?`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Failed to delete from amenities:`, error);
        return { success: false, message: 'Database error.' };
    }
};


// --- Activities Actions ---
const activitySchema = z.object({ title: z.string().min(1), description: z.string().min(1), icon: z.string().min(1), sort_order: z.coerce.number().default(0) });

export async function addActivity(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = activitySchema.parse(rawData);
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        
        await db.execute(`INSERT INTO activities (${columns}) VALUES (${placeholders})`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Failed to add to activities:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : 'Database error.' };
    }
};

export async function updateActivity(id: number, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = activitySchema.parse(rawData);
        const setClauses = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(data), id];

        await db.execute(`UPDATE activities SET ${setClauses} WHERE id = ?`, values);

        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Failed to update activity:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : 'Database error.' };
    }
};

export async function deleteActivity(id: number) {
    try {
        await db.execute(`DELETE FROM activities WHERE id = ?`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Failed to delete from activities:`, error);
        return { success: false, message: 'Database error.' };
    }
};


// --- Reviews Actions ---
const reviewSchema = z.object({ quote: z.string().min(1), author: z.string().min(1), rating: z.coerce.number().min(1).max(5), sort_order: z.coerce.number().default(0) });

export async function addReview(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = reviewSchema.parse(rawData);
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        
        await db.execute(`INSERT INTO reviews (${columns}) VALUES (${placeholders})`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Failed to add to reviews:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : 'Database error.' };
    }
};

export async function updateReview(id: number, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
        const data = reviewSchema.parse(rawData);
        const setClauses = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(data), id];

        await db.execute(`UPDATE reviews SET ${setClauses} WHERE id = ?`, values);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Failed to update review:`, error);
        return { success: false, message: error instanceof z.ZodError ? error.message : 'Database error.' };
    }
};

export async function deleteReview(id: number) {
    try {
        await db.execute(`DELETE FROM reviews WHERE id = ?`, [id]);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(`Failed to delete from reviews:`, error);
        return { success: false, message: 'Database error.' };
    }
};
