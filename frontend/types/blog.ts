export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  category?: string;
  date: string;
  content: string;
  featured?: boolean;
}
