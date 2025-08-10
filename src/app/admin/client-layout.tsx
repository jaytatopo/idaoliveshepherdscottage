import React from 'react';

// This layout wraps both the login page (`/admin`) and the dashboard pages.
// It should contain nothing but the children.
export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
