'use client';

import { useRouter } from 'next/navigation';

import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import { useContactMessages } from '@/lib/api/useContact';
import { ContactMessage } from '@/types/contact';

export default function AdminContactPage() {
  const router = useRouter();
  const { data: messages = [] } = useContactMessages();

  return (
    <>
      <PageHeader
        title="Contact messages"
        description="Review inbound requests, flag unread submissions, and open the full message detail."
      />
      <DataTable<ContactMessage>
        title="Inbox"
        description="Messages submitted from the public contact form."
        data={messages}
        searchKeys={['name', 'email', 'message']}
        searchPlaceholder="Search messages"
        columns={[
          {
            key: 'name',
            label: 'Sender',
            render: (message: ContactMessage) => (
              <div className="space-y-1">
                <p className="font-medium">{message.name}</p>
                <p className="text-xs text-muted-foreground">{message.email}</p>
              </div>
            ),
          },
          {
            key: 'message',
            label: 'Message',
            render: (message: ContactMessage) => <p className="line-clamp-2 max-w-xl text-sm text-muted-foreground">{message.message}</p>,
          },
          {
            key: 'seen',
            label: 'Status',
            render: (message: ContactMessage) => (
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${message.seen ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                {message.seen ? 'Seen' : 'Unread'}
              </span>
            ),
          },
        ]}
        actions={[
          { label: 'Open message', onClick: (message) => router.push(`/admin/contact/view/${message.id}`) },
        ]}
      />
    </>
  );
}
