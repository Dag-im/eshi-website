'use client';

import { ViewContactMessage } from '@/components/admin/contact/ViewContactMessage';
import { useContactMessage } from '@/lib/api/useContact';
import { useParams } from 'next/navigation';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO 8601 string from DB
  seen: boolean;
}

export default function ContactViewPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: contact, isLoading } = useContactMessage(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!contact) {
    return <div>Contact not found</div>;
  }

  // Validate and parse the date
  const parsedDate = new Date(contact.createdAt);
  const formattedDate =
    parsedDate.toString() === 'Invalid Date'
      ? 'Invalid Date'
      : parsedDate.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Contact Message</h1>
      <ViewContactMessage
        id={contact.id}
        name={contact.name}
        email={contact.email}
        message={contact.message}
        date={formattedDate} // Pass formatted date string
        seen={contact.seen}
      />
    </div>
  );
}
