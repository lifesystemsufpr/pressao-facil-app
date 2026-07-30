import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileStore, UserProfile } from '../types';

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      _hasHydrated: false,

      salvar: (data) => {
        const now = new Date().toISOString();
        const newProfile: UserProfile = {
          ...data,
          version: 1,
          id: `${Date.now()}`,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          ...state,
          profile: newProfile,
        }));
      },

      limpar: () => {
        set((state) => ({
          ...state,
          profile: null,
        }));
      },

      setHasHydrated: (hasHydrated) => {
        set((state) => ({ ...state, _hasHydrated: hasHydrated }));
      },
    }),
    {
      name: 'pressao-facil-storage-profile',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Lógica de migração
        }
        return persistedState as ProfileStore;
      },
    }
  )
);
