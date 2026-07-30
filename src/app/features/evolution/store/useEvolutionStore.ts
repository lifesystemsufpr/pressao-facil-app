import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvolutionStore } from '../types/store';

export const useEvolutionStore = create<EvolutionStore>()(
  persist(
    (set) => ({
      activePeriod: '30 Dias',
      _hasHydrated: false,

      setActivePeriod: (period) => {
        set((state) => ({
          ...state,
          activePeriod: period
        }));
      },

      setHasHydrated: (hasHydrated) => {
        set((state) => ({ ...state, _hasHydrated: hasHydrated }));
      },
    }),
    {
      name: 'pressao-facil-storage-evolution',
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
        return persistedState as EvolutionStore;
      },
    }
  )
);
