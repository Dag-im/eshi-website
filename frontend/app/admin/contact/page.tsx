'use client';

import { AdminTable } from '@/components/admin/AdminTable';
import { useContactMessages } from '@/lib/api/useContact';
import { useRouter } from 'next/navigation';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO 8601 string from DB
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
    render: (item: Contact) => {
      // Validate and parse the date
      const parsedDate = new Date(item.createdAt);
      return parsedDate.toString() === 'Invalid Date'
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
    },
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
    router.push(`/admin/contact/view/${item._id}`);
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
