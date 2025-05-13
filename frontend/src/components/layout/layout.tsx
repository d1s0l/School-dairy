'use client';

import { Sidebar } from './sidebar/Sidebar'

export function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex">
      <aside>
        <Sidebar />
      </aside>

      <section className="w-full px-4 py-4 lg:py-7.5 lg:pr-8 lg:pl-4">
        {children}
      </section>
    </main>
  )
}