import type { Metadata } from 'next';
import { Lato, Lora } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import CookieBanner from '@/components/cookie-banner';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title: 'Ida Olive Shepherd’s Cottage, McGregor',
  description: 'A serene, off-the-grid escape for nature lovers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${lato.variable} ${lora.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <CookieBanner />
      </body>
    </html>
  );
}
