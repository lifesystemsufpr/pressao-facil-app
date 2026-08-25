import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
}

interface SessionStore {
  token: string | null;
  user: User | null;
  _hasHydrated: boolean;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      _hasHydrated: false,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'pressao-facil-session',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
