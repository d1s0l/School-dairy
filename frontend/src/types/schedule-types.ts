export interface Lesson {
    time: string;
    name: string;
    topic: string;
    homework: string;
  }
  
  export interface DaySchedule {
    day: string;
    date: string;
    lessons: Lesson[];
  }
  
  export interface ScheduleProps {
    data?: DaySchedule[];
    visibleLessons?: number;
  }