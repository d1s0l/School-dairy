import Profile from "@/components/layout/ui/Header/Profile"
import { BookCheck } from "lucide-react"
import { LessonCard } from "@/components/layout/ui/Lesson"
import { IconTextElement } from "@/components/layout/ui/Header/IconTextElement"

export default function LessonPage() {
    return(
        <div>
            <header className="flex justify-between mb-10">
                <IconTextElement
                     icon={BookCheck} 
                     text="Предметы"
                />
                <Profile />
            </header>
            <section className="grid 
                grid-cols-1
                min-[500px]:grid-cols-2
                min-[700px]:grid-cols-3
                min-[768px]:grid-cols-2
                min-[900px]:grid-cols-3
                min-[1200px]:grid-cols-4
                min-[1440px]:grid-cols-5
                min-[1600px]:grid-cols-6
                min-[1920px]:grid-rows-7
                min-[2200px]:grid-cols-8
                min-[2500px]:grid-cols-9
                gap-6
                min-[1920px]:gap-4
                justify-items-center
                sm:justify-items-stretch
                max-w-screen-4xl mb-20 min-[1024px]:mb-2"
                >

                <LessonCard 
                    svgName="math"
                    title="Математика"
                    href="/student/lessons/math"
                    size="md"
                />

                <LessonCard 
                    svgName="chemistry"
                    title="Химия"
                    href="/student/lessons/chemistry"
                    size="md"
                />

                <LessonCard 
                    svgName="biology"
                    title="Биология"
                    href="/student/lessons/biology"
                    size="md"
                />

                <LessonCard 
                    svgName="geography"
                    title="География"
                    href="/student/lessons/geography"
                    size="md"
                />

                <LessonCard 
                    svgName="literature"
                    title="Литература"
                    href="/student/lessons/literature"
                    size="md"
                />

                <LessonCard 
                    svgName="rus_lang"
                    title="Русский язык"
                    href="/student/lessons/rus_lang"
                    size="md"
                />

                <LessonCard 
                    svgName="physics"
                    title="Физика"
                    href="/student/lessons/physics"
                    size="md"
                />
                <LessonCard 
                    svgName="painting"
                    title="ИЗО"
                    href="/student/lessons/painting"
                    size="md"
                />
                <LessonCard 
                    svgName="gym"
                    title="Физ-ра"
                    href="/student/lessons/gym"
                    size="md"
                />
            </section>

        </div>
    )
}