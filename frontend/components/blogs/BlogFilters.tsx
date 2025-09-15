'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type BlogFiltersProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export default function BlogFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
}: BlogFiltersProps) {
  return (
    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
      <SelectTrigger className="w-full md:w-48 bg-[var(--color-albescent-white)]/20 backdrop-blur-md border-[var(--color-lemon-grass)]/30 rounded-full text-[var(--color-rangitoto)]">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
