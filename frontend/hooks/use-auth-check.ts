import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

export function useAuthCheck() {
  const checkAuthState = useAuthStore((state) => state.checkAuthState);

  useEffect(() => {
    // Solo verificar una vez al montar
    checkAuthState();
  }, []); // Dependencias vacías para ejecutar solo una vez
}