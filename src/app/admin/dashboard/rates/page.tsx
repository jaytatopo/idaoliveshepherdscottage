
import { getRates } from '@/lib/content';
import { RatesClientPage } from '../crud-components';

export default async function RatesPage() {
    const rates = await getRates();
    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold font-serif">Rates Management</h1>
                 <p className="text-muted-foreground">Manage the accommodation rates displayed in the booking section.</p>
            </header>
            <RatesClientPage rates={rates} />
        </div>
    );
}
