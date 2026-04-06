'use client';

import { useParams } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { ViewContactMessage } from '@/components/admin/contact/ViewContactMessage';
import { useContactMessage } from '@/lib/api/useContact';

export default function AdminContactViewPage() {
  const params = useParams();
  const { data: message } = useContactMessage(params.id as string);

  if (!message) return null;

  return (
    <>
      <PageHeader
        title="Message detail"
        description="Inspect the full contact request and mark it as reviewed."
      />
      <ViewContactMessage
        id={message.id}
        name={message.name}
        email={message.email}
        message={message.message}
        date={message.createdAt}
        seen={message.seen}
      />
    </>
  );
}
