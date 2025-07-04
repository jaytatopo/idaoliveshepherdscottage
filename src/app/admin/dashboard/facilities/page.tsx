import { getFacilities } from '@/lib/content';
import { FacilitiesClientPage } from '../crud-components';

export default async function FacilitiesPage() {
    const facilities = await getFacilities();
    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold font-serif">Facilities Management</h1>
                 <p className="text-muted-foreground">Manage the categorized lists of facilities available at the cottage.</p>
            </header>
            <FacilitiesClientPage facilities={facilities} />
        </div>
    );
}
