'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookie_accepted');
    if (!cookieAccepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_accepted', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-sm border-t p-4 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Cookie className="h-6 w-6 text-primary shrink-0"/>
                <p>
                    We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                    <Link href="#" className="underline ml-1 hover:text-primary">
                        Learn more
                    </Link>
                </p>
            </div>
            <Button onClick={handleAccept} size="sm">
                Accept
            </Button>
        </div>
    </div>
  );
}
