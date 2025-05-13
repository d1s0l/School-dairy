'use client'

import Profile from "@/components/layout/ui/Header/Profile"
import { IconTextElement } from "@/components/layout/ui/Header/IconTextElement"
import { BookCheck } from "lucide-react"
import { useState } from "react"
import { HomeworkMissed } from "@/components/layout/ui/HomeworkMissed"
import { scheduleData } from "@/data/schedule-data"

export default function MathPage() {
    const [activeTab, setActiveTab] = useState('homework')

    return (
        <div>
            <header className="flex justify-between mb-4">
                <IconTextElement
                    icon={BookCheck} 
                    text="Предметы"
                />
                <Profile />
            </header>

            <h3 className="text-violet-900 text-2xl font-semibold p-4 mb-4">Русский язык</h3>

            <HomeworkMissed 
                scheduleData={scheduleData} 
                subjectFilter="Русский язык" 
            />
        </div>
    )
}