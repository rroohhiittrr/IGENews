'use client';

import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex bg-gray-100 dark:bg-white/5 rounded-xl p-0.5 border border-gray-100 dark:border-transparent shrink-0">
      <button
        onClick={() => onChange('grid')}
        className={`p-1.5 rounded-lg cursor-pointer transition-all ${
          view === 'grid'
            ? 'bg-white dark:bg-[#122238] text-[#1E3A5F] dark:text-[#F4A024] shadow-sm'
            : 'text-gray-400 hover:text-gray-600'
        }`}
        title="Grid View"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange('list')}
        className={`p-1.5 rounded-lg cursor-pointer transition-all ${
          view === 'list'
            ? 'bg-white dark:bg-[#122238] text-[#1E3A5F] dark:text-[#F4A024] shadow-sm'
            : 'text-gray-400 hover:text-gray-600'
        }`}
        title="List View"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}
