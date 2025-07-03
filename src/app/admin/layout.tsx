'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, Home, FileText, List, Mountain, Star } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  // Do not show the sidebar on the login page itself.
  if (pathname === '/admin') {
    return <>{children}</>;
  }
  
  // Show the sidebar for all other authenticated admin pages.
  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="/admin-avatar.png" alt="Admin" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-semibold">Admin</span>
                        <span className="text-xs text-muted-foreground">Ida Olive Cottage</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/admin/dashboard'}>
                            <Link href="/admin/dashboard">
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Content" isActive={pathname === '/admin/dashboard/content'}>
                            <Link href="/admin/dashboard/content">
                                <FileText />
                                <span>Content</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Amenities" isActive={pathname === '/admin/dashboard/amenities'}>
                            <Link href="/admin/dashboard/amenities">
                                <List />
                                <span>Amenities</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Activities" isActive={pathname === '/admin/dashboard/activities'}>
                            <Link href="/admin/dashboard/activities">
                                <Mountain />
                                <span>Activities</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Reviews" isActive={pathname === '/admin/dashboard/reviews'}>
                            <Link href="/admin/dashboard/reviews">
                                <Star />
                                <span>Reviews</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                         <SidebarMenuButton asChild tooltip="Public Site">
                            <Link href="/">
                                <Home />
                                <span>Back to Site</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                         <SidebarMenuButton asChild tooltip="Logout">
                            <Link href="/admin">
                                <LogOut />
                                <span>Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <div className="p-4 md:p-6">
                 {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
  )
}
