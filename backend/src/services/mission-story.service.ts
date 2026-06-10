import { MissionStoryEntity } from '../entities/mission-story.entity';
import { CustomError } from '../lib/jwt';
import { logger } from '../lib/logger';
import { getRepository } from '../lib/repository';

export async function getMissionStories() {
  return getRepository(MissionStoryEntity).find({
    order: { createdAt: 'DESC' },
  });
}

export async function getMissionStory(id: string) {
  const missionStory = await getRepository(MissionStoryEntity).findOne({ where: { id: Number(id) } });
  if (!missionStory) throw new CustomError('Mission/story item not found.', 404);
  return missionStory;
}

export async function createMissionStory(
  data: { type: string; title: string; description: string },
  userId: string
) {
  const repo = getRepository(MissionStoryEntity);
  const missionStory = repo.create(data);
  const savedMissionStory = await repo.save(missionStory);
  logger.info({ action: 'mission_story_created', missionStoryId: savedMissionStory.id, userId });
  return savedMissionStory;
}

export async function updateMissionStory(
  id: string,
  data: { type?: string; title?: string; description?: string },
  userId: string
) {
  const repo = getRepository(MissionStoryEntity);
  const missionStory = await repo.findOne({ where: { id: Number(id) } });
  if (!missionStory) throw new CustomError('Mission/story item not found.', 404);
  Object.assign(missionStory, data);
  const savedMissionStory = await repo.save(missionStory);
  logger.info({ action: 'mission_story_updated', missionStoryId: id, userId });
  return savedMissionStory;
}

export async function deleteMissionStory(id: string, userId: string) {
  const repo = getRepository(MissionStoryEntity);
  const missionStory = await repo.findOne({ where: { id: Number(id) } });
  if (!missionStory) throw new CustomError('Mission/story item not found.', 404);
  await repo.remove(missionStory);
  logger.info({ action: 'mission_story_deleted', missionStoryId: id, userId });
}
