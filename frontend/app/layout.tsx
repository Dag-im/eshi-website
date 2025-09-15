import ClientQueryProvider from '@/components/ClientQueryProvider';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'ESHI Consulting',
  description: 'Empowering Grassroots Organizations for Sustainable Impact',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientQueryProvider>
          <Navbar />
          {children}
          <Footer />
        </ClientQueryProvider>
      </body>
    </html>
  );
}
