'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export function ContentSubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="mt-8" disabled={pending}>
            {pending ? 'Saving...' : 'Save All Text Changes'}
        </Button>
    );
}
