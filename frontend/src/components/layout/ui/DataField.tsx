'use client';

import { cn } from '@/lib/utils';

interface DataFieldProps {
    label: string;
    value: string | number;
    className?: string;
    labelClassName?: string;
    valueClassName?: string;
  }
  
  export const DataField = ({
    label,
    value,
    className,
    labelClassName,
    valueClassName
  }: DataFieldProps) => {
    return (
      <div className={cn('flex flex-col gap-0.5 sm:gap-1 md:gap-2', className)}>
        <p className={cn('font-medium text-violet-950', labelClassName)}>
          {label}
        </p>
        <div className={cn(
          'flex items-center px-4 text-xl font-normal text-stone-900 h-12 bg-stone-50 rounded-xl',
          valueClassName
        )}>
          {value}
        </div>
      </div>
    );
  };