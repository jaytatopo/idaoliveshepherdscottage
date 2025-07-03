import { getReviews } from '@/lib/content';
import { ReviewsClientPage } from '../crud-components';

export default async function ReviewsPage() {
    const reviews = await getReviews();
    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold font-serif">Reviews Management</h1>
                 <p className="text-muted-foreground">Add, edit, or remove guest testimonials.</p>
            </header>
            <ReviewsClientPage reviews={reviews} />
        </div>
    );
}
