'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';


export default function isLoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('credentials', { email, password });
  };

  return (
        <div className='flex flex-col items-center justify-start min-h-screen py-8 px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center mt-8 sm:mt-12 mb-8 sm:mb-16'>
                <h1 className='font-inter text-2xl sm:text-3xl md:text-4xl text-stone-800 font-bold mb-4 sm:mb-6 text-center'>
                    <span className='block sm:inline'>Электронный </span>
                    <span className='block sm:inline'>дневник</span>
                </h1>
                <div className='font-inter font-semibold text-xl sm:text-2xl text-violet-900 hover:text-violet-700 transition-colors'>
                    Вход
                </div>
            </div>
    
            <div className='font-inter font-semibold w-full max-w-md flex flex-col justify-between items-center gap-y-4 sm:gap-y-7'>
                <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-between gap-y-4 sm:gap-y-5'>
                    <input 
                    className='bg-stone-50 h-12 sm:h-14 rounded-xl sm:rounded-2xl text-stone-600 w-full p-3 sm:p-4 border border-stone-200 focus:border-violet-300 focus:outline-none'
                    type="email" 
                    value={email} 
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    
                    <input 
                    className='bg-stone-50 h-12 sm:h-14 rounded-xl sm:rounded-2xl text-stone-600 w-full p-3 sm:p-4 border border-stone-200 focus:border-violet-300 focus:outline-none'
                    type="password" 
                    placeholder="Пароль"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                    
                    <button 
                    type="submit" 
                    className='bg-violet-900 hover:bg-violet-800 transition-colors cursor-pointer rounded-xl sm:rounded-2xl w-full h-12 sm:h-14 text-stone-50'
                    >
                    Войти
                    </button>
                </form>
    
                <div className='w-full bg-violet-200 rounded-xl sm:rounded-2xl h-0.5 sm:h-1'></div>
    
                <button 
                    type="button" 
                    className='font-inter cursor-pointer font-semibold w-full h-12 sm:h-14 border-2 sm:border-3 border-violet-900 rounded-xl sm:rounded-2xl text-violet-900 hover:bg-violet-50 transition-colors'
                    onClick={() => window.open("https://rutube.ru/video/f3b615db135287a64584737e664e1e4b/", "_blank")}
                    >
                    Войти через ГосУслуги
                </button>
            </div>
        </div>
  )
}