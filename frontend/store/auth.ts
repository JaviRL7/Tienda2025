import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { Usuario } from '@/lib/api';

interface AuthState {
  user: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: Usuario) => void;
  logout: () => void;
  updateUser: (user: Usuario) => void;
  checkAuthState: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (token: string, user: Usuario) => {
        console.log('🔍 Auth Store - Login called with:', { token: token?.substring(0, 20) + '...', user });
        Cookies.set('token', token, { expires: 1 });
        set({
          user,
          token,
          isAuthenticated: true,
        });
        console.log('🔍 Auth Store - After login state:', { user, isAuthenticated: true });
      },

      logout: () => {
        Cookies.remove('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (user: Usuario) => {
        set({ user });
      },

      checkAuthState: () => {
        const state = get();
        const cookieToken = Cookies.get('token');

        // Si hay token en cookie pero no en estado, restaurar
        if (cookieToken && !state.token) {
          set({ token: cookieToken });
        }

        // Si no hay token en cookie pero sí en estado, limpiar
        if (!cookieToken && state.token) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);