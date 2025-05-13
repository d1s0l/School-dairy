"use client";

import { useState, useRef } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { ScheduleProps, DaySchedule, Lesson } from "@/types/schedule-types";
import { scheduleData as defaultScheduleData } from "@/data/schedule-data";

export const Schedule = ({ 
  data = defaultScheduleData,
  visibleLessons = 3 
}: ScheduleProps) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const currentDay = data[currentDayIndex];
  const lessonHeight = 120;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  };

  const goToNextDay = () => {
    setCurrentDayIndex(prev => Math.min(prev + 1, data.length - 1));
  };

  const goToPrevDay = () => {
    setCurrentDayIndex(prev => Math.max(prev - 1, 0));
  };


  const LessonCard = ({ lesson }: { lesson: Lesson }) => (
    <div className="pb-4 border-b border-gray-200 last:border-0">
      <div className="text-base text-neutral-700 mb-2">{lesson.time}</div>
      <h4 className="text-lg font-medium text-violet-700">{lesson.name}</h4>
      <p className="text-black mt-1">Тема урока: {lesson.topic}</p>
      <div className="mt-2 flex items-center">
        <BookOpen className="w-6 h-6 mr-3 text-violet-800" />
        <span className="text-sm font-medium text-black shrink-0">ДЗ:</span>
        <span className="text-sm text-black ml-2">{lesson.homework}</span>
      </div>
    </div>
  );

  const ScrollBar = () => (
    <div 
      className="w-2 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
      onClick={(e) => {
        if (!scrollRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientY - rect.top) / rect.height;
        const scrollHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
        scrollRef.current.scrollTop = ratio * scrollHeight;
      }}>
    </div>
  );

  

  return (
    <div className="flex flex-col bg-stone-50 rounded-2xl overflow-hidden border ">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <button 
          onClick={goToPrevDay}
          disabled={currentDayIndex === 0}
          className="flex items-center text-violet-700 hover:text-violet-500 disabled:opacity-50"
        >
          <ChevronLeft className="mr-1" />
          <span className="hidden sm:inline">Предыдущий</span>
        </button>
        
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-violet-900">{currentDay.day}</h3>
          <p className="text-base text-neutral-700">{currentDay.date}</p>
        </div>
        
        <button 
          onClick={goToNextDay}
          disabled={currentDayIndex === data.length - 1}
          className="flex items-center text-violet-700 hover:text-violet-500 disabled:opacity-50"
        >
          <span className="hidden sm:inline">Следующий</span>
          <ChevronRight className="ml-1" />
        </button>
      </div>

      <div className="flex h-full">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4"
          >
          <div className="space-y-4">
            {currentDay.lessons.map((lesson, idx) => (
              <LessonCard key={idx} lesson={lesson} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};