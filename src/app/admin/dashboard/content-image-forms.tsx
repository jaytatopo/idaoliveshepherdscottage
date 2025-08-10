
'use client';

import { useToast } from "@/hooks/use-toast";
import { uploadGalleryImage, deleteGalleryImage, updateGalleryImageOrder } from "@/app/actions/content-actions";
import type { GalleryImage } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, GripVertical } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { DeleteActionButton } from "./delete-action-button";
import { useState } from "react";
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SectionType = 'hero' | 'reviews' | 'accommodation' | 'accommodation_bg' | 'amenities_bg' | 'facilities_bg' | 'activities_bg' | 'specials_bg' | 'booking_bg' | 'location_bg' | 'host_profile' | 'host_bg' | 'faq_bg' | 'cta_bg' | 'video_bg';

interface ImageUploadSectionProps {
    section: SectionType;
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

// Sortable image item component for drag and drop
function SortableImageItem({ image, onDelete }: { image: GalleryImage; onDelete: (id: number) => Promise<{ success: boolean; message: string; }> }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isOver,
        over,
    } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    // Determine if this item is being dragged over
    const isDragOver = over && over.id === image.id && !isDragging;

    return (
        <div ref={setNodeRef} style={style} className="relative group">
            {isDragOver && (
                <div className="absolute inset-0 bg-blue-500/20 rounded-md z-20 pointer-events-none flex items-center justify-center">
                    <div className="text-blue-500 font-bold text-lg">Drop here</div>
                </div>
            )}
            <div className="absolute top-2 left-2 z-10 cursor-grab bg-black/50 rounded p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical {...attributes} {...listeners} size={16} />
            </div>
            <Image src={image.src_url} alt={image.alt} width={300} height={200} className="rounded-md object-cover aspect-video" />
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <DeleteActionButton
                    itemName={image.alt || 'this image'}
                    deleteAction={async () => onDelete(image.id)}
                />
            </div>
        </div>
    );
}

export function ImageUploadSection({ section, images, isSingleton }: ImageUploadSectionProps) {
    const { toast } = useToast();
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(images);
    const [activeId, setActiveId] = useState<number | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    async function handleUpload(formData: FormData) {
        const result = await uploadGalleryImage(formData);
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
            // After successful upload, we need to refresh the page to get the updated image list
            // This is a simple solution - in a more complex app, you might fetch the updated list
            window.location.reload();
        } else {
            toast({
                variant: 'destructive',
                title: 'Upload Failed',
                description: result.message,
            });
        }
    }

    async function handleDelete(id: number) {
        const result = await deleteGalleryImage(id);
        if (result.success) {
            // After successful deletion, refresh the page to get the updated image list
            window.location.reload();
        }
        return result;
    }

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as number);
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = galleryImages.findIndex(image => image.id === active.id);
            const newIndex = galleryImages.findIndex(image => image.id === over.id);
            
            const newImages = arrayMove(galleryImages, oldIndex, newIndex);
            setGalleryImages(newImages);

            // Update the sort_order in the database
            try {
                await Promise.all(newImages.map((image, index) =>
                    updateGalleryImageOrder(image.id, index)
                ));
                toast({ title: 'Success!', description: 'Image order updated successfully.' });
            } catch (error) {
                console.error('Failed to update image order:', error);
                toast({
                    variant: 'destructive',
                    title: 'Update Failed',
                    description: 'Failed to update image order.',
                });
                // Revert to original order on failure
                setGalleryImages(galleryImages);
            }
        }
        
        setActiveId(null);
    }

    const activeImage = activeId ? galleryImages.find(image => image.id === activeId) : null;

    const firstImage = galleryImages?.[0];

    if (isSingleton) {
        return (
            <div className="space-y-4">
                {firstImage && firstImage.src_url ? (
                    <div className="relative group w-full max-w-sm">
                        <Image src={firstImage.src_url} alt={firstImage.alt} width={300} height={180} className="rounded-md object-cover aspect-video"/>
                        <div className="absolute top-2 right-2">
                             <DeleteActionButton
                                itemName={firstImage.alt || 'this image'}
                                deleteAction={async () => {
                                    const result = await deleteGalleryImage(firstImage.id);
                                    if (result.success) {
                                        window.location.reload();
                                    }
                                    return result;
                                }}
                            />
                        </div>
                    </div>
                ) : <p className="text-sm text-muted-foreground">No image has been uploaded for this section.</p>}
                
                <form action={handleUpload} className="p-4 bg-muted/50 border-dashed rounded-lg border">
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
                        <SubmitButton isSingleton={isSingleton} hasImage={!!firstImage?.src_url} />
                    </div>
                </form>
            </div>
        );
    }

    return (
        <>
            {galleryImages.length > 0 ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop images to reorder them</p>
                        <SortableContext items={galleryImages.map(img => img.id)} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                                {galleryImages.map(image => (
                                    <SortableImageItem
                                        key={image.id}
                                        image={image}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </div>
                    <DragOverlay>
                        {activeImage ? (
                            <div className="relative opacity-80">
                                <div className="absolute top-2 left-2 z-10 cursor-grabbing bg-black/50 rounded p-1 text-white">
                                    <GripVertical size={16} />
                                </div>
                                <Image src={activeImage.src_url} alt={activeImage.alt} width={300} height={200} className="rounded-md object-cover aspect-video shadow-lg" />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            ) : (
                 <p className="text-sm text-muted-foreground mb-4">No images have been uploaded for this gallery.</p>
            )}
             <form action={handleUpload} className="p-4 bg-muted/50 border-dashed border rounded-lg">
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
            </form>
        </>
    );
}
