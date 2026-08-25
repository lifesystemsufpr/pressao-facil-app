import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MedicoesStore, Medicao } from '../types';

export const useMedicoesStore = create<MedicoesStore>()(
  persist(
    (set) => ({
      historico: [],
      _hasHydrated: false,

      carregarHistorico: async () => {
        try {
          const { api } = await import('../../../shared/services/api');
          const response = await api.get('/measurements');
          const medicoes: Medicao[] = response.data.map((m: any) => ({
            id: m.id,
            sistolica: m.systolic,
            diastolica: m.diastolic,
            frequenciaCardiaca: m.heartRate || 0,
            dataHora: m.measuredAt,
            contexto: m.contexts?.map((c: any) => c.contextId) || [],
            observacao: m.notes || '',
          }));
          set((state) => ({ ...state, historico: medicoes }));
        } catch (error) {
          console.log('Failed to fetch measurements', error);
        }
      },

      adicionarMedicao: async (medicao: Medicao) => {
        try {
          const { api } = await import('../../../shared/services/api');
          const response = await api.post('/measurements', {
            systolic: medicao.sistolica,
            diastolic: medicao.diastolica,
            heartRate: medicao.frequenciaCardiaca,
            measuredAt: medicao.dataHora,
            notes: medicao.observacao,
            contextIds: medicao.contexto || [],
          });
          
          const savedMedicao = { ...medicao, id: response.data.id };

          set((state) => ({
            ...state,
            historico: [savedMedicao, ...state.historico],
          }));
          
          return response.data.id;
        } catch (error) {
          console.log('Failed to save measurement', error);
          throw error;
        }
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
