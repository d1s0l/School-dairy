"use client";

import { useState, useEffect } from "react";
import Profile from "@/components/layout/ui/Header/Profile";
import { ChevronLeft, ChevronRight, HomeIcon } from "lucide-react";
import { Schedule } from "@/components/layout/ui/Schedules/ScheduleForHomePage";
import { scheduleData } from '@/data/schedule-data'
import { IconTextElement } from "@/components/layout/ui/Header/IconTextElement";
import { AddNoteButton } from "@/components/layout/ui/zametka/AddNoteButton";
import { NoteInput } from "@/components/layout/ui/zametka/NoteInput";
import { NoteItem } from "@/components/layout/ui/zametka/NoteItem";
import { ScoreCircle } from "@/components/layout/ui/diagramms/AvarageScore";
import { PercentageCircle } from "@/components/layout/ui/diagramms/AvarageAttendance"

interface UserData {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  __schoolClass__: {
    id: number;
    className: string;
    academicYear: number;
    school: string;
  };
}

interface Note {
  id: number;
  label: string;
  checked: boolean;
}

const API_BASE_URL = "http://103.88.242.151:3000";

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesError, setNotesError] = useState<string | null>(null);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/1`);
        if (!response.ok) throw new Error('Не удалось загрузить данные пользователя');
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setUserError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Note`);
        if (!response.ok) throw new Error('Не удалось загрузить заметки');
        const data = await response.json();
        setNotes(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setNotesError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
      } finally {
        setNotesLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    if (!newNoteText.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/Note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label: newNoteText,
          checked: false
        }),
      });

      if (!response.ok) throw new Error('Ошибка при добавлении заметки');

      const newNote = await response.json();
      setNotes(prevNotes => [...prevNotes, newNote]);
      setNewNoteText('');
      setIsAdding(false);
    } catch (err) {
      setNotesError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    }
  };

  const toggleNote = async (id: number) => {
    try {
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === id ? { ...note, checked: !note.checked } : note
        )
      );
  
      const response = await fetch(`http://103.88.242.151:3000/Note/${id}/check`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checked: !notes.find(note => note.id === id)?.checked
        }),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка обновления заметки');
      }
  
      const updatedNote = await response.json();
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === id ? updatedNote : note
        )
      );
    } catch (err) {
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === id ? { ...note, checked: !note.checked } : note
        )
      );
      setNotesError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    }
  };

  if (userLoading) {
    return <div className="flex justify-center items-center h-64">Загрузка данных пользователя...</div>;
  }

  if (userError) {
    return <div className="text-red-500 p-4">Ошибка: {userError}</div>;
  }

  if (!userData) {
    return <div className="text-gray-500 p-4">Данные пользователя не найдены</div>;
  }

  return (
    <div>
      <header className="flex justify-between mb-10">
        <IconTextElement icon={HomeIcon} text='Главная'/>
        <Profile />
      </header>

      <section className="flex flex-col lg:flex-row justify-around items-center mb-5 gap-6">
        <img className="hidden lg:block" src="/card.png" alt="График успеваемости" />
        <div className="flex flex-col gap-5 w-full lg:w-2/3">
          <h2 className="text-violet-700 font-semibold text-2xl lg:text-3xl text-center lg:text-left">
            Добрый день, {userData.firstName}!
          </h2>
          <p className="text-neutral-900 font-normal text-lg lg:text-xl text-center lg:text-left">
            Общий уровень успеваемости в текущем месяце выше, чем в декабре. Так держать!
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6 mb-10">
        <article className="bg-stone-50 px-6 py-4 rounded-2xl">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h2 className="font-semibold text-neutral-900 text-2xl">Заметки</h2>
            <AddNoteButton 
              onClick={() => setIsAdding(true)} 
              disabled={notesLoading || isAdding}
            />
          </div>

          {notesError && (
            <div className="text-red-500 mb-4">{notesError}</div>
          )}

          {notesLoading ? (
            <div>Загрузка заметок...</div>
          ) : (
            <>
              {isAdding && (
                <NoteInput
                  value={newNoteText}
                  onChange={setNewNoteText}
                  onAdd={handleAddNote}
                  onCancel={() => setIsAdding(false)}
                />
              )}

              <ul className="space-y-2">
                {notes.map((note) => (
                  <li key={note.id}>
                    <NoteItem
                      id={note.id}
                      label={note.label}
                      checked={note.checked}
                      onToggle={toggleNote}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>

        <article className="flex flex-col items-center justify-between bg-stone-50 px-6 pb-14 pt-4 rounded-2xl h-full min-h-[300px]">
          <h2 className="text-xl text-blue-500">Средний балл</h2>
          <ScoreCircle score={4.25} size={150} />
        </article>

        <article className="flex flex-col items-center justify-between bg-stone-50 px-6 pb-14 pt-4 rounded-2xl h-full min-h-[300px]">
          <h2 className="text-xl text-blue-500">Посещаемость</h2>
          <PercentageCircle percentage={83} size={150} />
        </article>
      </section>
      
      <section className="mb-20 min-[1024px]:mb-2">
        <div className="flex flex-row justify-between mb-4">
          <h2 className="text-2xl text-violet-900 font-semibold">Расписание</h2>
          <nav className="flex flex-row gap-2.5">
            <a href="/student/schedule"
              className="text-base text-violet-500 flex items-center"
            >
              <ChevronLeft /> Показать всё <ChevronRight />
            </a>
          </nav>
        </div>
        <div>
          <Schedule data={scheduleData} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;