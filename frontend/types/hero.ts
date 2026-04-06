export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroRecord {
  id: number;
  bgImages: HeroImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroProps {
  bgImages?: HeroImage[];
}
