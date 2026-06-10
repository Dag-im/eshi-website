export interface AboutRecord {
  id: number;
  title: string;
  paragraphs: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAboutDto {
  title: string;
  paragraphs: string[];
}
