import Profile from "@/components/layout/ui/Header/Profile";
import { IconTextElement } from "@/components/layout/ui/Header/IconTextElement";
import { Newspaper } from "lucide-react";

export default function NewsPage(){
    return(
        <div>
            <header className="flex justify-between mb-10">
                <IconTextElement icon={Newspaper} text="Новости" />
                <Profile />
            </header>

            <section className="bg-stone-50 rounded-2xl w-full px-4 py-2 mb-20 min-[1024px]:mb-2">
                <h2 className="text-black font-semibold text-base md:text-lg lg:text-2xl mb-3">Праздничный концерт в честь 9 Мая!</h2>
                <span className="text-sm md:text-base lg:text-lg font-normal text-neutral-900">
                    7 мая в актовом зале школы состоится праздничный концерт, посвящённый Дню Победы. Начало в 14:00.<br />
                    Приглашаем всех учеников, учителей и родителей присоединиться к этому торжественному мероприятию.<br />
                    В программе: песни военных лет, стихи, танцевальные номера и минута молчания в память о героях.<br />
                    Ждём вас для совместного празднования этого великого дня!<br /><br />
                    <em>P.S. После концерта будет организовано чаепитие для ветеранов и гостей.</em>
                </span>
                <img className="rounded-2xl w-full mt-3" src="/NewsPage.jpg" alt="9 мая" />
            </section>
        </div>
    );
}