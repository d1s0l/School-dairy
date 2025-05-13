import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { MainLayout } from '@/components/layout/layout';

export default function StudentAccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      <div className="student-account-layout">
        <main>{children}</main>
      </div>
    </MainLayout>
  );
}