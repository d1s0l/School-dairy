'use client'

import Link from 'next/link'
import { BookOpen, Calendar, CheckCircle, Lock, School, UserPlus } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <nav className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="text-violet-600 w-8 h-8" />
          <span className="text-2xl font-bold text-violet-600">ШкольныйДневник</span>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/auth/login" 
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white hover:bg-violet-700 rounded-lg transition-colors"
          >
            <Lock className="w-4 h-4" />
            Войти
          </Link>
        </div>
      </nav>

      <section className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Современный электронный дневник <br />
          <span className="text-violet-600">для школы и родителей</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Контролируйте успеваемость, отслеживайте домашние задания и будьте в курсе школьной жизни
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-violet-600 text-white hover:bg-violet-700 rounded-lg text-lg font-medium transition-colors"
          >
            Начать бесплатно
          </Link>
          <Link
            href="#features"
            className="px-6 py-3 border border-violet-600 text-violet-600 hover:bg-violet-50 rounded-lg text-lg font-medium transition-colors"
          >
            Узнать больше
          </Link>
        </div>
      </section>

      <section id="features" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-violet-500 mb-12">Почему выбирают нас</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <BookOpen className="w-10 h-10 text-violet-700" />,
              title: "Удобный дневник",
              description: "Все оценки и задания в одном месте",
              color: 'text-violet-600'
            },
            {
              icon: <Calendar className="w-10 h-10 text-violet-700" />,
              title: "Расписание",
              description: "Четкое расписание уроков и мероприятий"
            },
            /*
            {
              icon: <CheckCircle className="w-10 h-10 text-violet-700" />,
              title: "Автоматизация",
              description: "Уведомления о новых оценках и заданиях"
            },
            
            {
              icon: <School className="w-10 h-10 text-violet-700" />,
              title: "Для учителей",
              description: "Простая система выставления оценок"
            },
            */
            {
              icon: <Lock className="w-10 h-10 text-violet-700" />,
              title: "Безопасность",
              description: "Защита персональных данных"
            },
            {
              icon: <UserPlus className="w-10 h-10 text-violet-700" />,
              title: "Родительский доступ",
              description: "Контроль успеваемости ребенка"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center gap-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-violet-500">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-violet-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы попробовать?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам школ, которые уже используют наш дневник
          </p>
          <div className="flex justify-center">
          
            <Link
              href="/auth/login"
              className="px-6 py-3 border border-white text-white hover:bg-violet-700 rounded-lg text-lg font-medium transition-colors"
            >
              Войти в систему
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} ШкольныйДневник. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}