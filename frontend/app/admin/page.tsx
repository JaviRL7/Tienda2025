'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/components/admin/admin-panel';
import { useAuthStore } from '@/store/auth';
import { LoadingPage } from '@/components/ui/loading-spinner';

export default function AdminPage() {
  const { isAuthenticated, user, checkAuthState } = useAuthStore();
  const router = useRouter();

  // Debug logs
  checkAuthState();
  console.log('🔍 Admin Page Debug:', {
    isAuthenticated,
    user,
    userRole: user?.rol,
    userRoleType: typeof user?.rol,
    userRoleLiteral: user?.rol === 'admin',
    userComplete: JSON.stringify(user)
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (user && user.rol !== 'admin') {
      router.push('/');
      return;
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return <LoadingPage />;
  }

  if (user.rol !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground">No tienes permisos para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  return <AdminPanel />;
}