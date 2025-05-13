"use client";

import { useRef } from "react";
import { BookOpen } from "lucide-react";
import { ScheduleProps, Lesson } from "@/types/schedule-types";
import { scheduleData as defaultScheduleData } from "@/data/schedule-data";

export const Schedule = ({ 
  data = defaultScheduleData,
  visibleLessons = 3 
}: ScheduleProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentDay = data[0];
  const lessonHeight = 120;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
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

  const ScheduleFooter = () => (
    <div className="px-4 py-2 bg-gray-50 text-sm text-gray-500 border-t border-gray-200">
      Показано {Math.min(currentDay.lessons.length, visibleLessons)} из {currentDay.lessons.length} уроков
    </div>
  );

  return (
    <div className="flex flex-col bg-stone-50 rounded-2xl overflow-hidden border border-gray-200">
      <section className="flex justify-center items-center p-4 border-b border-gray-200">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-violet-900">{currentDay.day}</h3>
          <p className="text-base text-neutral-700">{currentDay.date}</p>
        </div>
      </section>

      <div className="flex h-full">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4"
          style={{ height: `${visibleLessons * lessonHeight}px` }}
        >
          <div className="space-y-4">
            {currentDay.lessons.map((lesson, idx) => (
              <LessonCard key={idx} lesson={lesson} />
            ))}
          </div>
        </div>

        <ScrollBar />
      </div>

      <ScheduleFooter />
    </div>
  );
};