'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

export function PublishButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
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
