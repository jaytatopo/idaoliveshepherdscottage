import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash2 } from "lucide-react";

export default function DashboardPage() {
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
                                    <TableRow>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell>john.doe@example.com</TableCell>
                                        <TableCell className="hidden md:table-cell">2024-10-15 to 2024-10-18</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon"><FilePenLine /></Button>
                                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 /></Button>
                                        </TableCell>
                                    </TableRow>
                                     <TableRow>
                                        <TableCell>Jane Smith</TableCell>
                                        <TableCell>jane.smith@example.com</TableCell>
                                        <TableCell className="hidden md:table-cell">2024-11-01 to 2024-11-05</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon"><FilePenLine /></Button>
                                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 /></Button>
                                        </TableCell>
                                    </TableRow>
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
