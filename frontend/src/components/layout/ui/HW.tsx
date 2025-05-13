'use client'

import { useRef } from "react";
import { ScheduleProps, Lesson } from "@/types/schedule-types";
import { scheduleData as defaultScheduleData } from "@/data/schedule-data";
import { BookOpen } from "lucide-react";


export const HomeWork = ({ 
    data = defaultScheduleData,
    visibleLessons = 3 
  }: ScheduleProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const currentDay = data[0];
    const lessonHeight = 120;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    };

    const LessonCard = ({ lesson }: { lesson: Lesson }) => (
        <div className="flex flex-col md:flex-row justify-between pb-4 border-b border-gray-200 last:border-0 gap-3">
            <section className="md:w-1/3 min-w-[120px] pr-0 md:pr-4">
                <div className="text-base text-neutral-900 mb-1">{lesson.time}</div>
                <h4 className="text-lg font-medium text-violet-900 line-clamp-2">{lesson.name}</h4>
            </section>

            <section className="flex-1 min-w-0">
                <div className="mt-0 md:mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                    <div className="flex items-center">
                        <BookOpen className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-violet-800 shrink-0" />
                        <span className="text-sm text-violet-900 line-clamp-2">{lesson.homework}</span>
                    </div>
                </div>
                <p className="text-violet-900 mt-1 text-sm md:text-base line-clamp-2">
                    Тема урока: {lesson.topic}
                </p>
            </section>
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

      return(
        <div className="flex flex-col bg-stone-50 rounded-2xl overflow-hidden border border-gray-200">
            <section className="flex items-center bg-gradient-to-tr from-purple-400 to-stone-50 w-full h-12 md:h-14 px-4 md:px-6 text-violet-700 text-xl md:text-2xl font-semibold">
                <h3 className="truncate">{currentDay.day}, {currentDay.date}</h3>
            </section>
            
            <div className="flex h-full">
                <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-3 md:p-4"
                style={{ height: `${visibleLessons * lessonHeight}px` }}
                >
                    <div className="space-y-3 md:space-y-4">
                        {currentDay.lessons.map((lesson, idx) => (
                            <LessonCard key={idx} lesson={lesson} />
                        ))}
                    </div>
                </div>

                <ScrollBar />
            </div>
        </div>
      )
 }