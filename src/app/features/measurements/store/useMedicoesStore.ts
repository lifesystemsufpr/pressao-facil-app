import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MedicoesStore, Medicao } from '../types';

export const useMedicoesStore = create<MedicoesStore>()(
  persist(
    (set) => ({
      historico: [],
      _hasHydrated: false,

      adicionarMedicao: (medicao: Medicao) => {
        set((state) => ({
          ...state,
          historico: [medicao, ...state.historico], // Add latest to the beginning
        }));
      },

      limparHistorico: () => {
        set((state) => ({
          ...state,
          historico: [],
        }));
      },

      setHasHydrated: (hasHydrated: boolean) => {
        set((state) => ({ ...state, _hasHydrated: hasHydrated }));
      },
    }),
    {
      name: 'pressao-facil-storage-measurements',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Lógica de migração, se necessário
        }
        return persistedState as MedicoesStore;
      },
    }
  )
);
