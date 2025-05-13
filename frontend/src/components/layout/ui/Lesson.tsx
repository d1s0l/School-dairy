'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LessonCardProps {
  svgName: string;
  title: string;
  href: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  iconClassName?: string;
}

export const LessonCard = ({ 
  svgName, 
  title,
  href,
  size = 'md',
  className = '',
  iconClassName = ''
}: LessonCardProps) => {
  const router = useRouter();

  const cardSize = {
    sm: 'w-40 h-52',
    md: 'w-[216px] h-[282px]',
    lg: 'w-64 h-80'
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link 
      href={href}
      className={`
        flex flex-col items-center 
        ${cardSize[size]} 
        p-4 bg-stone-50 rounded-2xl 
        hover:shadow-lg 
        transition-all duration-300 ease-in-out
        transform hover:scale-105
        cursor-pointer
        ${className}
      `}
      onClick={handleClick}
    >
      <div className={`
        flex items-center justify-center mt-8.5
        mb-6 w-[160px] h-[160px] ${iconClassName}
      `}>
        <Image 
          src={`/${svgName}.svg`} 
          alt={title}
          width={160}
          height={160}
          className="object-contain w-full h-full"
        />
      </div>
      
      <h3 className="text-center text-2xl font-semibold text-neutral-700 line-clamp-2 px-2">
        {title}
      </h3>
    </Link>
  );
};