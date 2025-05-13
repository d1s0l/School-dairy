import { useState } from "react";
import { DaySchedule } from "@/types/schedule-types";

interface HomeworkMissedProps {
  scheduleData: DaySchedule[];
  subjectFilter?: string | string[];
}

export function HomeworkMissed({ 
  scheduleData, 
  subjectFilter = ["Алгебра", "Геометрия"]
}: HomeworkMissedProps) {
  const [activeTab, setActiveTab] = useState<'homework' | 'missed'>('homework');

  const subjectsToFilter = Array.isArray(subjectFilter) 
    ? subjectFilter 
    : [subjectFilter];

  const matchesSubject = (lessonName: string) => {
    return subjectsToFilter.some(subject => 
      lessonName.includes(subject)
    );
  };

  const homeworkItems = scheduleData
    .flatMap(day => 
      day.lessons
        .filter(lesson => 
          lesson.homework && 
          lesson.homework.trim() !== "" &&
          matchesSubject(lesson.name)
        )
        .map(lesson => ({
          date: day.date,
          content: lesson.homework,
          subject: lesson.name.split(". ")[1] || lesson.name
        }))
    )
    .slice(0, 4);

  const missedItems = scheduleData
    .flatMap(day => 
      day.lessons
        .filter(lesson => 
          lesson.topic && 
          lesson.topic.trim() !== "" &&
          matchesSubject(lesson.name)
        )
        .map(lesson => ({
          date: day.date,
          content: lesson.topic,
          subject: lesson.name.split(". ")[1] || lesson.name
        }))
    )
    .slice(0, 3);

  return (
    <section className="bg-stone-50 rounded-2xl w-full px-4 py-2">
      <div className="flex space-x-6 border-b border-gray-200 pb-2 mb-4">
        <button
          className="relative pb-1 group"
          onClick={() => setActiveTab('homework')}
        >
          <span className={`relative z-10 ${activeTab === 'homework' ? 'text-violet-900 font-medium' : 'text-gray-600'}`}>
            Домашние задания
          </span>
          <span className={`
            absolute bottom-0 left-1/2 h-0.5 bg-violet-900 
            transform -translate-x-1/2
            transition-all duration-300 ease-out
            ${activeTab === 'homework' ? 'w-full' : 'w-0 group-hover:w-full'}
          `}></span>
        </button>
        
        <button
          className="relative pb-1 group"
          onClick={() => setActiveTab('missed')}
        >
          <span className={`relative z-10 ${activeTab === 'missed' ? 'text-violet-900 font-medium' : 'text-gray-600'}`}>
            Пропущенные темы
          </span>
          <span className={`
            absolute bottom-0 left-1/2 h-0.5 bg-violet-900 
            transform -translate-x-1/2
            transition-all duration-300 ease-out
            ${activeTab === 'missed' ? 'w-full' : 'w-0 group-hover:w-full'}
          `}></span>
        </button>
      </div>

      <div className="space-y-3">
        {activeTab === 'homework' ? (
          <div className="divide-y divide-gray-200">
            {homeworkItems.map((item, index) => (
              <div key={`hw-${index}`} className="py-2">
                <span className="text-violet-800">
                  <span className="inline-block min-w-[70px] mr-4">{item.date}</span>
                  {item.content}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {missedItems.map((item, index) => (
              <div key={`mt-${index}`} className="py-2">
                <span className="text-violet-800">
                  <span className="inline-block min-w-[70px] mr-4">{item.date}</span>
                  {item.content}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}