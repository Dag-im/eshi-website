import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/auth';

interface AuthState {
  user: User | null;
  isSidebarOpen: boolean;
  darkMode: boolean;
  setUser: (user: AuthState['user']) => void;
  clearUser: () => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isSidebarOpen: false,
      darkMode: false,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
);
