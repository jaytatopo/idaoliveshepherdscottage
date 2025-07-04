import Footer from '@/components/footer';
import Header from '@/components/header';

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
