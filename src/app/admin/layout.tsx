'use client';

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
                        <SidebarMenuButton href="/admin/dashboard" tooltip="Dashboard" isActive={pathname === '/admin/dashboard'}>
                            <LayoutDashboard />
                            <span>Dashboard</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/dashboard/content" tooltip="Content" isActive={pathname === '/admin/dashboard/content'}>
                            <FileText />
                            <span>Content</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/dashboard/amenities" tooltip="Amenities" isActive={pathname === '/admin/dashboard/amenities'}>
                            <List />
                            <span>Amenities</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/dashboard/activities" tooltip="Activities" isActive={pathname === '/admin/dashboard/activities'}>
                            <Mountain />
                            <span>Activities</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton href="/admin/dashboard/reviews" tooltip="Reviews" isActive={pathname === '/admin/dashboard/reviews'}>
                            <Star />
                            <span>Reviews</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                         <SidebarMenuButton href="/" tooltip="Public Site">
                            <Home />
                            <span>Back to Site</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                         <SidebarMenuButton href="/admin" tooltip="Logout">
                            <LogOut />
                            <span>Logout</span>
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
