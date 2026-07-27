// Store da feature measurements (estado em memória - Zustand removido)
//
// A store apenas retorna os dados mockados para que a interface continue
// funcionando sem depender da biblioteca zustand.

import type { Medicao } from '../types';
import { MOCK_MEDICOES } from './mock';

interface MedicoesState {
  historico: Medicao[];
  adicionarMedicao: (medicao: Medicao) => void;
  limparHistorico: () => void;
}

export const useMedicoesStore = (selector?: (state: MedicoesState) => any) => {
  const state: MedicoesState = {
    historico: MOCK_MEDICOES,
    adicionarMedicao: (medicao) => console.log('adicionarMedicao', medicao),
    limparHistorico: () => console.log('limparHistorico'),
  };
  return selector ? selector(state) : state;
};
