'use client';

import { AdminTable } from '@/components/admin/AdminTable';
import { useContactMessages } from '@/lib/api/useContact';
import { useRouter } from 'next/navigation';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  seen: boolean;
}

const contactColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'message',
    label: 'Message',
    render: (item: Contact) => item.message.slice(0, 50) + '...',
  },
  {
    key: 'date',
    label: 'Date',
    render: (item: Contact) => new Date(item.date).toLocaleString(),
  },
  {
    key: 'seen',
    label: 'Seen',
    render: (item: Contact) => (item.seen ? 'Yes' : 'No'),
  },
];

export default function ContactsPage() {
  const router = useRouter();
  const { data: contacts, isLoading } = useContactMessages();

  const handleView = (item: Contact) => {
    router.push(`/admin/contacts/view/${item.id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      <AdminTable
        data={contacts || []}
        columns={contactColumns}
        onView={handleView}
        searchPlaceholder="Search contacts..."
      />
    </div>
  );
}
