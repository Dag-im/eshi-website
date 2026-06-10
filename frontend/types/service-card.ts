export interface ServiceCard {
  id: number;
  title: string;
  points: string[];
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateServiceCardDto {
  title: string;
  points: string[];
  sortOrder?: number;
}

export type UpdateServiceCardDto = Partial<CreateServiceCardDto>;
