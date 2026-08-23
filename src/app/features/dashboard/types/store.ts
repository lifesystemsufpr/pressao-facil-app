export interface DashboardSummaryItem {
  id: string;
  label: string;
  status: 'Pendente' | 'Concluído';
}

export interface DashboardState {
  chartValues: number[];
  nextMeasurementTime: string | null;
  summary: DashboardSummaryItem[];
  _hasHydrated: boolean;
}

export interface DashboardActions {
  setChartValues: (values: number[]) => void;
  setNextMeasurementTime: (time: string | null) => void;
  updateSummaryItem: (id: string, status: 'Pendente' | 'Concluído') => void;
  setHasHydrated: (state: boolean) => void;
}

export type DashboardStore = DashboardState & DashboardActions;
