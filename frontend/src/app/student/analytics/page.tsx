'use client'
import { ChevronLeft, ChevronRight, ChartNoAxesCombined } from 'lucide-react'
import { IconTextElement } from '@/components/layout/ui/Header/IconTextElement'
import Profile from '@/components/layout/ui/Header/Profile'
import { PercentageCircle } from "@/components/layout/ui/diagramms/AvarageAttendance"
import { useState } from 'react'

export default function GradeTable() {
  const [activeTab, setActiveTab] = useState<'current' | 'final'>('current')
  const [currentWeek, setCurrentWeek] = useState(new Date())

  const subjects = [
    'Литература',
    'Математика',
    'Русский язык',
    'Английский язык',
    'Биология',
    'Химия',
    'ИЗО',
    'Физкультура'
  ]

  const getRandomGrade = () => {
    return Math.random() > 0.3 ? 5 : 4;
  }

  const finalGrades = subjects.map(subject => ({
    subject,
    quarters: [1, 2, 3, 4].map(() => getRandomGrade()),
    annual: Math.random() > 0.7 ? 5 : 4
  }))

  const getWeekDates = () => {
    const start = new Date(currentWeek)
    start.setDate(start.getDate() - start.getDay() + 1) 
    
    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date(start)
      date.setDate(date.getDate() + i)
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
    })
  }

  const weekDates = getWeekDates()

  return (
    <div>
      <header className="flex justify-between mb-10">
        <IconTextElement icon={ChartNoAxesCombined} text="Аналитика" />
        <Profile />
      </header>

      <h3 className='text-violet-900 font-semibold text-2xl mb-8 px-6'>Успеваемость</h3>

      <section className="bg-stone-50 p-3 rounded-2xl mb-15">
        <div className="flex justify-center items-center flex-wrap mb-3 gap-2 pb-3 min-[437px]:justify-between">
          <div className="flex justify-between space-x-8 px-3 min-[437px]:justify-between">
            <button
              className="relative pb-1 group cursor-pointer"
              onClick={() => setActiveTab('current')}
            >
              <span className={`relative z-10 text-center ${activeTab === 'current' ? 'text-violet-900 font-medium' : 'text-gray-600'}`}>
                Текущие
              </span>
              <span className={`
                absolute bottom-0 left-1/2 h-0.5 bg-violet-900 
                transform -translate-x-1/2
                transition-all duration-300 ease-out
                ${activeTab === 'current' ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            </button>
            <button
              className="relative pb-1 group cursor-pointer"
              onClick={() => setActiveTab('final')}>
              <span className={`relative z-10 ${activeTab === 'final' ? 'text-violet-900 font-medium' : 'text-gray-600'}`}>
                Итоговые
              </span>
              <span className={`
                absolute bottom-0 left-1/2 h-0.5 bg-violet-900 
                transform -translate-x-1/2
                transition-all duration-300 ease-out
                ${activeTab === 'final' ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            </button>
          </div>
          
          <div className={`flex items-center space-x-2 transition-opacity duration-300 ${activeTab === 'current' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button 
              onClick={() => {
                const prevWeek = new Date(currentWeek)
                prevWeek.setDate(prevWeek.getDate() - 7)
                setCurrentWeek(prevWeek)
              }}
              className="p-1 rounded-full hover:bg-stone-200 text-violet-900 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="font-medium text-violet-900 text-center">
              {currentWeek.toLocaleDateString('ru-RU', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
            <button 
              onClick={() => {
                const nextWeek = new Date(currentWeek)
                nextWeek.setDate(nextWeek.getDate() + 7)
                setCurrentWeek(nextWeek)
              }}
              className="p-1 text-violet-900 rounded-full hover:bg-stone-200 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-violet-400">
                <th className="text-left pb-3 pt-1 px-4 font-semibold text-violet-900">Предметы</th>
                
                {activeTab === 'final' ? (
                  <>
                    <th className="pb-3 pt-1 px-4 font-semibold text-violet-900">I ч</th>
                    <th className="pb-3 pt-1 px-4 font-semibold text-violet-900">II ч</th>
                    <th className="pb-3 pt-1 px-4 font-semibold text-violet-900">III ч</th>
                    <th className="pb-3 pt-1 px-4 font-semibold text-violet-900">IV ч</th>
                    <th className="pb-3 pt-1 px-4 font-semibold text-violet-900">За год</th>
                  </>
                ) : (
                  <>
                    {weekDates.map((date, i) => (
                      <th key={i} className="pb-3 pt-1 px-4 font-semibold text-violet-900">{date}</th>
                    ))}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === 'final' ? (
                finalGrades.map((subjectData) => (
                  <tr 
                    key={subjectData.subject} 
                    className="bg-stone-50 border-b border-violet-400 text-violet-700"
                  >
                    <td className="py-3 px-4 font-medium border-r border-violet-400 text-violet-700">
                      {subjectData.subject}
                    </td>
                    {subjectData.quarters.map((grade, i) => (
                      <td key={i} className="py-3 px-4 text-center font-medium text-violet-700">
                        {grade}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-center font-bold text-violet-900">
                      {subjectData.annual}
                    </td>
                  </tr>
                ))
              ) : (
                subjects.map((subject, rowIndex) => (
                  <tr 
                    key={subject} 
                    className="bg-stone-50 border-b border-violet-400 text-violet-700"
                  >
                    <td className="py-3 px-4 font-medium border-r border-violet-400 text-violet-700">{subject}</td>
                    {weekDates.map((_, i) => (
                      <td key={i} className="py-3 px-4 text-center text-violet-700">-</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <h3 className='text-violet-900 font-semibold text-2xl mb-8 px-6'>
        Посещаемость
      </h3>

      <section className='rounded-2xl mb-20 bg-stone-50 flex justify-between p-3 min-[1024px]:mb-2'>
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-violet-900 border-b-2 border-violet-400">
                <th className="text-left pb-3 pt-1 px-4 font-semibold">Предмет/Пропущено дней</th>
                <th className="pb-3 pt-1 px-4 font-semibold">Без причины</th>
                <th className="pb-3 pt-1 px-4 font-semibold">По болезни</th>
                <th className="pb-3 pt-1 px-4 font-semibold">Всего</th>
              </tr>
            </thead>

            <tbody> 
              {[
                { subject: 'Литература', noReason: 2, illness: 1 },
                { subject: 'Математика', noReason: 1, illness: 0 },
                { subject: 'Русский язык', noReason: 0, illness: 3 },
                { subject: 'Английский язык', noReason: 1, illness: 1 },
                { subject: 'Биология', noReason: 0, illness: 2 },
                { subject: 'Химия', noReason: 1, illness: 0 },
                { subject: 'ИЗО', noReason: 0, illness: 0 },
                { subject: 'Физкультура', noReason: 3, illness: 1 },
              ].map((item, index) => (
                <tr 
                  key={item.subject} 
                  className="bg-stone-50 border-b border-violet-400 text-violet-700"
                >
                  <td className="py-3 px-4 border-r border-violet-400 font-medium">{item.subject}</td>
                  <td className="py-3 px-4 border-r border-violet-400 text-center">{item.noReason}</td>
                  <td className="py-3 px-4 border-r border-violet-400 text-center">{item.illness}</td>
                  <td className="py-3 px-4 text-center font-medium">
                    {item.noReason + item.illness}
                  </td>
                </tr>
              ))}
              
              <tr className="bg-stone-50 border-t border-violet-400">
                <td className="py-3 px-4 font-bold border-r border-violet-400 text-violet-700">Всего пропущено</td>
                <td className="py-3 px-4 text-center font-bold border-r border-violet-400 text-violet-700">
                  {[2, 1, 0, 1, 0, 1, 0, 3].reduce((a, b) => a + b, 0)}
                </td>
                <td className="py-3 px-4 text-center font-bold border-r border-violet-400 text-violet-700">
                  {[1, 0, 3, 1, 2, 0, 0, 1].reduce((a, b) => a + b, 0)}
                </td>
                <td className="py-3 px-4 text-center font-bold text-violet-800">
                  {[2, 1, 0, 1, 0, 1, 0, 3].reduce((a, b) => a + b, 0) + 
                  [1, 0, 3, 1, 2, 0, 0, 1].reduce((a, b) => a + b, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}