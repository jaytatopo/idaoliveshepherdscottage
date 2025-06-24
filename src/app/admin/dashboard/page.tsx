import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { format } from 'date-fns';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    check_in: string;
    check_out: string;
}

async function getInquiries(): Promise<Inquiry[]> {
    try {
        // This assumes you have an 'inquiries' table created in your database.
        const [rows] = await db.query('SELECT id, name, email, check_in, check_out FROM inquiries ORDER BY id DESC LIMIT 20');
        return rows as Inquiry[];
    } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        // Returning an empty array if the table doesn't exist or another error occurs.
        return [];
    }
}

export default async function DashboardPage() {
    const inquiries = await getInquiries();
    
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold font-serif">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your website content and view inquiries.</p>
            </header>

            <Tabs defaultValue="inquiries">
                <TabsList>
                    <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                    <TabsTrigger value="content">Text Content</TabsTrigger>
                    <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
                </TabsList>
                <TabsContent value="inquiries" className="mt-4">
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
                                        <TableHead className="hidden md:table-cell">Dates</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {inquiries.length > 0 ? (
                                        inquiries.map((inquiry) => (
                                            <TableRow key={inquiry.id}>
                                                <TableCell className="font-medium">{inquiry.name}</TableCell>
                                                <TableCell>{inquiry.email}</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {format(new Date(inquiry.check_in), "PPP")} to {format(new Date(inquiry.check_out), "PPP")}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon"><FilePenLine /></Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24">
                                                No inquiries found. Ensure your database is connected and the 'inquiries' table exists.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="content" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Website Text</CardTitle>
                            <CardDescription>Edit the text content for various sections of your site.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground">Content management interface will be here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="gallery" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Photo Gallery</CardTitle>
                            <CardDescription>Upload, arrange, or delete photos in your galleries.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">Photo gallery management interface will be here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
