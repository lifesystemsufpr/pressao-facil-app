// Seed de dados de exemplo para desenvolvimento.
//
// Usado apenas quando o histórico está vazio e o app roda em modo dev (__DEV__).
// Não deve ser usado em produção — serve para exercitar a tela de Relatórios,
// gráficos de evolução e histórico sem precisar cadastrar medições à mão.

import type { Medicao } from '../types';

/**
 * Gera um ISO string a `diasAtras` dias no passado, no horário indicado.
 * Calculado a partir de "agora" para que o seed permaneça sempre dentro dos
 * períodos de relatório (7 dias, 30 dias, etc.) independente da data.
 */
function diasAtras(dias: number, hora = 8, minuto = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  d.setHours(hora, minuto, 0, 0);
  return d.toISOString();
}

/**
 * Histórico fictício, porém plausível: valores em faixa de hipertensão leve
 * controlada, distribuídos ao longo dos últimos ~40 dias e em vários contextos.
 */
export const SEED_MEDICOES: Medicao[] = [
  { id: 'seed-1', sistolica: 128, diastolica: 82, frequenciaCardiaca: 74, dataHora: diasAtras(0, 7, 30), contexto: 'antes_cafe' },
  { id: 'seed-2', sistolica: 135, diastolica: 88, frequenciaCardiaca: 80, dataHora: diasAtras(1, 18, 0), contexto: 'apos_atividade_fisica' },
  { id: 'seed-3', sistolica: 122, diastolica: 79, frequenciaCardiaca: 70, dataHora: diasAtras(2, 8, 0), contexto: 'apos_medicamento' },
  { id: 'seed-4', sistolica: 140, diastolica: 90, frequenciaCardiaca: 85, dataHora: diasAtras(3, 7, 45), contexto: 'antes_cafe' },
  { id: 'seed-5', sistolica: 118, diastolica: 76, frequenciaCardiaca: 68, dataHora: diasAtras(5, 21, 0), contexto: 'apos_medicamento' },
  { id: 'seed-6', sistolica: 131, diastolica: 84, frequenciaCardiaca: 77, dataHora: diasAtras(6, 8, 15), contexto: 'antes_cafe' },
  { id: 'seed-7', sistolica: 126, diastolica: 81, frequenciaCardiaca: 72, dataHora: diasAtras(9, 19, 30), contexto: 'apos_atividade_fisica' },
  { id: 'seed-8', sistolica: 145, diastolica: 92, frequenciaCardiaca: 88, dataHora: diasAtras(12, 7, 0), contexto: 'antes_cafe' },
  { id: 'seed-9', sistolica: 120, diastolica: 78, frequenciaCardiaca: 69, dataHora: diasAtras(18, 8, 30), contexto: 'apos_medicamento' },
  { id: 'seed-10', sistolica: 133, diastolica: 86, frequenciaCardiaca: 79, dataHora: diasAtras(25, 20, 0), contexto: 'apos_atividade_fisica' },
  { id: 'seed-11', sistolica: 124, diastolica: 80, frequenciaCardiaca: 71, dataHora: diasAtras(34, 7, 30), contexto: 'antes_cafe' },
  { id: 'seed-12', sistolica: 138, diastolica: 89, frequenciaCardiaca: 83, dataHora: diasAtras(40, 8, 0), contexto: 'apos_medicamento' },
];
