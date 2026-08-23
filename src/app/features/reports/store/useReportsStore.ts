import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReportsStore } from '../types/store';

export const useReportsStore = create<ReportsStore>()(
  persist(
    (set) => ({
      preferredPeriod: '30dias',
      _hasHydrated: false,

      setPreferredPeriod: (period) => {
        set((state) => ({
          ...state,
          preferredPeriod: period,
        }));
      },

      setHasHydrated: (hasHydrated) => {
        set((state) => ({ ...state, _hasHydrated: hasHydrated }));
      },
    }),
    {
      name: 'pressao-facil-storage-reports',
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
        return persistedState as ReportsStore;
      },
    }
  )
);
