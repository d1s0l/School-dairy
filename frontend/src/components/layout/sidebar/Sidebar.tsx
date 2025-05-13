'use client'

import { usePathname } from 'next/navigation'
import { HomeIcon, MessageSquareText, Calendar, User2, Newspaper, BookOpen, BookCheck, ChartNoAxesCombined, Award, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Sidebar() {
  const pathname = usePathname()
  const [schoolName, setSchoolName] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch('http://103.88.242.151:3000/users/1')
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные школы')
        }
        const data = await response.json()
        setSchoolName(data.__schoolClass__.school)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка')
        setSchoolName('Название учебного заведения') 
      } finally {
        setLoading(false)
      }
    }

    fetchSchoolData()
  }, [])

  const isActive = (href: string) => pathname === href

  const mobileLinks = [
    { href: '/student/home', icon: HomeIcon, label: 'Главная' },
    { href: '/student/homework', icon: BookOpen, label: 'Домашние задание'},
    { href: '/student/schedule', icon: Calendar, label: 'Расписание' },
    { href: '/student/menu', icon: MenuIcon, label: 'Меню' }
  ]

  return (
    <>
      <aside className='hidden lg:block rounded-r-3xl h-screen sticky top-0 flex-col py-9 text-violet-900 bg-stone-50'>
        <div className='text-lg font-medium px-4 mb-11'>{schoolName}</div>
  
        <section className='mb-5'>
          <Link 
            href='/student/account' 
            className={`flex items-center gap-3 py-4 px-4 ${
              isActive('/student/account') 
                ? 'bg-violet-100 text-violet-900' 
                : 'hover:bg-gray-100'
            }`}
          >
            <User2 size={22} />
            <span className='text-[18px] xl:text-xl font-normal'>Профиль</span>
          </Link>
          <Link 
            href='/student/schedule'
            className={`flex items-center gap-3 py-4 px-4 ${
              isActive('/student/schedule') 
                ? 'bg-violet-100 text-violet-900' 
                : 'hover:bg-gray-100'
            }`}
          >
            <Calendar size={22} />
            <span className='text-[18px] xl:text-xl font-normal'>Расписание</span>
          </Link>
        </section>

        <div className='h-0.5 bg-violet-400 mb-5 '></div>

        <div className=''>
          <Link 
            href='/student/home'
            className={`flex items-center gap-3 py-4 px-4 ${
              isActive('/student/home') 
                ? 'bg-violet-100 text-violet-900' 
                : 'hover:bg-gray-100'
            }`}
          >
            <HomeIcon size={22} />
            <span className='text-[18px] xl:text-xl font-normal'>Главная</span>
          </Link>
          <Link 
            href='/student/news' 
            className={`flex items-center gap-3 py-4 px-4 ${
              isActive('/student/news') 
                ? 'bg-violet-100 text-violet-900' 
                : 'hover:bg-gray-100'
            }`}
          >
            <Newspaper size={22} />
            <span className='text-[18px] xl:text-xl font-normal'>Новости</span>
          </Link>
          
          <Link 
            href='/student/homework' 
            className={`flex items-center gap-3 py-4 px-4 ${
              isActive('/student/homework') 
                ? 'bg-violet-100 text-violet-900' 
                : 'hover:bg-gray-100'
            }`}
          >
            <BookOpen size={22} />
            <span className='text-[18px] xl:text-xl font-normal whitespace-nowrap overflow-hidden'>Домашние задания</span>
          </Link>
          <Link 
            href='/student/lessons' 
            className={`flex items-center gap-3 py-4 px-4 ${
              isActive('/student/lessons') 
                ? 'bg-violet-100 text-violet-900' 
                : 'hover:bg-gray-100'
            }`}
          >
            <BookCheck size={22} />
            <span className='text-[18px] xl:text-xl font-normal'>Предметы</span>
          </Link>
          <Link 
            href='/student/analytics' 
            className={`flex items-center gap-3 py-4 px-4 ${
              isActive('/student/analytics') 
                ? 'bg-violet-100 text-violet-900' 
                : 'hover:bg-gray-100'
            }`}
          >
            <ChartNoAxesCombined size={22} />
            <span className='text-[18px] xl:text-xl font-normal'>Аналитика</span>
          </Link>
          <Link 
            href='/student/awards' 
            className={`flex items-center gap-3 py-4 px-4 ${
              isActive('/student/awards') 
                ? 'bg-violet-100 text-violet-900' 
                : 'hover:bg-gray-100'
            }`}
          >
            <Award size={22} />
            <span className='text-[18px] xl:text-xl font-normal'>Достижения</span>
          </Link>
        </div>
      </aside>

      <div className='lg:hidden fixed bottom-0 left-0 right-0 rounded-t-2xl bg-stone-50 border-t border-gray-200 z-50 shadow-lg'>
        <div className='flex justify-around py-2'>
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center p-2 w-full ${
                isActive(link.href) 
                  ? 'text-violet-900' 
                  : 'text-gray-500'
              }`}
            >
              <link.icon size={20} />
              <span className='text-xs mt-1 text-center'>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className='pb-16 lg:pb-0'></div>
    </>
  )
}