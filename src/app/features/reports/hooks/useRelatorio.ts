// Hook que integra a store de medições com a UI de Relatórios.
//
// Papel de "cola": lê o histórico (mockado, em memória) da store, delega a
// agregação ao serviço puro e expõe para a tela um contrato simples
// { data, loading, erro }.

import { useEffect, useMemo, useState } from 'react';
import { useMedicoesStore } from '../../measurements';
import { buildRelatorio } from '../services';
import type { PeriodoRelatorio, RelatorioData } from '../types';

export interface UseRelatorioResult {
  /** Dados agregados da prévia. `null` enquanto ainda carrega. */
  data: RelatorioData | null;
  /** `true` durante o carregamento inicial (dispara o skeleton). */
  loading: boolean;
  /** Mensagem de erro amigável, ou `null`. */
  erro: string | null;
}

/**
 * @param periodo Período a agregar (padrão: últimos 30 dias).
 */
export function useRelatorio(
  periodo: PeriodoRelatorio = '30dias'
): UseRelatorioResult {
  const historico = useMedicoesStore((s) => s.historico);

  // Dados mockados (sem persistência nesta etapa). Simulamos um breve
  // carregamento para exercitar o estado de "skeleton" exigido pela tela.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return useMemo<UseRelatorioResult>(() => {
    if (loading) {
      return { data: null, loading: true, erro: null };
    }
    try {
      return { data: buildRelatorio(historico, periodo), loading: false, erro: null };
    } catch (e) {
      return {
        data: null,
        loading: false,
        erro: 'Não foi possível montar o relatório. Tente novamente.',
      };
    }
  }, [historico, periodo, loading]);
}
