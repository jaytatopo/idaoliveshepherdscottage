import { getAmenities } from '@/lib/content';
import { AmenitiesClientPage } from '../crud-components';

export default async function AmenitiesPage() {
    const amenities = await getAmenities();
    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold font-serif">Amenities Management</h1>
                 <p className="text-muted-foreground">Add, edit, or remove cottage amenities.</p>
            </header>
            <AmenitiesClientPage amenities={amenities} />
        </div>
    );
}
