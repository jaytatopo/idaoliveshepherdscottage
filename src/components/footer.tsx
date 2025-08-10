import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getContent } from '@/lib/content';

export default async function Footer() {
  const content = await getContent();
  const facebookUrl = content.location?.facebook_url;
  const instagramUrl = content.location?.instagram_url;

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-semibold">Ida Olive Shepherd’s Cottage</p>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Ida Olive Cottage. All Rights Reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            {facebookUrl && (
              <Link href={facebookUrl} passHref target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {instagramUrl && (
              <Link href={instagramUrl} passHref target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            {/* <Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
