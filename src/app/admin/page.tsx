
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from '@/app/actions/auth-actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";

const initialState = {
  success: true,
  message: '',
};

function SubmitButton() {
    // The `useFormStatus` hook provides status information of the last form submission.
    // We can use it to show a loading state while the server action is running.
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Signing In...' : 'Sign In'}
        </Button>
    );
}

export default function AdminLoginPage() {
    const [state, formAction] = useActionState(login, initialState);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <Card className="w-full max-w-sm">
                <form action={formAction}>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-serif">Admin Portal</CardTitle>
                        <CardDescription>Ida Olive Shepherd’s Cottage</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        {state && !state.success && state.message && (
                            <Alert variant="destructive">
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                    <CardFooter>
                        <SubmitButton />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
