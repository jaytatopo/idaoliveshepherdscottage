'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface PublishButtonProps {
    form?: string;
}

export function PublishButton({ form }: PublishButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" form={form} disabled={pending}>
            {pending ? (
                <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                </>
            ) : (
                'Publish Changes'
            )}
        </Button>
    );
}
