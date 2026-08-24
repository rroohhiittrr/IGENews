'use client';

import { Pagination as PaginationType } from '@/types/company';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { page, totalPages, hasNext, hasPrev } = pagination;
  if (totalPages <= 1) return null;

  // Generate range of page numbers to display (max 5)
  const getPages = () => {
    const range: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => hasPrev && onPageChange(page - 1)}
        disabled={!hasPrev}
        className="flex items-center justify-center w-9 h-9 rounded-xl bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        title="Previous Page"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {/* Pages */}
      {getPages().map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 font-bold rounded-xl text-xs flex items-center justify-center border cursor-pointer transition-colors ${
            p === page
              ? 'bg-[#1D1D46] text-white border-[#1D1D46] shadow-md'
              : 'bg-white dark:bg-[#122238] border-gray-100 dark:border-white/5 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/10'
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => hasNext && onPageChange(page + 1)}
        disabled={!hasNext}
        className="flex items-center justify-center w-9 h-9 rounded-xl bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        title="Next Page"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
