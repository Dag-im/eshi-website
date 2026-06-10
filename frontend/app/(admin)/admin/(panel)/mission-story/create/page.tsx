'use client';

import { MissionStoryForm } from '@/components/admin/mission-story/mission-story-form';
import { PageHeader } from '@/components/admin/page-header';

export default function CreateMissionStoryPage() {
  return (
    <>
      <PageHeader
        title="Add Mission / Story"
        description="Create a new entry for the Who We Are section."
      />
      <MissionStoryForm />
    </>
  );
}
