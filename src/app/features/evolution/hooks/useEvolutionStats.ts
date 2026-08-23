import { useMemo } from 'react';
import type { Medicao } from '../../measurements/types';
import { useMedicoesStore } from '../../measurements/store';
import { EvolutionPeriod, EvolutionSummaryData } from '../types/store';

const DIAS_POR_PERIODO: Record<EvolutionPeriod, number> = {
  '7 Dias': 7,
  '30 Dias': 30,
  '6 Meses': 180,
  'Este Ano': 365,
};

function formatDateShort(dateString: string): string {
  const d = new Date(dateString);
  const dia = String(d.getDate()).padStart(2, '0');
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const mes = meses[d.getMonth()];
  const horas = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${dia} ${mes}, ${horas}:${min}`;
}

export function useEvolutionStats(period: EvolutionPeriod) {
  const historico = useMedicoesStore((s: any) => s.historico) as Medicao[];

  return useMemo(() => {
    const fim = new Date();
    const inicio = new Date();
    inicio.setDate(inicio.getDate() - DIAS_POR_PERIODO[period]);

    // Filtrar medições do período
    const noPeriodo = historico.filter((m) => {
      const t = new Date(m.dataHora).getTime();
      return t >= inicio.getTime() && t <= fim.getTime();
    });

    // Se não houver medições
    if (noPeriodo.length === 0) {
      const empty: EvolutionSummaryData = {
        max: '--/--',
        min: '--/--',
        avgWeek: '--/--',
        avgMonth: '--/--',
        total: 0,
      };
      return { summary: empty, dataPoints: [] };
    }

    let maxSis = -1;
    let maxDia = -1;
    let minSis = 999;
    let minDia = 999;
    
    let maxMedicao: Medicao | null = null;
    let minMedicao: Medicao | null = null;

    let somaSis = 0;
    let somaDia = 0;

    for (const m of noPeriodo) {
      somaSis += m.sistolica;
      somaDia += m.diastolica;

      if (m.sistolica > maxSis) {
        maxSis = m.sistolica;
        maxDia = m.diastolica;
        maxMedicao = m;
      }
      
      if (m.sistolica < minSis) {
        minSis = m.sistolica;
        minDia = m.diastolica;
        minMedicao = m;
      }
    }

    const mediaSis = Math.round(somaSis / noPeriodo.length);
    const mediaDia = Math.round(somaDia / noPeriodo.length);

    // Simplificação: usamos a média do período como avgWeek e avgMonth
    const avg = `${mediaSis}/${mediaDia}`;

    const summary: EvolutionSummaryData = {
      max: `${maxSis}/${maxDia}`,
      min: `${minSis}/${minDia}`,
      avgWeek: avg,
      avgMonth: avg,
      total: noPeriodo.length,
      subtitleMax: maxMedicao ? formatDateShort(maxMedicao.dataHora) : '',
      subtitleMin: minMedicao ? formatDateShort(minMedicao.dataHora) : '',
    };

    // Ordenar do mais antigo para o mais novo para plotar o gráfico
    const dataPoints = [...noPeriodo].sort(
      (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
    );

    return { summary, dataPoints };
  }, [historico, period]);
}
