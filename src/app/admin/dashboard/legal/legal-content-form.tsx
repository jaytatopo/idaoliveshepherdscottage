
'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { updateContent } from '@/app/actions/content-actions';
import { PublishButton } from '../publish-button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ContentValue = { [key: string]: string; };
type WebsiteContent = { [section: string]: ContentValue | undefined; };

const initialState = {
  message: null,
  success: false,
};

export function LegalContentForm({ content }: { content: WebsiteContent }) {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateContent, initialState);

    const [textareas, setTextareas] = useState({
        privacy_policy_content: content.privacy_policy?.content || '',
        cookie_policy_content: content.cookie_policy?.content || '',
        terms_conditions_content: content.terms_conditions?.content || '',
    });

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTextareas(prevState => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        if (state && state.message) {
             if (state.success) {
                toast({
                    title: 'Success!',
                    description: state.message,
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Update Failed',
                    description: state.message,
                });
            }
        }
    }, [state, toast]);

    return (
        <form id="legalContentForm" action={formAction}>
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Legal Content Management</h1>
                    <p className="text-muted-foreground">Manage the content of your legal pages. Click "Publish Changes" when you're done.</p>
                </div>
                <PublishButton form="legalContentForm" />
            </header>
            
            <div className="space-y-6 items-start">
                
                <Card>
                    <CardHeader>
                        <CardTitle>Privacy Policy</CardTitle>
                        <CardDescription>Content for the /privacy-policy page. Supports markdown for formatting.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="privacy_policy_content" className="sr-only">Privacy Policy Content</Label>
                            <Textarea id="privacy_policy_content" name="privacy_policy_content" rows={15} value={textareas.privacy_policy_content} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Cookie Policy</CardTitle>
                        <CardDescription>Content for the cookie policy. You can link to this from your cookie banner.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cookie_policy_content" className="sr-only">Cookie Policy Content</Label>
                            <Textarea id="cookie_policy_content" name="cookie_policy_content" rows={15} value={textareas.cookie_policy_content} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Terms and Conditions</CardTitle>
                        <CardDescription>Content for the terms and conditions. You can link to this from your footer or booking form.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="terms_conditions_content" className="sr-only">Terms and Conditions Content</Label>
                            <Textarea id="terms_conditions_content" name="terms_conditions_content" rows={15} value={textareas.terms_conditions_content} onChange={handleTextareaChange} />
                        </div>
                    </CardContent>
                </Card>
                
            </div>
        </form>
    );
}
