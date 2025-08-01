
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const schema = z.object({
  password: z.string().min(1, 'Password is required.'),
});

const AUTH_COOKIE_NAME = 'admin_auth';

export async function login(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.password?.[0],
    };
  }

  const { password } = validatedFields.data;

  if (password === process.env.ADMIN_PASSWORD) {
    // Set a secure cookie
    cookies().set(AUTH_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });
    
    // Redirect to dashboard after successful login
    redirect('/admin/dashboard');

  } else {
    return {
        success: false,
        message: 'Invalid password.',
    };
  }
}

export async function logout() {
    cookies().delete(AUTH_COOKIE_NAME);
    redirect('/admin');
}

