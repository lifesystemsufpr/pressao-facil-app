import { Medicao } from './index';

export interface MedicoesState {
  historico: Medicao[];
  _hasHydrated: boolean;
}

export interface MedicoesActions {
  adicionarMedicao: (medicao: Medicao) => void;
  limparHistorico: () => void;
  setHasHydrated: (state: boolean) => void;
}

export type MedicoesStore = MedicoesState & MedicoesActions;
