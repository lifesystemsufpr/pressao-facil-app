import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEvolutionStats } from '../hooks/useEvolutionStats';
import { EvolutionPeriod } from '../types';

function formatLabel(dateString: string, period: EvolutionPeriod): string {
  const d = new Date(dateString);
  const dia = String(d.getDate()).padStart(2, '0');
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const mes = meses[d.getMonth()];
  
  if (period === '7 Dias' || period === '30 Dias') {
    return `${dia}/${String(d.getMonth() + 1).padStart(2, '0')}`;
  }
  return mes;
}

export const BarChartCard = ({ period }: { period: EvolutionPeriod }) => {
  const { dataPoints } = useEvolutionStats(period);

  // Pega no máximo os últimos 10 para não quebrar o layout
  const recentPoints = dataPoints.slice(-10);

  const hasData = recentPoints.length > 0;

  // Calcula o valor máximo para destacar a barra
  let maxValue = -1;
  recentPoints.forEach(p => {
    if (p.frequenciaCardiaca > maxValue) {
      maxValue = p.frequenciaCardiaca;
    }
  });

  const bars = recentPoints.map(p => {
    const isMax = p.frequenciaCardiaca === maxValue && maxValue > 0;
    // Baseamos a altura num máximo teórico de 150 bpm para não estourar o container
    const heightPercent = Math.min((p.frequenciaCardiaca / 150) * 100, 100);
    return {
      value: p.frequenciaCardiaca,
      height: heightPercent,
      color: isMax ? '#015B8C' : '#A9C7D9',
      isMax,
      label: formatLabel(p.dataHora, period)
    };
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Frequência Cardíaca</Text>
        <Text style={styles.subtitle}>Registros (bpm)</Text>
      </View>

      <View style={styles.chartBody}>
        {/* Eixo Y */}
        <View style={styles.yAxis}>
          <Text style={styles.axisText}>150</Text>
          <Text style={styles.axisText}>100</Text>
          <Text style={styles.axisText}>50</Text>
        </View>

        {/* Área do Gráfico */}
        {!hasData ? (
          <View style={[styles.chartArea, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#9CA3AF' }}>Nenhuma medição neste período</Text>
          </View>
        ) : (
          <View style={styles.chartArea}>
            <View style={styles.barsContainer}>
              {bars.map((bar, index) => (
                <View key={index} style={styles.barWrapper}>
                  <Text style={styles.barValue}>{bar.value}</Text>
                  {bar.isMax && <View style={styles.barTopRed} />}
                  <View
                    style={[
                      styles.bar,
                      { height: `${bar.height}%`, backgroundColor: bar.color },
                      bar.isMax ? styles.barMax : null
                    ]}
                  />
                </View>
              ))}
            </View>
            
            {/* Eixo X */}
            <View style={styles.xAxis}>
              {bars.map((bar, index) => (
                <Text key={index} style={[styles.axisText, { fontSize: 8 }]}>{bar.label}</Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  chartBody: {
    flexDirection: 'row',
    height: 150,
    marginTop: 8,
  },
  yAxis: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
    paddingBottom: 24, // Compensa a altura do eixo X
  },
  axisText: {
    fontSize: 10,
    color: '#6B7280',
  },
  chartArea: {
    flex: 1,
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    marginHorizontal: 2,
  },
  barValue: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 2,
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  barMax: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  barTopRed: {
    width: '100%',
    height: 3,
    backgroundColor: '#D32F2F',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: 8,
  },
});
