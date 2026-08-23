import { PeriodoRelatorio } from './index';

export interface ReportsState {
  preferredPeriod: PeriodoRelatorio;
  _hasHydrated: boolean;
}

export interface ReportsActions {
  setPreferredPeriod: (period: PeriodoRelatorio) => void;
  setHasHydrated: (state: boolean) => void;
}

export type ReportsStore = ReportsState & ReportsActions;
