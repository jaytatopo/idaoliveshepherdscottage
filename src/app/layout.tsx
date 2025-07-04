import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import CookieBanner from '@/components/cookie-banner';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster />
        <CookieBanner />
      </body>
    </html>
  );
}
