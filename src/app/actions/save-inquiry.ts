'use server';

import { createInquiry } from '@/lib/db';
import { z } from 'zod';

const inquirySchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  property_count: z.string().optional(),
  property_value: z.string().optional(),
  message: z.string().optional(),
});

export async function saveInquiry(formData: FormData) {
  try {
    const rawData = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      property_count: formData.get('property_count') as string,
      property_value: formData.get('property_value') as string,
      message: formData.get('message') as string,
    };

    const validatedData = inquirySchema.parse(rawData);

    const inquiry = await createInquiry({
      first_name: validatedData.first_name,
      last_name: validatedData.last_name,
      email: validatedData.email,
      phone: validatedData.phone || undefined,
      property_count: validatedData.property_count ? parseInt(validatedData.property_count) : undefined,
      property_value: validatedData.property_value as any,
      message: validatedData.message || undefined,
      source: 'website',
    });

    return { success: true, data: inquiry };
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return { 
      success: false, 
      error: error instanceof z.ZodError 
        ? 'Please fill in all required fields correctly.' 
        : 'Failed to save inquiry. Please try again.' 
    };
  }
}
