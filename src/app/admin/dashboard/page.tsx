import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from 'date-fns';
import type { Inquiry } from '@/lib/content';
import { getInquiries } from '@/lib/content';
import { deleteInquiry } from '@/app/actions/content-actions';

export default async function DashboardPage() {
    const inquiries = await getInquiries();

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold font-serif">Dashboard</h1>
                <p className="text-muted-foreground">View recent inquiries from your website.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                    <CardDescription>Here are the latest messages from your visitors.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="hidden sm:table-cell">Guests</TableHead>
                                <TableHead className="hidden md:table-cell">Message</TableHead>
                                <TableHead className="hidden sm:table-cell">Received</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inquiries.length > 0 ? (
                                inquiries.map((inquiry) => (
                                    <TableRow key={inquiry.id}>
                                        <TableCell className="font-medium">{inquiry.name}</TableCell>
                                        <TableCell>{inquiry.email}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{inquiry.guests}</TableCell>
                                        <TableCell className="hidden md:table-cell max-w-[250px] truncate">
                                            {inquiry.message}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {format(new Date(inquiry.created_at), "PP")}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <form action={deleteInquiry.bind(null, inquiry.id)}>
                                                <Button type="submit" variant="ghost" size="icon" className="text-destructive"><Trash2 /></Button>
                                            </form>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">
                                        No inquiries found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
