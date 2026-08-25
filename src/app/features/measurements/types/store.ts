import { Medicao } from './index';

export interface MedicoesState {
  historico: Medicao[];
  _hasHydrated: boolean;
}

export interface MedicoesActions {
  carregarHistorico: () => Promise<void>;
  adicionarMedicao: (medicao: Medicao) => Promise<void>;
  limparHistorico: () => void;
  setHasHydrated: (state: boolean) => void;
}

export type MedicoesStore = MedicoesState & MedicoesActions;
