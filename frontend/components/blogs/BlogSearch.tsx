'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type BlogSearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export default function BlogSearch({
  searchQuery,
  setSearchQuery,
}: BlogSearchProps) {
  return (
    <div className="relative w-full md:w-1/2">
      <Input
        type="text"
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 bg-[var(--color-albescent-white)]/20 backdrop-blur-md border-[var(--color-lemon-grass)]/30 rounded-full text-[var(--color-rangitoto)] placeholder:text-[var(--color-rangitoto)]/60"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-avocado)] w-5 h-5" />
    </div>
  );
}
