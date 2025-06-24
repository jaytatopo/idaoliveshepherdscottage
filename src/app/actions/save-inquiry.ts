'use server';

import { z } from 'zod';
import { db } from '@/lib/db';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  checkIn: z.string().min(1, { message: 'Please select a check-in date.' }),
  checkOut: z.string().min(1, { message: 'Please select a check-out date.' }),
  guests: z.coerce.number().min(1, { message: 'Must have at least 1 guest.' }).max(4, { message: 'Cannot exceed 4 guests.' }),
});

type Inquiry = z.infer<typeof formSchema>;

export async function saveInquiry(inquiry: Inquiry) {
  try {
    const validatedInquiry = formSchema.parse(inquiry);

    // NOTE: You must create an 'inquiries' table in your MySQL database
    // with columns like: id (INT, PK, AI), name (VARCHAR), email (VARCHAR),
    // phone (VARCHAR), check_in (DATE), check_out (DATE), guests (INT),
    // created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP).
    const sql = `
      INSERT INTO inquiries (name, email, phone, check_in, check_out, guests)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      validatedInquiry.name,
      validatedInquiry.email,
      validatedInquiry.phone,
      validatedInquiry.checkIn,
      validatedInquiry.checkOut,
      validatedInquiry.guests,
    ];

    await db.execute(sql, values);

    return { success: true, message: "Enquiry saved successfully!" };
  } catch (error) {
    console.error('Database Error:', error);
    if (error instanceof z.ZodError) {
         return { success: false, message: 'Invalid form data.' };
    }
    return { success: false, message: 'Failed to save enquiry. Please try again later.' };
  }
}
