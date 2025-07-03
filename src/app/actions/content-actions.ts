'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

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
        updates.push(updateSingleContent(section, content_key, value.toString()));
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

    if (!file || !section) {
        return { success: false, message: 'Missing file or section.' };
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save the file to the public directory
    const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
    const filepath = join(process.cwd(), 'public', filename);
    
    try {
        await writeFile(filepath, buffer);
        const src = `/${filename}`;

        // Save file path to database
        await db.execute(
            'INSERT INTO gallery_images (src, alt, section) VALUES (?, ?, ?)',
            [src, file.name, section]
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
export async function deleteGalleryImage(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) {
        return { success: false, message: 'Missing image ID.' };
    }

    try {
        // First, get the image source from the database
        const [rows] = await db.query('SELECT src FROM gallery_images WHERE id = ?', [id]);
        const images = rows as { src: string }[];

        if (images.length > 0) {
            const src = images[0].src;
            const filepath = join(process.cwd(), 'public', src);
            
            // Delete the file from the filesystem
            await unlink(filepath).catch(err => console.error(`Failed to delete file ${filepath}:`, err)); // Log error but don't block DB deletion
        }

        // Then, delete the record from the database
        await db.execute('DELETE FROM gallery_images WHERE id = ?', [id]);
        
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Image deleted successfully.' };

    } catch (error) {
        console.error('Failed to delete image:', error);
        return { success: false, message: 'Failed to delete image.' };
    }
}
