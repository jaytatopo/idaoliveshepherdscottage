
import { getAllSpecials } from '@/lib/content';
import { SpecialsClientPage } from '../crud-components';

export default async function SpecialsPage() {
    const specials = await getAllSpecials();
    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold font-serif">Specials Management</h1>
                 <p className="text-muted-foreground">Add, edit, or remove promotional specials for your website.</p>
            </header>
            <SpecialsClientPage specials={specials} />
        </div>
    );
}
