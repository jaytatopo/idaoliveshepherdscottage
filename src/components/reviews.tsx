'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { analyzeReviews, AnalyzeReviewsOutput } from '@/ai/flows/review-analysis';
import { Loader2, Lightbulb, BarChart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const sampleReviews = `The cottage was an absolute dream! So peaceful and quiet, we felt a million miles away. The outdoor shower is a must-try.
We loved being off-grid. The fireplace made the evenings so cozy. We saw so many birds!
A perfect romantic getaway. The stars at night are unbelievable. The hosts were lovely and the goat cheese was delicious.
Great base for hiking and exploring the McGregor area. The cottage had everything we needed for a comfortable stay.
Waking up to the sounds of nature was the best part. A truly special place to disconnect and recharge.`;

export default function Reviews() {
  const [reviews, setReviews] = useState(sampleReviews);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeReviewsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeReviews({ reviews });
      setAnalysisResult(result);
    } catch (e) {
      setError('An error occurred during analysis. Please try again.');
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Guest Voices & Insights</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            Analyze guest feedback with AI to uncover key themes and enhance your marketing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Review Analysis Tool</CardTitle>
              <CardDescription>
                Paste guest reviews below (one per line) to generate a summary and content suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter guest reviews here..."
                className="min-h-[200px] text-sm"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
              />
              <Button onClick={handleAnalyze} disabled={isLoading || !reviews.trim()} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Reviews'
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isLoading && (
              <Card className="flex flex-col items-center justify-center p-8 h-full">
                 <Loader2 className="h-12 w-12 animate-spin text-primary" />
                 <p className="mt-4 text-muted-foreground">AI is thinking...</p>
              </Card>
            )}
            {analysisResult && (
              <>
                <Card>
                  <CardHeader className="flex-row items-center gap-4">
                     <BarChart className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline mb-0 mt-0!">Key Themes Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{analysisResult.summary}</p>
                  </CardContent>
                </Card>
                <Card>
                   <CardHeader className="flex-row items-center gap-4">
                     <Lightbulb className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline mb-0 mt-0!">Suggested Marketing Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-muted-foreground whitespace-pre-line">{analysisResult.suggestedContent}</p>
                  </CardContent>
                </Card>
              </>
            )}
             {!isLoading && !analysisResult && !error && (
                <Card className="flex flex-col items-center justify-center p-8 text-center h-full">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-headline text-lg font-semibold">Your AI Insights Await</h3>
                  <p className="text-muted-foreground mt-2">
                    Click "Analyze Reviews" to see what your guests truly love about their stay.
                  </p>
                </Card>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
