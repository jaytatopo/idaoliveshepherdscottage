'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import type { Amenity, GalleryImage } from '@/lib/content';
import DynamicIcon from './ui/dynamic-icon';

interface AccommodationContent {
  heading: string;
  subheading: string;
  main_text: string;
  secondary_text: string;
}

interface AccommodationProps {
  content: AccommodationContent;
  amenities: Amenity[];
  galleryImages: GalleryImage[];
}

export default function Accommodation({ content, amenities, galleryImages }: AccommodationProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="accommodation" className="py-16 md:py-24 bg-background opacity-0 animate-fade-in-up">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{content.heading}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold">The Heart of the Cottage</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {content.main_text}
                </p>
            </div>
            <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold">Amenities & Comforts</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {content.secondary_text}
                </p>
                 <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4">
                    {amenities.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                        <DynamicIcon name={item.icon} className="w-6 h-6 text-primary" />
                        <span className="font-medium">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => {
              if (index >= 9) return null;

              if (index === 8 && galleryImages.length > 9) {
                return (
                  <button
                    key="view-more"
                    onClick={() => handleOpen(8)}
                    className="relative aspect-square w-full h-full rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center bg-muted hover:bg-muted/80"
                  >
                    <div className="text-center text-muted-foreground">
                      <Plus className="h-8 w-8 mx-auto" />
                      <span className="text-sm font-medium mt-1">
                        +{galleryImages.length - 8} More
                      </span>
                    </div>
                  </button>
                );
              }
              
              return (
                <button
                  key={img.id}
                  onClick={() => handleOpen(index)}
                  className="relative aspect-square w-full h-full rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-0 !shadow-none !rounded-none">
            {selectedImageIndex !== null && (
                <>
                    <DialogTitle className="sr-only">Accommodation Gallery</DialogTitle>
                    <DialogDescription className="sr-only">
                        {galleryImages[selectedImageIndex].alt}
                    </DialogDescription>
                </>
            )}
            <div className="relative aspect-video">
                {selectedImageIndex !== null && (
                    <Image
                        src={galleryImages[selectedImageIndex].src}
                        alt={galleryImages[selectedImageIndex].alt}
                        fill
                        className="object-contain"
                    />
                )}
            </div>
            <div className="absolute inset-0 flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrev}
                    className="rounded-full h-12 w-12 bg-black/50 text-white hover:bg-black/75 hover:text-white -ml-16"
                >
                    <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="rounded-full h-12 w-12 bg-black/50 text-white hover:bg-black/75 hover:text-white -mr-16"
                >
                    <ChevronRight className="h-8 w-8" />
                </Button>
            </div>
             <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="absolute top-0 right-0 rounded-full h-12 w-12 bg-black/50 text-white hover:bg-black/75 hover:text-white -mr-16"
            >
                <X className="h-8 w-8" />
            </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
