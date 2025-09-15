'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="border-[var(--color-lemon-grass)]/30 text-[var(--color-avocado)] hover:bg-[var(--color-avocado)]/20"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => setCurrentPage(page)}
          className={
            currentPage === page
              ? 'bg-[var(--color-avocado)] text-[var(--color-albescent-white)]'
              : 'border-[var(--color-lemon-grass)]/30 text-[var(--color-rangitoto)] hover:bg-[var(--color-avocado)]/20'
          }
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="border-[var(--color-lemon-grass)]/30 text-[var(--color-avocado)] hover:bg-[var(--color-avocado)]/20"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
