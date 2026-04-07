import ClientQueryProvider from '@/components/ClientQueryProvider';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://eshiconsultancy.org'),
  title: {
    default: 'ESHI Consultancy',
    template: '%s | ESHI Consultancy',
  },
  description:
    'ESHI Consultancy supports grassroots NGOs, CBOs, and CSOs through practical capacity building and sustainable organizational development.',
  openGraph: {
    title: 'ESHI Consultancy',
    description:
      'Capacity building and organizational development for grassroots organizations.',
    type: 'website',
    siteName: 'ESHI Consultancy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESHI Consultancy',
    description:
      'Capacity building and organizational development for grassroots organizations.',
  },
  icons: {
    icon: '/eshi.png',
    shortcut: '/eshi.png',
    apple: '/eshi.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} scroll-smooth bg-background text-foreground antialiased`}
      >
        <ClientQueryProvider>
          {children}
          <Toaster />
        </ClientQueryProvider>
      </body>
    </html>
  );
}
