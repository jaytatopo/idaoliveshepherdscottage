'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#accommodation', label: 'Accommodation' },
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} passHref>
          <Button variant="link" className="text-foreground hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            {link.label}
          </Button>
        </Link>
      ))}
      <Link href="#booking" passHref>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setIsMobileMenuOpen(false)}>
          Book Now
        </Button>
      </Link>
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="text-lg font-serif font-bold text-primary">
          Ida Olive Shepherd’s Cottage
        </Link>

        <nav className="hidden items-center space-x-2 md:flex">
          <NavContent />
        </nav>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full bg-background">
            <div className="flex h-full flex-col p-6">
              <div className="mb-8 flex items-center justify-between">
                <Link href="#home" className="text-lg font-serif font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Ida Olive Cottage
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col items-start space-y-4">
                 <NavContent />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
