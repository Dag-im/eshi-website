'use client';

import { ViewContactMessage } from '@/components/admin/contact/ViewContactMessage';
import { useContactMessage } from '@/lib/api/useContact';
import { useParams } from 'next/navigation';

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Contact Message</h1>
      <ViewContactMessage
        id={contact.id}
        name={contact.name}
        email={contact.email}
        message={contact.message}
        date={contact.date}
        seen={contact.seen}
      />
    </div>
  );
}
