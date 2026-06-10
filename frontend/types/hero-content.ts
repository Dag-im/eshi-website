export interface HeroContentRecord {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateHeroContentDto {
  title: string;
  subtitle: string;
  description: string;
}

export type UpdateHeroContentDto = Partial<CreateHeroContentDto>;
