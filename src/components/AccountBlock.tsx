'use client';

import { Account, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types';

interface AccountBlockProps {
  account: Account;
  onDragStart?: (e: React.DragEvent, account: Account) => void;
  onTouchStart?: (account: Account) => void;
  isDragging?: boolean;
  size?: 'sm' | 'md';
}

export default function AccountBlock({
  account,
  onDragStart,
  onTouchStart,
  isDragging,
  size = 'md',
}: AccountBlockProps) {
  const color = CATEGORY_COLORS[account.category];

  return (
    <div
      draggable={!!onDragStart}
      onDragStart={onDragStart ? (e) => onDragStart(e, account) : undefined}
      onTouchStart={onTouchStart ? () => onTouchStart(account) : undefined}
      className={`
        inline-flex items-center gap-1.5 rounded-lg text-white font-medium
        cursor-grab active:cursor-grabbing select-none
        transition-all duration-150
        ${isDragging ? 'opacity-50 scale-95' : 'hover:shadow-md hover:-translate-y-0.5'}
        ${size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'}
      `}
      style={{ backgroundColor: color }}
    >
      <span className={`opacity-75 ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>
        {CATEGORY_LABELS[account.category]}
      </span>
      <span>{account.name}</span>
    </div>
  );
}
