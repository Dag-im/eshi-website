'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthQuery } from '../../lib/api/useAuth';
import { useAuthStore } from '../../stores/auth.store';
import Sidebar from './SideBar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useAuthStore();
  const router = useRouter();
  const { data: user, isLoading, error } = useAuthQuery();

  useEffect(() => {
    if (!isLoading && (error || (user && user.role !== 'admin'))) {
      toast.error('Access denied. Admin privileges required.');
      router.push('/403');
    }
  }, [user, error, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error || user?.role !== 'admin') return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
