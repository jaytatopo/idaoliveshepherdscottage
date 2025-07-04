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

export function LayoutClientPage({ sections: initialSections }: { sections: PageSection[] }) {
    const [sections, setSections] = useState<PageSection[]>(initialSections);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleSortChange = (id: number, newSortOrder: number) => {
        setSections(prev =>
            prev.map(s => (s.id === id ? { ...s, sort_order: newSortOrder } : s))
              .sort((a, b) => a.sort_order - b.sort_order)
        );
    };

    const handleVisibilityChange = (id: number, newVisibility: boolean) => {
        setSections(prev => prev.map(s => (s.id === id ? { ...s, is_visible: newVisibility } : s)));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const result = await updatePageLayout(sections);
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
                <CardDescription>Drag to reorder, set visibility, and adjust sort order. Click "Save Layout" to apply changes.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={() => handleSave()}>
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
                            <TableBody>
                                {sections.map(section => (
                                    <TableRow key={section.id}>
                                        <TableCell className="cursor-grab">
                                            <GripVertical className="text-muted-foreground" />
                                        </TableCell>
                                        <TableCell className="font-medium">{section.title}</TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={section.sort_order}
                                                onChange={(e) => handleSortChange(section.id, parseInt(e.target.value, 10))}
                                                className="w-20"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={section.is_visible}
                                                onCheckedChange={(checked) => handleVisibilityChange(section.id, checked)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
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
