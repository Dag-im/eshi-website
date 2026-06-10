'use client';

import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { PageHeader } from '@/components/admin/page-header';
import { MissionStoryForm } from '@/components/admin/mission-story/mission-story-form';
import { useMissionStory } from '@/lib/api/useMissionStory';

export default function EditMissionStoryPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useMissionStory(params.id);

  return (
    <>
      <PageHeader
        title="Edit Mission & Story"
        description="Update a mission or story item displayed in the Who We Are section."
      />
      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : data ? (
        <MissionStoryForm initialData={data} />
      ) : null}
    </>
  );
}
