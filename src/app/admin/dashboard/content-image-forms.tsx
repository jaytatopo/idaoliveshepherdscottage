'use client';

import { useToast } from "@/hooks/use-toast";
import { uploadGalleryImage, deleteGalleryImage } from "@/app/actions/content-actions";
import type { GalleryImage } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type SectionType = 'hero' | 'reviews' | 'accommodation' | 'accommodation_bg' | 'activities_bg' | 'booking_bg' | 'location_bg';

interface ImageUploadSectionProps {
    section: SectionType;
    title: string;
    description: string;
    images: GalleryImage[];
    isSingleton: boolean;
}

function SubmitButton({ isSingleton, hasImage }: { isSingleton: boolean; hasImage: boolean }) {
    const { pending } = useFormStatus();
    let text = "Upload Image";
    if (isSingleton) {
        text = hasImage ? 'Replace Image' : 'Upload Image'
    }

    return (
        <Button type="submit" size="sm" className="mt-2" disabled={pending}>
            <Upload className="mr-2" />
            {pending ? "Uploading..." : text}
        </Button>
    );
}

function DeleteButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" variant="destructive" size="icon" className="h-8 w-8" disabled={pending}>
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}

export function ImageUploadSection({ section, title, description, images, isSingleton }: ImageUploadSectionProps) {
    const { toast } = useToast();

    async function handleUpload(formData: FormData) {
        const result = await uploadGalleryImage(formData);
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
        } else {
            toast({
                variant: 'destructive',
                title: 'Upload Failed',
                description: result.message,
            });
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this image?')) return;
        const result = await deleteGalleryImage(id);
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
        } else {
            toast({ variant: 'destructive', title: 'Delete Failed', description: result.message });
        }
    }

    const firstImage = images?.[0];

    return (
        <Card className={cn(isSingleton ? "bg-muted/50" : "")}>
            <CardHeader className={cn(isSingleton ? "pb-4" : "")}>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {isSingleton ? (
                    <div className="space-y-4">
                        {firstImage ? (
                            <div className="relative group w-full max-w-sm">
                                <Image src={firstImage.src} alt={firstImage.alt} width={300} height={180} className="rounded-md object-cover aspect-video"/>
                                <form action={() => handleDelete(firstImage.id)} className="absolute top-2 right-2">
                                    <DeleteButton />
                                </form>
                            </div>
                        ) : <p className="text-sm text-muted-foreground">No image has been uploaded for this section.</p>}
                        
                        <form action={handleUpload} className="p-4 bg-background/50 border-dashed rounded-lg border">
                            <div className="grid w-full items-center gap-4">
                                 <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor={`${section}_image_upload`}>Select New Image</Label>
                                    <Input id={`${section}_image_upload`} name="image" type="file" required accept="image/*" className="text-xs" />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor={`${section}_alt_text`}>Image Description (Alt Text)</Label>
                                    <Input id={`${section}_alt_text`} name="alt" type="text" placeholder="e.g., View from the stoep" required/>
                                </div>
                                <input type="hidden" name="section" value={section} />
                                <SubmitButton isSingleton={isSingleton} hasImage={!!firstImage} />
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        {images.length > 0 ? (
                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                                {images.map(image => (
                                    <div key={image.id} className="relative group">
                                        <Image src={image.src} alt={image.alt} width={300} height={200} className="rounded-md object-cover aspect-video"/>
                                        <form action={() => handleDelete(image.id)} className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <DeleteButton />
                                        </form>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <p className="text-sm text-muted-foreground mb-4">No images have been uploaded for this gallery.</p>
                        )}
                         <form action={handleUpload}>
                            <Card className="p-4 bg-muted/50 border-dashed">
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <Upload className="h-8 w-8 text-muted-foreground"/>
                                    <p className="text-sm font-medium">
                                        Upload a new image for the gallery.
                                    </p>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor={`${section}_image_upload`}>Select Image</Label>
                                        <Input id={`${section}_image_upload`} name="image" type="file" required accept="image/*" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor={`${section}_alt_text`}>Image Description (Alt Text)</Label>
                                        <Input id={`${section}_alt_text`} name="alt" type="text" placeholder="e.g., View from the stoep" required/>
                                    </div>
                                    <input type="hidden" name="section" value={section} />
                                    <SubmitButton isSingleton={isSingleton} hasImage={!!firstImage} />
                                </div>
                            </Card>
                        </form>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
