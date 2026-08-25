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

    // 3. Parear medições com alertas (cada medição conclui no máximo 1 alerta)
    const matchedMeasurements = new Set<string>();

    const summary: DashboardSummaryItem[] = enabledAlerts.map((alert) => {
      const [alertHour, alertMin] = alert.time.split(':').map(Number);
      const alertTotalMins = alertHour * 60 + alertMin;

      let closestMeasurementId: string | null = null;
      let minDiff = 120; // limite de 2 horas (120 minutos)

      for (const m of medicoesHoje) {
        if (matchedMeasurements.has(m.id)) continue;

        const mDate = new Date(m.dataHora);
        const mTotalMins = mDate.getHours() * 60 + mDate.getMinutes();
        const diff = Math.abs(mTotalMins - alertTotalMins);

        if (diff <= minDiff) {
          minDiff = diff;
          closestMeasurementId = m.id;
        }
      }

      if (closestMeasurementId) {
        matchedMeasurements.add(closestMeasurementId);
      }

      return {
        id: alert.id,
        label: alert.title,
        status: closestMeasurementId ? 'Concluído' : 'Pendente',
      };
    });

    // 4. Identificar a próxima medição
    // O próximo alerta ideal é o primeiro pendente que seja >= agora.
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    let nextPendingIndex = enabledAlerts.findIndex((alert, index) => {
      if (summary[index].status === 'Concluído') return false;
      const [h, m] = alert.time.split(':').map(Number);
      return (h * 60 + m) >= currentMins;
    });

    // Se todos os alertas pendentes já passaram (atrasados), pega o primeiro deles
    if (nextPendingIndex === -1) {
      nextPendingIndex = summary.findIndex((item) => item.status === 'Pendente');
    }

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
