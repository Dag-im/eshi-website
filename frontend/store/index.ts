import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: null | { id: string; name: string; email: string };
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: AuthState['user']) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
