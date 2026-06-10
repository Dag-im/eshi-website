export interface MissionStoryRecord {
  id: number;
  type: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMissionStoryDto {
  type: string;
  title: string;
  description: string;
}

export type UpdateMissionStoryDto = Partial<CreateMissionStoryDto>;
