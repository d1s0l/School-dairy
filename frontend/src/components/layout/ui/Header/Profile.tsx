'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProfileProps {
  lastname?: string;
  firstname?: string;
  classnumber?: string | number;
}

interface ApiResponse {
  lastName: string;
  firstName: string;
  __schoolClass__: {
    className: string;
  };
}

export default function Profile({
  lastname = 'Фамилия',
  firstname = 'Имя',
  classnumber = '-'
}: ProfileProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://103.88.242.151:3000/users/1');
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных пользователя');
        }
        const data: ApiResponse = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.error('Ошибка загрузки данных:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = () => {
    router.push('/student/account');
  };

  const displayLastName = userData?.lastName || lastname;
  const displayFirstName = userData?.firstName || firstname;
  const displayClass = userData?.__schoolClass__.className || classnumber;

  return (
    <button 
      type="button" 
      className={cn(
        'hidden w-max lg:block px-4 py-1 rounded-4xl font-normal',
        'bg-violet-500 hover:bg-violet-800 transition-colors text-stone-50',
        loading && 'animate-pulse'
      )}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <div className="space-y-1">
          <div className="h-4 w-24 bg-violet-400 rounded animate-pulse"></div>
          <div className="h-3 w-16 bg-violet-400 rounded animate-pulse"></div>
        </div>
      ) : error ? (
        <div className="text-xs text-red-100">Ошибка загрузки</div>
      ) : (
        <>
          <p className='text-sm md:text-sm lg:text-base'>{displayLastName} {displayFirstName}</p>
          <p className='text-xs md:text-xs lg:text-sm'>{displayClass} класс</p>
        </>
      )}
    </button>
  );
}