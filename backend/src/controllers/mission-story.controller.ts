import { Request, Response } from 'express';
import * as missionStoryService from '../services/mission-story.service';

export async function getMissionStories(req: Request, res: Response) {
  const missionStories = await missionStoryService.getMissionStories();
  res.json(missionStories);
}

export async function getMissionStory(req: Request, res: Response) {
  const missionStory = await missionStoryService.getMissionStory(req.params.id);
  res.json(missionStory);
}

export async function createMissionStory(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const missionStory = await missionStoryService.createMissionStory(req.body, userId);
  res.status(201).json(missionStory);
}

export async function updateMissionStory(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const missionStory = await missionStoryService.updateMissionStory(req.params.id, req.body, userId);
  res.json(missionStory);
}

export async function deleteMissionStory(req: Request, res: Response) {
  const userId = (req as any).user.id;
  await missionStoryService.deleteMissionStory(req.params.id, userId);
  res.status(204).send();
}
