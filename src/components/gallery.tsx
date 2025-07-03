'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import type { GalleryImage } from '@/lib/content';

interface GalleryProps {
  galleryImages: GalleryImage[];
}

export default function Gallery({ galleryImages }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!galleryImages || galleryImages.length === 0) {
    return null; // Don't render the section if there are no images
  }
  
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

  const imagesToShow = galleryImages.slice(0, galleryImages.length > 9 ? 8 : 9);

  return (
    <section id="gallery" className="relative py-16 md:py-24 bg-card opacity-0 animate-fade-in-up [animation-delay:100ms] overflow-hidden">
        <Image
          src="/images/gallery-bg.jpg"
          alt="Abstract background texture"
          fill
          className="object-cover opacity-5 z-0"
          data-ai-hint="abstract texture"
        />
        <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Gallery</h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Step inside and discover the comfort and charm of Ida Olive.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagesToShow.map((img, index) => (
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
                ))}
                {galleryImages.length > 9 && (
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
                )}
            </div>
        </div>

        <Dialog open={selectedImageIndex !== null} onOpenChange={(isOpen) => !isOpen && handleClose()}>
            <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-0 !shadow-none !rounded-none">
                 <DialogHeader className="sr-only">
                    <DialogTitle>Accommodation Gallery</DialogTitle>
                    {selectedImageIndex !== null && (
                        <DialogDescription>{galleryImages[selectedImageIndex].alt}</DialogDescription>
                    )}
                </DialogHeader>

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
