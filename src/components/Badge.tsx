import React from 'react';
import { clsx } from 'clsx';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-700 text-gray-200',
  success: 'bg-green-900/60 text-green-300',
  warning: 'bg-yellow-900/60 text-yellow-300',
  danger:  'bg-red-900/60 text-red-300',
  info:    'bg-blue-900/60 text-blue-300',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => (
  <span className={clsx(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    variants[variant],
    className
  )}>
    {children}
  </span>
);
