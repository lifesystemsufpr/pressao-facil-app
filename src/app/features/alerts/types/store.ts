export type PeriodoAlerta = 'morning' | 'afternoon' | 'evening';

export interface AlertaEntity {
  id: string;
  title: string;
  time: string;
  period: PeriodoAlerta;
  enabled: boolean;
}

export interface AlertsState {
  alerts: AlertaEntity[];
  _hasHydrated: boolean;
}

export interface AlertsActions {
  addAlert: (alert: AlertaEntity) => void;
  updateAlert: (id: string, partial: Partial<AlertaEntity>) => void;
  removeAlert: (id: string) => void;
  toggleAlert: (id: string) => void;
  setHasHydrated: (state: boolean) => void;
}

export type AlertsStore = AlertsState & AlertsActions;
