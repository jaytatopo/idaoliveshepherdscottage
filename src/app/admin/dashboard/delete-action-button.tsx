'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <AlertDialogAction asChild>
            <Button type="submit" variant="destructive" disabled={pending}>
                {pending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
                {pending ? 'Deleting...' : 'Delete'}
            </Button>
        </AlertDialogAction>
    );
}

interface DeleteActionButtonProps {
    deleteAction: () => Promise<{ success: boolean; message: string; }>;
    itemName?: string;
}

export function DeleteActionButton({ deleteAction, itemName }: DeleteActionButtonProps) {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const actionWithToast = async () => {
        const result = await deleteAction();
        if (result.success) {
            toast({ title: 'Success!', description: result.message });
            setIsOpen(false);
        } else {
            toast({ variant: 'destructive', title: 'Delete Failed', description: result.message });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                 <Button variant="ghost" size="icon" className="text-destructive inline-flex">
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <form action={actionWithToast}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete {itemName ? `the item "${itemName}"` : 'this item'}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <SubmitButton />
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
