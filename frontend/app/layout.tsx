'use client';
import AdminLayout from '@/components/admin/AdminLayout';
import ClientQueryProvider from '@/components/ClientQueryProvider';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className="scroll-smooth">
        <ClientQueryProvider>
          {isAdminRoute ? (
            <AdminLayout>{children}</AdminLayout>
          ) : (
            <>
              <Navbar />
              {children}
              <Footer />
            </>
          )}
          <Toaster position="top-right" />
        </ClientQueryProvider>
      </body>
    </html>
  );
}
