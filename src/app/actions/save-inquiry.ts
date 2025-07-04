'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { Resend } from 'resend';
import InquiryNotificationEmail from '@/components/emails/inquiry-notification';

const resend = new Resend(process.env.RESEND_API_KEY);

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  guests: z.coerce.number().min(1, { message: 'Must have at least 1 guest.' }).max(4, { message: 'Cannot exceed 4 guests.' }),
  message: z.string().min(10, { message: 'Please provide a message of at least 10 characters.' }),
  // Note: checkIn and checkOut are not included here as the enquiry form does not submit them.
  // They are part of the main `Inquiry` type for other potential uses.
});

type InquiryFormData = z.infer<typeof formSchema> & {
    checkIn?: string;
    checkOut?: string;
};


export async function saveInquiry(inquiry: InquiryFormData) {
  try {
    const validatedInquiry = formSchema.parse(inquiry);

    // Save to database
    try {
        const sql = `
          INSERT INTO inquiries (name, email, phone, guests, message)
          VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
          validatedInquiry.name,
          validatedInquiry.email,
          validatedInquiry.phone || null,
          validatedInquiry.guests,
          validatedInquiry.message,
        ];
        await db.execute(sql, values);
    } catch (dbError: any) {
        console.error('Database Error:', dbError);
        return { success: false, message: `Database error: Could not save your inquiry. Please ensure the 'inquiries' table is set up correctly. Details: ${dbError.message}` };
    }

    // Send email notification
    if (process.env.RESEND_API_KEY) {
        try {
            await resend.emails.send({
                from: 'Ida Olive Cottage <onboarding@resend.dev>',
                to: 'reservations@idaolivecottagemcgregor.co.za', // <-- For production, change to a verified domain.
                subject: 'New Web Inquiry for Ida Olive Cottage',
                react: InquiryNotificationEmail(validatedInquiry),
            });
        } catch (emailError: any) {
             console.error('Email Error:', emailError);
             // The inquiry was saved, but email failed. Return a specific error.
             return { success: false, message: `Your inquiry was saved, but the notification email failed to send. Error: ${emailError.message}` };
        }
    } else {
        console.warn('RESEND_API_KEY is not set. Skipping email notification.');
    }

    return { success: true, message: "Enquiry sent successfully!" };

  } catch (error: any) {
    console.error('Action Error:', error);
    if (error instanceof z.ZodError) {
         return { success: false, message: error.errors.map(e => e.message).join(', ') };
    }

    return { success: false, message: 'An unexpected error occurred. Please check the server logs for more details.' };
  }
}
