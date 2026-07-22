// Store da feature measurements (Offline-First)
//
// Zustand mantém o histórico de medições em memória e o middleware `persist`
// serializa/reidrata automaticamente no AsyncStorage. As Telas NUNCA tocam o
// AsyncStorage diretamente — apenas consomem esta store.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Medicao } from '../types';
import { SEED_MEDICOES } from './seed';

/** Chave única desta feature no AsyncStorage (ver README — Persistência). */
export const MEDICOES_STORAGE_KEY = 'pressao-facil-storage-medicoes';

interface MedicoesState {
  historico: Medicao[];
  /** `true` depois que o Zustand terminou de ler o disco (evita flicker/redirect precoce). */
  _hasHydrated: boolean;

  adicionarMedicao: (medicao: Medicao) => void;
  removerMedicao: (id: string) => void;
  limparHistorico: () => void;
  /** Popula com dados de exemplo (usado apenas em dev, quando vazio). */
  carregarSeed: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useMedicoesStore = create<MedicoesState>()(
  persist(
    (set) => ({
      historico: [],
      _hasHydrated: false,

      // Insere no topo (mais recente primeiro). O `persist` grava no disco em background.
      adicionarMedicao: (medicao) =>
        set((state) => ({ historico: [medicao, ...state.historico] })),

      removerMedicao: (id) =>
        set((state) => ({ historico: state.historico.filter((m) => m.id !== id) })),

      limparHistorico: () => set({ historico: [] }),

      carregarSeed: () => set({ historico: SEED_MEDICOES }),

      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: MEDICOES_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      // Persistimos apenas os dados; flags de runtime ficam de fora.
      partialize: (state) => ({ historico: state.historico }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        // Em desenvolvimento, se o usuário ainda não tem nenhuma medição,
        // carregamos o seed para facilitar o trabalho na tela de Relatórios.
        if (__DEV__ && state && state.historico.length === 0) {
          state.carregarSeed();
        }
      },
    }
  )
);
