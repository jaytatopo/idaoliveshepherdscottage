import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FilePenLine, Trash2, PlusCircle, Upload, GripVertical } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/db";
import { format } from 'date-fns';
import { getContent, getAmenities, getActivities, getGalleryImages, getReviews } from '@/lib/content';
import { updateContent, deleteGalleryImage, uploadGalleryImage } from "@/app/actions/content-actions";
import { revalidatePath } from 'next/cache';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    check_in: string;
    check_out: string;
    guests: number;
}

async function getInquiries(): Promise<Inquiry[]> {
    try {
        const [rows] = await db.query('SELECT id, name, email, check_in, check_out, guests FROM inquiries ORDER BY id DESC LIMIT 20');
        return rows as Inquiry[];
    } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        return [];
    }
}

export default async function DashboardPage() {
    const inquiries = await getInquiries();
    const content = await getContent();
    const amenities = await getAmenities();
    const activities = await getActivities();
    const accommodationImages = await getGalleryImages('accommodation');
    const reviews = await getReviews();

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage your website content and view inquiries.</p>
                </div>
                <form action={async () => { 'use server'; revalidatePath('/'); revalidatePath('/admin/dashboard'); }}>
                    <Button>Publish Changes</Button>
                </form>
            </header>

            <Tabs defaultValue="inquiries">
                <TabsList className="flex-wrap h-auto">
                    <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                    <TabsTrigger value="general_text">General Text</TabsTrigger>
                    <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* INQUIRIES TAB */}
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
                                        <TableHead className="hidden sm:table-cell">Dates</TableHead>
                                        <TableHead className="hidden md:table-cell">Guests</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {inquiries.length > 0 ? (
                                        inquiries.map((inquiry) => (
                                            <TableRow key={inquiry.id}>
                                                <TableCell className="font-medium">{inquiry.name}</TableCell>
                                                <TableCell>{inquiry.email}</TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    {format(new Date(inquiry.check_in), "PP")} - {format(new Date(inquiry.check_out), "PP")}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{inquiry.guests}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center h-24">
                                                No inquiries found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* GENERAL TEXT TAB */}
                <TabsContent value="general_text" className="mt-4">
                    <form action={updateContent}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Manage Website Text</CardTitle>
                                <CardDescription>Edit text for various sections. Remember to publish changes.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="space-y-4 p-4 border rounded-lg">
                                    <h3 className="font-semibold font-serif text-lg">Hero Section</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="hero_heading">Heading</Label>
                                        <Input id="hero_heading" name="hero_heading" defaultValue={content.hero.heading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="hero_subheading">Subheading</Label>
                                        <Textarea id="hero_subheading" name="hero_subheading" defaultValue={content.hero.subheading} />
                                    </div>
                                </div>
                                <div className="space-y-4 p-4 border rounded-lg">
                                    <h3 className="font-semibold font-serif text-lg">Location & Contact Section</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="location_heading">Heading</Label>
                                        <Input id="location_heading" name="location_heading" defaultValue={content.location.heading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location_subheading">Subheading</Label>
                                        <Textarea id="location_subheading" name="location_subheading" defaultValue={content.location.subheading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location_address">Address</Label>
                                        <Input id="location_address" name="location_address" defaultValue={content.location.address} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="location_email">Email</Label>
                                            <Input id="location_email" name="location_email" type="email" defaultValue={content.location.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location_phone">Phone</Label>
                                            <Input id="location_phone" name="location_phone" defaultValue={content.location.phone} />
                                        </div>
                                    </div>
                                </div>
                                 <Button type="submit">Save Text Changes</Button>
                            </CardContent>
                        </Card>
                    </form>
                </TabsContent>

                {/* ACCOMMODATION TAB */}
                <TabsContent value="accommodation" className="mt-4 space-y-6">
                    <form action={updateContent}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Accommodation Section</CardTitle>
                                <CardDescription>Manage the text for the accommodation section.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="accommodation_heading">Heading</Label>
                                    <Input id="accommodation_heading" name="accommodation_heading" defaultValue={content.accommodation.heading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accommodation_subheading">Subheading</Label>
                                    <Textarea id="accommodation_subheading" name="accommodation_subheading" defaultValue={content.accommodation.subheading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accommodation_main_text">Main Text Block</Label>
                                    <Textarea id="accommodation_main_text" name="accommodation_main_text" rows={5} defaultValue={content.accommodation.main_text} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accommodation_secondary_text">Secondary Text Block</Label>
                                    <Textarea id="accommodation_secondary_text" name="accommodation_secondary_text" rows={5} defaultValue={content.accommodation.secondary_text} />
                                </div>
                                <Button type="submit">Save Accommodation Text</Button>
                            </CardContent>
                        </Card>
                    </form>
                    <Card>
                        <CardHeader>
                            <CardTitle>Accommodation Gallery</CardTitle>
                            <CardDescription>Upload, arrange, or delete photos for the accommodation gallery.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                                {accommodationImages.map(image => (
                                    <div key={image.id} className="relative group">
                                        <Image src={image.src} alt={image.alt} width={300} height={200} className="rounded-md object-cover aspect-video"/>
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white"><GripVertical/></Button>
                                             <form action={deleteGalleryImage}>
                                                 <input type="hidden" name="id" value={image.id} />
                                                 <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2/></Button>
                                             </form>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form action={uploadGalleryImage}>
                                <Card className="p-4 bg-muted/50 border-dashed">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <Upload className="h-8 w-8 text-muted-foreground"/>
                                        <Label htmlFor="accommodation_image_upload" className="cursor-pointer font-semibold text-primary">Upload an image</Label>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 5MB</p>
                                        <Input id="accommodation_image_upload" name="image" type="file" className="sr-only" required/>
                                        <input type="hidden" name="section" value="accommodation" />
                                        <Button type="submit" size="sm" className="mt-2">Upload</Button>
                                    </div>
                                </Card>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                {/* ACTIVITIES TAB */}
                <TabsContent value="activities" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Manage Activities</CardTitle>
                            <CardDescription>Add, edit, or remove activities displayed on the website.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground text-center p-8">Activity management coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* REVIEWS TAB */}
                <TabsContent value="reviews" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Manage Guest Reviews</CardTitle>
                            <CardDescription>Add, edit, or remove guest testimonials.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground text-center p-8">Review management coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
