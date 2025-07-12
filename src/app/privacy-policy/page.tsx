
import { getContent } from "@/lib/content";
import { parse } from 'marked';

// This is a basic markdown parser. For a production app, you might want a more robust one.
function Markdown({ content }: { content: string }) {
    const html = parse(content, { gfm: true, breaks: true });
    return (
        <div 
            className="prose prose-lg dark:prose-invert max-w-none" 
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

export default async function PrivacyPolicyPage() {
    const content = await getContent();
    const policyContent = content.privacy_policy?.content || 'Privacy policy not configured yet.';
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <main className="flex-1 py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold">Privacy Policy</h1>
                    
                    <p className="text-lg text-muted-foreground">
                        Last updated: {lastUpdated}
                    </p>
                    
                    <Markdown content={policyContent} />
                </div>
            </div>
        </main>
    );
}
