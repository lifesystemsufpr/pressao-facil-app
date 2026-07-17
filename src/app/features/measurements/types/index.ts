export type StatusPressao = 'normal' | 'elevada' | 'alta';
export interface Medicao {
  id: string;
  sistolica: number;
  diastolica: number;
  data: Date;
  status: StatusPressao;
}
