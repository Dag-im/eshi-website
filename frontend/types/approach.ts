export interface Approach {
  id: number;
  title: string;
  description: string;
  icon?: string | null;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateApproachDto {
  title: string;
  description: string;
  icon?: string | null;
  sortOrder?: number;
}

export type UpdateApproachDto = Partial<CreateApproachDto>;
