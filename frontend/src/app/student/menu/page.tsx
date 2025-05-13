'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { IconTextElement } from "@/components/layout/ui/Header/IconTextElement";
import { Award, BookCheck, BookOpen, ChartNoAxesCombined, MenuIcon, Newspaper, User2 } from "lucide-react";

const MobileTabletOnlyPage = () => {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                router.push('/404');
            }
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, [router]);

    if (!isMobile) return null;

    return (
        <div>
            <header className='mb-10'>
                <IconTextElement icon={MenuIcon} text="Меню" />
            </header>
        
            <section className="grid grid-cols-2 min-[330px]:grid-cols-3 gap-y-8">
                <Link
                    href='/student/account' 
                    className="flex flex-col gap-1.5 items-center text-violet-900"
                >
                    <div className='flex justify-center bg-violet-200 hover:bg-violet-300 rounded-2xl p-3'>
                        <User2 size={34} />
                    </div>
                    <span className='text-sm sm:text-base font-normal'>Профиль</span>
                </Link>

                <Link
                    href='/student/news' 
                    className="flex flex-col gap-1.5 items-center text-violet-900"
                >
                    <div className='flex justify-center bg-violet-200 hover:bg-violet-300 rounded-2xl p-3'>
                        <Newspaper size={34} />
                    </div>
                    <span className='text-sm sm:text-base font-normal'>Новости</span>
                </Link>

                <Link
                    href='/student/lessons' 
                    className="flex flex-col gap-1.5 items-center text-violet-900"
                >
                    <div className='flex justify-center bg-violet-200 hover:bg-violet-300 rounded-2xl p-3'>
                        <BookCheck size={34} />
                    </div>
                    <span className='text-sm sm:text-base text-center font-normal'>Предметы</span>
                </Link>

                <Link
                    href='/student/analytics' 
                    className="flex flex-col gap-1.5 items-center text-violet-900"
                >
                    <div className='flex justify-center bg-violet-200 hover:bg-violet-300 rounded-2xl p-3'>
                        <ChartNoAxesCombined size={34} />
                    </div>
                    <span className='text-sm sm:text-base text-center font-normal'>Аналитика</span>
                </Link>

                <Link
                    href='/student/awards' 
                    className="flex flex-col gap-1.5 items-center text-violet-900"
                >
                    <div className='flex justify-center bg-violet-200 hover:bg-violet-300 rounded-2xl p-3'>
                        <Award size={34} />
                    </div>
                    <span className='text-sm sm:text-base text-center font-normal'>Достижения</span>
                </Link>
            </section>
        </div>
    )
}

export default MobileTabletOnlyPage;