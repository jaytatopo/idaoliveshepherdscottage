import { getReviews } from '@/lib/content';
import { AnalysisClientPage } from '../crud-components';
import { BarChart4 } from 'lucide-react';

export default async function AnalysisPage() {
    const reviews = await getReviews();
    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold font-serif flex items-center gap-3"><BarChart4 className="w-8 h-8"/> AI Review Analysis</h1>
                 <p className="text-muted-foreground">Gain deep insights from your guest feedback using the power of AI.</p>
            </header>
            <AnalysisClientPage reviews={reviews} />
        </div>
    );
}
