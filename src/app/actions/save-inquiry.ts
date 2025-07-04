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
        // IMPORTANT: For email sending to work, you must:
        // 1. Have a RESEND_API_KEY in your .env file.
        // 2. Verify a domain with Resend to use a custom `from` address.
        // 3. Update the 'to' address below to your personal email.
        //
        // For initial testing without a custom domain, you can use the default
        // "onboarding@resend.dev" from address and send TO your own email.
        await resend.emails.send({
            from: 'Ida Olive Cottage <onboarding@resend.dev>',
            to: 'your-personal-email@example.com', // <-- CHANGE THIS to your email for testing
            subject: 'New Web Inquiry for Ida Olive Cottage',
            react: InquiryNotificationEmail(validatedInquiry),
        });
    } else {
        console.warn('RESEND_API_KEY is not set. Skipping email notification.');
    }

    return { success: true, message: "Enquiry sent successfully!" };
  } catch (error: any) {
    console.error('Action Error:', error);
    if (error instanceof z.ZodError) {
         return { success: false, message: 'Invalid form data.' };
    }
    
    // Provide a more specific error message if it's from Resend
    if (error.name === 'validation_error' || error.message?.includes('resend')) {
        return { success: false, message: `Email sending failed. Please check your Resend configuration and verified domains. Error: ${error.message}` };
    }

    return { success: false, message: 'An unexpected error occurred. Please check the server logs for more details.' };
  }
}
