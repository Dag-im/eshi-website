export interface MethodologyPhase {
  id: number;
  phase: string;
  description: string;
  items?: string[] | null;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMethodologyPhaseDto {
  phase: string;
  description: string;
  items?: string[];
  sortOrder?: number;
}

export type UpdateMethodologyPhaseDto = Partial<CreateMethodologyPhaseDto>;
