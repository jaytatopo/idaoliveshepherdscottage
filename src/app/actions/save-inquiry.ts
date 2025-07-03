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
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.coerce.number().min(1, { message: 'Must have at least 1 guest.' }).max(4, { message: 'Cannot exceed 4 guests.' }),
  message: z.string().min(10, { message: 'Please provide a message of at least 10 characters.' }),
});

type Inquiry = z.infer<typeof formSchema>;

export async function saveInquiry(inquiry: Inquiry) {
  try {
    const validatedInquiry = formSchema.parse(inquiry);

    // Save to database
    const sql = `
      INSERT INTO inquiries (name, email, phone, check_in, check_out, guests, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      validatedInquiry.name,
      validatedInquiry.email,
      validatedInquiry.phone || null,
      validatedInquiry.checkIn || null,
      validatedInquiry.checkOut || null,
      validatedInquiry.guests,
      validatedInquiry.message,
    ];

    await db.execute(sql, values);

    // Send email notification
    if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
            from: 'onboarding@resend.dev', // Replace with your verified domain, e.g., 'noreply@yourdomain.com'
            to: 'reservations@idaolivecottagemcgregor.co.za',
            subject: 'New Inquiry for Ida Olive Cottage',
            react: InquiryNotificationEmail(validatedInquiry),
        });
    } else {
        console.warn('RESEND_API_KEY is not set. Skipping email notification.');
    }

    return { success: true, message: "Enquiry sent successfully!" };
  } catch (error) {
    console.error('Action Error:', error);
    if (error instanceof z.ZodError) {
         return { success: false, message: 'Invalid form data.' };
    }
    return { success: false, message: 'Failed to send enquiry. Please try again later.' };
  }
}
