// Store da feature measurements (estado em memória)
//
// Nesta etapa NÃO há persistência (AsyncStorage/localStorage): a store apenas
// mantém os dados mockados em memória via Zustand. A camada de persistência
// será adicionada numa etapa futura. As Telas consomem esta store — nunca
// tocam armazenamento diretamente.

import { create } from 'zustand';
import type { Medicao } from '../types';
import { MOCK_MEDICOES } from './mock';

interface MedicoesState {
  historico: Medicao[];
  adicionarMedicao: (medicao: Medicao) => void;
  limparHistorico: () => void;
}

export const useMedicoesStore = create<MedicoesState>((set) => ({
  historico: MOCK_MEDICOES,

  // Insere no topo (mais recente primeiro). Estado apenas em memória.
  adicionarMedicao: (medicao) =>
    set((state) => ({ historico: [medicao, ...state.historico] })),

  limparHistorico: () => set({ historico: [] }),
}));
