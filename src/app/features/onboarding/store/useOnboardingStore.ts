import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingStore, CompleteProfileData, OnboardingEntity } from '../types';

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      profile: null,
      _hasHydrated: false,

      salvar: (data: CompleteProfileData) => {
        const now = new Date().toISOString();
        const newProfile: OnboardingEntity = {
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

      setHasHydrated: (hasHydrated: boolean) => {
        set((state) => ({ ...state, _hasHydrated: hasHydrated }));
      },
    }),
    {
      name: 'pressao-facil-storage-onboarding',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Adicione a lógica de migração aqui, se necessário.
        }
        return persistedState as OnboardingStore;
      },
    }
  )
);
