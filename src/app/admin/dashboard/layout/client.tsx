
'use client';

import { useState } from 'react';
import type { PageSection } from '@/lib/content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { updatePageLayout } from '@/app/actions/content-actions';
import { GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

// A sortable row component that uses dnd-kit hooks
function SortableTableRow({ section, onVisibilityChange, onSortOrderChange }: { section: PageSection, onVisibilityChange: (id: number, visible: boolean) => void, onSortOrderChange: (id: number, order: number) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: 'relative' as 'relative',
    };
    
    const isHeroSection = section.section_type === 'hero';

    return (
        <TableRow ref={setNodeRef} style={style} {...attributes} data-state={isDragging ? 'dragging' : undefined}>
            <TableCell className="cursor-grab p-2" {...listeners}>
                <GripVertical className="text-muted-foreground" />
            </TableCell>
            <TableCell className="font-medium">{section.title}</TableCell>
            <TableCell>
                <Input
                    type="number"
                    value={section.sort_order}
                    onChange={(e) => onSortOrderChange(section.id, parseInt(e.target.value, 10))}
                    className="w-20"
                />
            </TableCell>
            <TableCell>
                <Switch
                    checked={isHeroSection ? true : section.is_visible}
                    onCheckedChange={(checked) => onVisibilityChange(section.id, checked)}
                    disabled={isHeroSection}
                    aria-label={isHeroSection ? "Hero section cannot be hidden" : `Toggle visibility for ${section.title}`}
                />
            </TableCell>
        </TableRow>
    );
}

export function LayoutClientPage({ sections: initialSections }: { sections: PageSection[] }) {
    const [sections, setSections] = useState<PageSection[]>(initialSections.sort((a, b) => a.sort_order - b.sort_order));
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleSortChange = (id: number, newSortOrder: number) => {
        setSections(prev =>
            prev.map(s => (s.id === id ? { ...s, sort_order: newSortOrder } : s))
        );
    };

    const handleVisibilityChange = (id: number, newVisibility: boolean) => {
        setSections(prev => prev.map(s => (s.id === id ? { ...s, is_visible: newVisibility } : s)));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setSections((currentSections) => {
                const oldIndex = currentSections.findIndex((s) => s.id === active.id);
                const newIndex = currentSections.findIndex((s) => s.id === over.id);
                const reorderedSections = arrayMove(currentSections, oldIndex, newIndex);
                
                // Update sort_order based on new array index to ensure data consistency
                return reorderedSections.map((section, index) => ({
                    ...section,
                    sort_order: (index + 1) * 10,
                }));
            });
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Ensure hero section is always visible before saving
        const sectionsToSave = sections.map(s => 
            s.section_type === 'hero' ? { ...s, is_visible: true } : s
        );

        const result = await updatePageLayout(sectionsToSave);
        if (result.success) {
            toast({ title: 'Layout Saved', description: 'Your homepage layout has been updated.' });
        } else {
            toast({ variant: 'destructive', title: 'Save Failed', description: result.message });
        }
        setIsSaving(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Sections</CardTitle>
                <CardDescription>Drag to reorder, toggle visibility, or manually set a sort order. Click "Save Layout" to apply changes.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSave}>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]"></TableHead>
                                    <TableHead>Section Title</TableHead>
                                    <TableHead className="w-[120px]">Sort Order</TableHead>
                                    <TableHead className="w-[100px]">Visible</TableHead>
                                </TableRow>
                            </TableHeader>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                            >
                                <SortableContext
                                    items={sections.map(s => s.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <TableBody>
                                        {sections.map(section => (
                                            <SortableTableRow
                                                key={section.id}
                                                section={section}
                                                onSortOrderChange={handleSortChange}
                                                onVisibilityChange={handleVisibilityChange}
                                            />
                                        ))}
                                    </TableBody>
                                </SortableContext>
                            </DndContext>
                        </Table>
                    </div>
                    <Button type="submit" className="mt-6" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Layout'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
