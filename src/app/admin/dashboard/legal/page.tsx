import { getContent } from '@/lib/content';
import { LegalContentForm } from './legal-content-form';

export default async function LegalPage() {
    const content = await getContent();

    return (
        <div className="space-y-6">
            <LegalContentForm content={content} />
        </div>
    );
}
