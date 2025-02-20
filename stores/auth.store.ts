import type { DefaultSession } from 'next-auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface AuthStore {
  user: User | null;
  setUser: (user: User | null | undefined) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null | undefined) => set({ user }),
    }),
    {
      name: 'auth-storage', // Unique name for the storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

export default useAuthStore;
