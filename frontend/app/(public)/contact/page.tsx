import ContactPageClient from '@/components/contact/ContactPageClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact | ESHI Consultancy',
    description:
      'Contact ESHI Consultancy to discuss capacity building support, organizational strengthening, and partnership opportunities.',
    alternates: {
      canonical: '/contact',
    },
    openGraph: {
      title: 'Contact | ESHI Consultancy',
      description:
        'Get in touch with ESHI Consultancy for partnership and support.',
      url: '/contact',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact | ESHI Consultancy',
      description:
        'Get in touch with ESHI Consultancy for partnership and support.',
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
