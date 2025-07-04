import { getFaqs } from '@/lib/content';
import { FaqsClientPage } from '../crud-components';

export default async function FaqPage() {
    const faqs = await getFaqs();
    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold font-serif">FAQ Management</h1>
                 <p className="text-muted-foreground">Add, edit, or remove questions and answers for the FAQ section.</p>
            </header>
            <FaqsClientPage faqs={faqs} />
        </div>
    );
}
