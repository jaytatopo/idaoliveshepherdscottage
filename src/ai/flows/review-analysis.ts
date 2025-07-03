'use server';

/**
 * @fileOverview An AI flow for analyzing guest reviews.
 *
 * - analyzeReviews - A function that takes guest reviews and returns an analysis.
 * - ReviewAnalysisInput - The input type for the analyzeReviews function.
 * - ReviewAnalysisOutput - The return type for the analyzeReviews function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { Review } from '@/lib/content';

const ReviewSchema = z.object({
  id: z.number(),
  quote: z.string(),
  author: z.string(),
  rating: z.number(),
  sort_order: z.number(),
});

export const ReviewAnalysisInputSchema = z.object({
  reviews: z.array(ReviewSchema),
});
export type ReviewAnalysisInput = z.infer<typeof ReviewAnalysisInputSchema>;


export const ReviewAnalysisOutputSchema = z.object({
  positiveThemes: z.array(z.string()).describe('A list of common positive themes mentioned in the reviews.'),
  areasForImprovement: z.array(z.string()).describe('A list of common areas for improvement suggested by the reviews.'),
  sentiment: z.enum(['Positive', 'Neutral', 'Negative']).describe('The overall sentiment of the reviews.'),
  summary: z.string().describe('A one-paragraph summary of all guest feedback.'),
  ratingDistribution: z.record(z.string(), z.number()).describe('An object where keys are star ratings (e.g., "5 Stars") and values are the count of reviews with that rating.'),
});
export type ReviewAnalysisOutput = z.infer<typeof ReviewAnalysisOutputSchema>;

// This is the exported function that the UI will call.
export async function analyzeReviews(reviews: Review[]): Promise<ReviewAnalysisOutput> {
  // We calculate the rating distribution here, as it's a deterministic task
  // not requiring an LLM. This saves on processing time and cost.
  const ratingDistribution = reviews.reduce((acc, review) => {
    const key = `${review.rating} Star${review.rating === 1 ? '' : 's'}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const aiResult = await reviewAnalysisFlow({ reviews });

  return {
    ...aiResult,
    ratingDistribution,
  };
}

const analysisPrompt = ai.definePrompt({
    name: 'reviewAnalysisPrompt',
    input: { schema: ReviewAnalysisInputSchema },
    output: { schema: ReviewAnalysisOutputSchema },
    prompt: `You are an expert hospitality consultant analyzing guest reviews for a boutique cottage.
    Analyze the following reviews and provide a concise summary.
    Identify the most common positive themes and areas for improvement.
    Determine the overall sentiment. Do not include the rating distribution in your analysis; it will be calculated separately.

    Reviews:
    {{#each reviews}}
    - Rating: {{rating}}/5, By: {{author}}
      "{{quote}}"
    {{/each}}
    `,
});


const reviewAnalysisFlow = ai.defineFlow(
  {
    name: 'reviewAnalysisFlow',
    inputSchema: ReviewAnalysisInputSchema,
    outputSchema: ReviewAnalysisOutputSchema,
  },
  async (input) => {
    const llmResponse = await analysisPrompt(input);
    const output = llmResponse.output;

    if (!output) {
      throw new Error('AI analysis failed to produce a result.');
    }
    
    // The model will generate the rating distribution, but we override it
    // with our pre-calculated, accurate data.
    return {
        ...output,
        ratingDistribution: {}, // This will be filled in by the exported wrapper function.
    };
  }
);
