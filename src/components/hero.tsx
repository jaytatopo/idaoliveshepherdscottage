import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, Home, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroContent {
  heading: string;
  subheading: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section id="home" className="relative h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-t from-black/40 to-transparent"
      )} />
      
      <div className={cn(
        "relative z-10 flex h-full flex-col items-center justify-center text-center",
        "text-white"
      )}>
        <div className="max-w-5xl p-6">
          <div className="mb-8 opacity-0 animate-fade-in [animation-delay:200ms]">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Home className="w-4 h-4 mr-2" />
              Professional Property Management
            </div>
          </div>
          
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg opacity-0 animate-fade-in [animation-delay:400ms]">
            {content.heading}
          </h1>
          
          <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-blue-100 drop-shadow-md opacity-0 animate-fade-in [animation-delay:600ms]">
            {content.subheading}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up [animation-delay:800ms]">
            <Link href={content.ctaLink || "#contact"} passHref>
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 shadow-lg transform hover:scale-105 transition-transform font-semibold">
                <TrendingUp className="w-5 h-5 mr-2" />
                {content.ctaText || "Get Free Quote"}
              </Button>
            </Link>
            <Link href="#services" passHref>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform">
                <Users className="w-5 h-5 mr-2" />
                Our Services
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto opacity-0 animate-fade-in-up [animation-delay:1000ms]">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200 text-sm">Properties Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-200 text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">25%</div>
              <div className="text-blue-200 text-sm">Avg. Income Increase</div>
            </div>
          </div>
        </div>
        
        <Link href="#services" className="absolute bottom-10 animate-bounce">
          <ArrowDown className="h-8 w-8 text-white/80"/>
          <span className="sr-only">Scroll down</span>
        </Link>
      </div>
    </section>
  );
}
