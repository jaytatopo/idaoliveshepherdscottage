
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#accommodation', label: 'The Cottage' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#activities', label: 'Things To Do' },
  { href: '#booking', label: 'Rates & Booking' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#location', label: 'Location' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed top-0 z-50 w-full transition-all duration-300 ${
    isScrolled ? 'bg-background/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
  }`;

  const linkClasses = `transition-colors duration-300 ${
    isScrolled ? 'text-primary' : 'text-primary-foreground [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]'
  }`;

  const DesktopNav = () => (
    <>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} passHref>
          <Button
            variant="link"
            className={`text-base font-semibold transition-colors duration-300 ${
              isScrolled
                ? 'text-foreground hover:text-primary'
                : 'text-primary-foreground hover:text-primary-foreground/80 [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]'
            }`}
          >
            {link.label}
          </Button>
        </Link>
      ))}
      <Link href="#booking" passHref>
        <Button
          className={`bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold transform transition-transform duration-200 hover:scale-105 active:scale-95`}
        >
          Book Now
        </Button>
      </Link>
    </>
  );

  const MobileNav = () => (
    <>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} passHref>
          <Button
            variant="link"
            className="text-xl h-auto font-semibold text-foreground hover:text-primary justify-start"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </Button>
        </Link>
      ))}
      <Link href="#booking" passHref>
        <Button
          className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl h-auto font-semibold transform transition-transform hover:scale-105 active:scale-95"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Book Now
        </Button>
      </Link>
    </>
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#home" className={linkClasses}>
          <div className="flex items-center gap-2">
            <Image 
              src="https://tfxogfrdzfk9ugja.public.blob.vercel-storage.com/idaolive.png"
              alt="Ida Olive Logo"
              width={120}
              height={30}
              className={`h-auto transition-all duration-300 ${isScrolled ? 'w-24' : 'w-32'}`}
              priority
            />
            <span className="hidden sm:inline font-serif text-lg font-bold -ml-1">Shepherd’s Cottage</span>
          </div>
        </Link>

        <nav className="hidden items-center space-x-2 md:flex">
          <DesktopNav />
        </nav>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors duration-300 ${
                isScrolled
                  ? 'text-foreground'
                  : 'text-white hover:bg-white/10 hover:text-white'
              }`}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full bg-background">
            <div className="flex h-full flex-col p-6">
              <div className="mb-8 flex items-center justify-between">
                <Link
                  href="#home"
                  className="text-lg font-serif font-bold text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Image 
                      src="https://tfxogfrdzfk9ugja.public.blob.vercel-storage.com/idaolive.png"
                      alt="Ida Olive Logo"
                      width={100}
                      height={25}
                      className="h-auto"
                    />
                    <span className="font-serif text-lg font-bold -ml-1">Shepherd’s Cottage</span>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col items-stretch space-y-6">
                <MobileNav />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
