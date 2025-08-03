
import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import CookieBanner from '@/components/cookie-banner';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getContent, getGalleryImages } from '@/lib/content';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lora',
  display: 'swap',
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


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const heroImage = await getGalleryImages('hero');
  const heroImageUrl = heroImage[0]?.src_url;

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
       <head>
        {heroImageUrl && (
          <link
            rel="preload"
            href={heroImageUrl}
            as="image"
            fetchPriority="high"
          />
        )}
      </head>
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster />
        <CookieBanner />
        
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JYYF199R2F"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JYYF199R2F');
          `}
        </Script>
      </body>
    </html>
  );
}
