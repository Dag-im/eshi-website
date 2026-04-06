import { PresentationEntity } from '../../entities/presentation.entity';
import { getRepository } from '../../lib/repository';
import { Seed } from './types';

const presentations = [
  {
    title: `Women's Business, Empowerment, and the "Self-Help Approach"`,
    description:
      'Consortium of Self-Help Group Approach Promoters and The New School, June 23, 2023, Addis Ababa, Ethiopia',
  },
  {
    title:
      'From Here to There: Can Evaluation Localization Lead to Decolonized Funding and Greater Social Impact?',
    description: 'American Evaluation Association annual conference, New Orleans, Nov. 12, 2022',
  },
  {
    title: 'De-colonizing M&E By Rejecting External Evaluation and Building Internal Capacity',
    description:
      'April 25, 2022, Eastern Evaluation Research Society Annual Conference, New Jersey, U.S.',
  },
];

export class PresentationSeed implements Seed {
  async run() {
    // SEED UPDATED: to match new entity schema
    const repo = getRepository(PresentationEntity);

    for (const presentation of presentations) {
      const existing = await repo.findOne({ where: { title: presentation.title } });
      if (existing) {
        existing.description = presentation.description;
        existing.imageUrl = existing.imageUrl || null;
        await repo.save(existing);
        continue;
      }

      await repo.save(repo.create({ ...presentation, imageUrl: null }));
    }
  }
}
