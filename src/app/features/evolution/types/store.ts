export type EvolutionPeriod = '7 Dias' | '30 Dias' | '6 Meses' | 'Este Ano';

export interface EvolutionSummaryData {
  max: string;
  min: string;
  avgWeek: string;
  avgMonth: string;
  total: number;
  subtitleMax?: string;
  subtitleMin?: string;
}

export interface EvolutionState {
  activePeriod: EvolutionPeriod;
  _hasHydrated: boolean;
}

export interface EvolutionActions {
  setActivePeriod: (period: EvolutionPeriod) => void;
  setHasHydrated: (state: boolean) => void;
}

export type EvolutionStore = EvolutionState & EvolutionActions;
