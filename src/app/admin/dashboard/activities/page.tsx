import { getActivities } from '@/lib/content';
import { ActivitiesClientPage } from '../crud-components';

export default async function ActivitiesPage() {
    const activities = await getActivities();
    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold font-serif">Activities Management</h1>
                 <p className="text-muted-foreground">Add, edit, or remove nearby activities and their images.</p>
            </header>
            <ActivitiesClientPage activities={activities} />
        </div>
    );
}
