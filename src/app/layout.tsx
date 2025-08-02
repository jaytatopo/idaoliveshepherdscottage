
import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import CookieBanner from '@/components/cookie-banner';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getContent } from '@/lib/content';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lora',
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const heroContent = content.hero;
  const ogImageUrl = 'https://placehold.co/1200x630.png';

  const title = heroContent?.heading || 'Ida Olive Shepherd’s Cottage, McGregor';
  const description = heroContent?.subheading || 'A serene, off-the-grid escape for nature lovers.';

  // TODO: Replace with your actual production domain
  const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';


  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: siteUrl, 
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'A view of Ida Olive Shepherd’s Cottage',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
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
