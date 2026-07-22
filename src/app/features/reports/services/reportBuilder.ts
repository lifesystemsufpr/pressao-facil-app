// Serviço de agregação do relatório.
//
// Lógica de negócio pura (sem React, sem persistência): recebe as medições
// e um período, devolve os dados agregados prontos para a prévia.
// Por ser puro, é o alvo natural dos testes unitários.

import type { Medicao } from '../../measurements';
import type {
  PeriodoRelatorio,
  RelatorioData,
  ResumoEstatistico,
} from '../types';

/** Quantos dias cada período retrocede a partir da data de referência. */
const DIAS_POR_PERIODO: Record<PeriodoRelatorio, number> = {
  '7dias': 7,
  '30dias': 30,
  '6meses': 182,
  ano: 365,
};

/** Média aritmética arredondada; `null` para lista vazia. */
function media(valores: number[]): number | null {
  if (valores.length === 0) return null;
  const soma = valores.reduce((acc, v) => acc + v, 0);
  return Math.round(soma / valores.length);
}

function resumoVazio(): ResumoEstatistico {
  return {
    mediaSistolica: null,
    mediaDiastolica: null,
    mediaFrequencia: null,
    maxSistolica: null,
    minSistolica: null,
    maxDiastolica: null,
    minDiastolica: null,
  };
}

function calcularResumo(medicoes: Medicao[]): ResumoEstatistico {
  if (medicoes.length === 0) return resumoVazio();

  const sistolicas = medicoes.map((m) => m.sistolica);
  const diastolicas = medicoes.map((m) => m.diastolica);
  const frequencias = medicoes.map((m) => m.frequenciaCardiaca);

  return {
    mediaSistolica: media(sistolicas),
    mediaDiastolica: media(diastolicas),
    mediaFrequencia: media(frequencias),
    maxSistolica: Math.max(...sistolicas),
    minSistolica: Math.min(...sistolicas),
    maxDiastolica: Math.max(...diastolicas),
    minDiastolica: Math.min(...diastolicas),
  };
}

/**
 * Constrói os dados agregados do relatório para um período.
 *
 * @param medicoes  Histórico completo de medições (em qualquer ordem).
 * @param periodo   Janela temporal a considerar.
 * @param referencia Data "fim" do intervalo. Padrão: agora. Injetável para testes.
 */
export function buildRelatorio(
  medicoes: Medicao[],
  periodo: PeriodoRelatorio,
  referencia: Date = new Date()
): RelatorioData {
  const fim = referencia;
  const inicio = new Date(fim);
  inicio.setDate(inicio.getDate() - DIAS_POR_PERIODO[periodo]);

  // Mantém apenas o que cai dentro de [inicio, fim] e ignora datas inválidas.
  const noPeriodo = medicoes.filter((m) => {
    const t = new Date(m.dataHora).getTime();
    if (Number.isNaN(t)) return false;
    return t >= inicio.getTime() && t <= fim.getTime();
  });

  // Ordena da mais recente para a mais antiga.
  const ordenadas = [...noPeriodo].sort(
    (a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
  );

  return {
    periodo,
    intervalo: { inicio: inicio.toISOString(), fim: fim.toISOString() },
    totalMedicoes: ordenadas.length,
    vazio: ordenadas.length === 0,
    resumo: calcularResumo(ordenadas),
    medicoes: ordenadas,
  };
}
