'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#features', label: 'Features' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
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
    isScrolled ? 'bg-white/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
  }`;

  const linkClasses = `text-lg font-bold transition-colors duration-300 ${
    isScrolled ? 'text-gray-900' : 'text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]'
  }`;

  const DesktopNav = () => (
    <>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} passHref>
          <Button
            variant="link"
            className={`text-base font-semibold transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-white hover:text-blue-200 [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]'
            }`}
          >
            {link.label}
          </Button>
        </Link>
      ))}
      <Link href="#contact" passHref>
        <Button
          className={`bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold transform transition-transform duration-200 hover:scale-105 active:scale-95`}
        >
          Get Free Quote
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
            className="text-xl h-auto font-semibold text-gray-900 hover:text-blue-600 justify-start"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </Button>
        </Link>
      ))}
      <Link href="#contact" passHref>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl h-auto font-semibold transform transition-transform hover:scale-105 active:scale-95"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Get Free Quote
        </Button>
      </Link>
    </>
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#home" className={`${linkClasses} flex items-center space-x-2`}>
          <Home className="w-6 h-6" />
          <span>PropertyPro Management</span>
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
                  ? 'text-gray-900'
                  : 'text-white hover:bg-white/10 hover:text-white'
              }`}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full bg-white">
            <div className="flex h-full flex-col p-6">
              <div className="mb-8 flex items-center justify-between">
                <Link
                  href="#home"
                  className="text-lg font-bold text-blue-600 flex items-center space-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>PropertyPro</span>
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
