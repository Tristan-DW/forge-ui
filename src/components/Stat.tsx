import React from 'react';
import { clsx } from 'clsx';

interface StatProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const Stat: React.FC<StatProps> = ({ label, value, change, trend, className }) => {
  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  }[trend ?? 'neutral'];

  return (
    <div className={clsx('rounded-xl border border-white/10 bg-white/5 p-5', className)}>
      <p className="text-sm font-medium text-gray-400">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-white">{value}</p>
      {change && (
        <p className={clsx('mt-1 text-sm font-medium', trendColor)}>
          {trend === 'up' ? '+' : ''}{change}
        </p>
      )}
    </div>
  );
};
