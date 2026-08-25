// Types da feature measurements
//
// Modelo de Domínio Limpo: interface consumida diretamente pela store (em
// memória, mockada nesta etapa) e pelas telas. Não há DTO nem Mapper.

/**
 * Contexto em que a medição foi realizada.
 * Guardamos o valor "cru" (chave) para estabilidade; os rótulos legíveis
 * ficam em {@link CONTEXTO_LABELS}.
 */
export type ContextoMedicao =
  | 'before_breakfast'
  | 'after_breakfast'
  | 'before_physical_activity'
  | 'after_physical_activity'
  | 'before_medication'
  | 'after_medication'
  | 'rest'
  | 'other'
  | 'emotional_stress';

/** Rótulos legíveis para exibição na UI (público idoso: texto claro e completo). */
export const CONTEXTO_LABELS: Record<ContextoMedicao, string> = {
  before_breakfast: 'Antes do café da manhã',
  after_breakfast: 'Depois do café da manhã',
  before_physical_activity: 'Antes de atividade física',
  after_physical_activity: 'Depois de atividade física',
  before_medication: 'Antes da medicação',
  after_medication: 'Depois da medicação',
  rest: 'Repouso',
  other: 'Outro',
  emotional_stress: 'Estresse emocional / Briga',
};

/** Lista ordenada dos contextos, útil para seletores na UI. */
export const CONTEXTOS_MEDICAO: ContextoMedicao[] = [
  'rest',
  'before_breakfast',
  'after_breakfast',
  'before_medication',
  'after_medication',
  'before_physical_activity',
  'after_physical_activity',
  'emotional_stress',
  'other'
];

/**
 * Uma medição de pressão arterial registrada pelo usuário.
 */
export interface Medicao {
  /** Identificador único (ex.: `Date.now().toString()`). */
  id: string;
  /** Pressão sistólica em mmHg (o valor "maior"). */
  sistolica: number;
  /** Pressão diastólica em mmHg (o valor "menor"). */
  diastolica: number;
  /** Frequência cardíaca em batimentos por minuto (bpm). */
  frequenciaCardiaca: number;
  /** Data e hora da medição em ISO 8601 (ex.: `2026-07-22T08:30:00.000Z`). */
  dataHora: string;
  /** Contexto da medição. */
  contexto?: ContextoMedicao[];
  /** Observações adicionais (opcional). */
  observacao?: string;
}

export * from './store';
