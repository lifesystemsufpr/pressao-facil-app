import { useMemo } from 'react';
import { useAlertsStore } from '../../alerts/store/useAlertsStore';
import { useMedicoesStore } from '../../measurements/store';
import { DashboardSummaryItem } from '../types';

export function useDashboardStats() {
  const alerts = useAlertsStore((state) => state.alerts);
  const historico = useMedicoesStore((state) => state.historico);

  return useMemo(() => {
    // 1. Filtrar e ordenar alertas ativos
    const enabledAlerts = alerts
      .filter((alert) => alert.enabled)
      .sort((a, b) => a.time.localeCompare(b.time));

    // Se não há alertas configurados
    if (enabledAlerts.length === 0) {
      return {
        summary: [] as DashboardSummaryItem[],
        nextMeasurementTime: '--:--',
      };
    }

    // 2. Contar quantas medições foram feitas HOJE
    const hoje = new Date();
    const isMesmoDia = (isoDateString: string) => {
      const d = new Date(isoDateString);
      return (
        d.getDate() === hoje.getDate() &&
        d.getMonth() === hoje.getMonth() &&
        d.getFullYear() === hoje.getFullYear()
      );
    };

    const medicoesHoje = historico.filter((medicao) => isMesmoDia(medicao.dataHora));
    const quantidadeMedicoesHoje = medicoesHoje.length;

    // 3. Construir o Resumo (Summary) baseado na quantidade
    const summary: DashboardSummaryItem[] = enabledAlerts.map((alert, index) => {
      const isConcluido = index < quantidadeMedicoesHoje;
      return {
        id: alert.id,
        label: alert.title,
        status: isConcluido ? 'Concluído' : 'Pendente',
      };
    });

    // 4. Identificar a próxima medição
    // O próximo alerta é o primeiro alerta pendente.
    // Se todos estiverem concluídos, mostramos o primeiro alerta do dia seguinte (o primeiro da lista).
    const nextPendingIndex = summary.findIndex((item) => item.status === 'Pendente');
    const nextMeasurementTime =
      nextPendingIndex !== -1
        ? enabledAlerts[nextPendingIndex].time
        : enabledAlerts[0].time; // todos concluídos, volta pro primeiro do próximo dia

    return {
      summary,
      nextMeasurementTime,
    };
  }, [alerts, historico]);
}
