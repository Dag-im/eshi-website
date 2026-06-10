export interface WhyChooseReason {
  id: number;
  title: string;
  description: string;
  icon?: string | null;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWhyChooseReasonDto {
  title: string;
  description: string;
  icon?: string | null;
  sortOrder?: number;
}

export type UpdateWhyChooseReasonDto = Partial<CreateWhyChooseReasonDto>;
