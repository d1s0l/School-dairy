import Profile from "@/components/layout/ui/Header/Profile";
import { IconTextElement } from "@/components/layout/ui/Header/IconTextElement";
import { BookOpen } from "lucide-react";
import { HomeWork } from "@/components/layout/ui/HW";
import { scheduleData } from "@/data/schedule-data";

export default function HomeWorkPage() {
    const daysToShow = [scheduleData[0], scheduleData[1], scheduleData[2], scheduleData[3], scheduleData[4], scheduleData[5]];

    return(
        <div>
            <header className="flex justify-between mb-10">
                <IconTextElement icon={BookOpen} text="Домашние задания" />
                <Profile />
            </header>

            <section className="flex flex-col gap-10 mb-20 min-[1024px]:mb-2">
                {daysToShow.map((daySchedule, index) => (
                <div key={index} className="h-full">
                    <HomeWork data={[daySchedule]} visibleLessons={3} />
                </div>
                ))}
            </section>
        </div>
        
    );
}