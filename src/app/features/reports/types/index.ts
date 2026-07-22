// Types da feature reports

import type { Medicao } from '../../measurements';

/** Períodos de agregação suportados pelo relatório (alinhados à feature Evolução). */
export type PeriodoRelatorio = '7dias' | '30dias' | '6meses' | 'ano';

/** Rótulos legíveis dos períodos para exibição na UI. */
export const PERIODO_LABELS: Record<PeriodoRelatorio, string> = {
  '7dias': 'Últimos 7 dias',
  '30dias': 'Últimos 30 dias',
  '6meses': 'Últimos 6 meses',
  ano: 'Último ano',
};

/** Intervalo fechado de datas considerado no relatório (ISO 8601). */
export interface IntervaloRelatorio {
  inicio: string;
  fim: string;
}

/** Estatísticas resumidas de um conjunto de medições. */
export interface ResumoEstatistico {
  /** Média arredondada (mmHg / bpm). É `null` quando não há medições. */
  mediaSistolica: number | null;
  mediaDiastolica: number | null;
  mediaFrequencia: number | null;
  /** Extremos observados no período. `null` quando não há medições. */
  maxSistolica: number | null;
  minSistolica: number | null;
  maxDiastolica: number | null;
  minDiastolica: number | null;
}

/**
 * Dados agregados prontos para a prévia do relatório.
 * É o contrato entre o `reportBuilder` (serviço) e a `ReportsScreen` (UI).
 */
export interface RelatorioData {
  periodo: PeriodoRelatorio;
  intervalo: IntervaloRelatorio;
  /** Quantidade de medições dentro do período. */
  totalMedicoes: number;
  /** `true` quando não há nenhuma medição no período (dispara o estado "sem dados"). */
  vazio: boolean;
  resumo: ResumoEstatistico;
  /** Medições do período, ordenadas da mais recente para a mais antiga. */
  medicoes: Medicao[];
}
