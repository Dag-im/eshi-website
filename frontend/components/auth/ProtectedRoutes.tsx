'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../../stores/auth.store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin';
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user && requiredRole === 'admin') {
      router.push('/login');
    } else if (requiredRole && user?.role !== requiredRole) {
      router.push('/403');
    }
  }, [user, requiredRole, router]);

  if (!user && requiredRole === 'admin') {
    return null;
  }
  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
