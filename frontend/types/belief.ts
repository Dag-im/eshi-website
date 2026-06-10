export interface BeliefRecord {
  id: number;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBeliefDto {
  title: string;
  description: string;
}

export type UpdateBeliefDto = Partial<CreateBeliefDto>;
