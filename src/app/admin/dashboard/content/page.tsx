import { getContent } from '@/lib/content';
import { ContentForm } from './content-form';

export default async function ContentPage() {
    const content = await getContent();

    return (
        <div className="space-y-6">
            <ContentForm content={content} />
        </div>
    );
}
