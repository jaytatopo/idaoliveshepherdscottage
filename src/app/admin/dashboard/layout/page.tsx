import { getAllPageSections } from '@/lib/content';
import { LayoutClientPage } from './client';

export default async function LayoutPage() {
    const sections = await getAllPageSections();
    
    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold font-serif">Page Layout Management</h1>
                 <p className="text-muted-foreground">Control the order and visibility of sections on your homepage.</p>
            </header>
            <LayoutClientPage sections={sections} />
        </div>
    );
}
