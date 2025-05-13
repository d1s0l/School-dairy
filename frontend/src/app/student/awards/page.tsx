import { IconTextElement } from "@/components/layout/ui/Header/IconTextElement";
import Profile from "@/components/layout/ui/Header/Profile";
import { AwardIcon, Medal, Scroll, Trophy } from "lucide-react";
import { Awards } from "@/components/layout/ui/Award";

export default function AwardPage() {
    return(
        <div>
            <header className="flex justify-between mb-10">
                <IconTextElement icon={Medal} text="Достижения"/>
                <Profile />
            </header>

            <section className="grid 
            grid-cols-1
            min-[500px]:grid-cols-2
            min-[680px]:grid-cols-3
            min-[700px]:grid-cols-3
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
                <Awards 
                    label="За олимпиаду по физике" 
                    place={1}
                    awardType="medal"
                />

                <Awards 
                    label="За участие в спортивном соревновании" 
                    awardType="cup"
                />

                <Awards 
                    label="За участие в выставке картин" 
                    awardType="certificate"
                />
            </section>
        </div>
    )
}