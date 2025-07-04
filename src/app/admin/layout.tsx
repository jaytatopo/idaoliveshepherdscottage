
import type { Metadata } from 'next';
import AdminClientLayout from './client-layout';

// Prevent search engines from indexing the admin panel
export const metadata: Metadata = {
  title: 'Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminClientLayout>
      {children}
    </AdminClientLayout>
  )
}
