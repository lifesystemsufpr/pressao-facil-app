import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DashboardStore } from '../types';

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      chartValues: [0, 0, 0, 0, 0, 0, 0],
      nextMeasurementTime: '--:--',
      summary: [
        { id: '1', label: 'Medição da manhã', status: 'Pendente' },
        { id: '2', label: 'Medição da tarde', status: 'Pendente' }
      ],
      _hasHydrated: false,

      setChartValues: (values) => {
        set((state) => ({ ...state, chartValues: values }));
      },

      setNextMeasurementTime: (time) => {
        set((state) => ({ ...state, nextMeasurementTime: time }));
      },

      updateSummaryItem: (id, status) => {
        set((state) => ({
          ...state,
          summary: state.summary.map(item => 
            item.id === id ? { ...item, status } : item
          )
        }));
      },

      setHasHydrated: (hasHydrated) => {
        set((state) => ({ ...state, _hasHydrated: hasHydrated }));
      },
    }),
    {
      name: 'pressao-facil-storage-dashboard',
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
        return persistedState as DashboardStore;
      },
    }
  )
);
