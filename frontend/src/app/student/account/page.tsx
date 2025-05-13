'use client'

import React, { useState, useEffect } from 'react';
import { User2 } from 'lucide-react'
import { DataField } from '@/components/layout/ui/DataField';

interface UserProfile {
    lastName: string;
    firstName: string;
    middleName: string;
    birthYear: string;
    clasName: string;
}

interface ApiUserData {
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
    };
}

const AccountPage: React.FC = () => {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://103.88.242.151:3000/users/1');
                
                if (!response.ok) {
                    throw new Error('Не удалось загрузить данные пользователя');
                }
                
                const apiData: ApiUserData = await response.json();
                
                const formattedData: UserProfile = {
                    lastName: apiData.lastName,
                    firstName: apiData.firstName,
                    middleName: apiData.middleName,
                    birthYear: new Date(apiData.dateOfBirth).toLocaleDateString('ru-RU'),
                    clasName: apiData.__schoolClass__.className
                };
                
                setUserData(formattedData);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-64">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">Ошибка: {error}</div>;
    }

    if (!userData) {
        return <div className="text-gray-500 p-4">Данные пользователя не найдены</div>;
    }

    return (
        <div>
            <header className='flex flex-row items-center px-4 gap-4 w-screen-min h-16 text-violet-900 bg-stone-50 rounded-2xl mb-10'>
                <User2 size={32}/>
                <span className='font-semibold text-2xl'>Профиль</span>
            </header>

            <div>
                <p className='text-3xl font-semibold text-violet-900 mb-4'>Персональные данные</p>

                <div className='flex flex-col gap-4 md:flex-row'>
                    <ul className='flex-1 flex flex-col gap-2'>
                        <DataField label='Фамилия' value={userData.lastName} />
                        <DataField label="Имя" value={userData.firstName} />
                        <DataField label="Отчество" value={userData.middleName} />
                    </ul>
                
                    <ul className='flex-1 flex flex-col gap-2'>
                        <DataField label="День рождения" value={userData.birthYear} />
                        <DataField label='Класс' value={userData.clasName} />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;