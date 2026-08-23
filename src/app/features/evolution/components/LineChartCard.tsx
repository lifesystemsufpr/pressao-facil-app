import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
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

export const LineChartCard = ({ period }: { period: EvolutionPeriod }) => {
  const chartWidth = Dimensions.get('window').width - 64; 

  const [showSis, setShowSis] = useState(true);
  const [showDia, setShowDia] = useState(true);

  const { dataPoints } = useEvolutionStats(period);

  const handleToggleSis = () => {
    if (showSis && !showDia) return; 
    setShowSis(!showSis);
  };

  const handleToggleDia = () => {
    if (showDia && !showSis) return; 
    setShowDia(!showDia);
  };

  const hasData = dataPoints && dataPoints.length > 0;
  
  const labels = hasData ? dataPoints.map(p => formatLabel(p.dataHora, period)) : [''];
  const sisData = hasData ? dataPoints.map(p => p.sistolica) : [0];
  const diaData = hasData ? dataPoints.map(p => p.diastolica) : [0];

  const datasets = [];

  if (showSis && hasData) {
    datasets.push({
      data: sisData,
      color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`, 
      strokeWidth: 3,
    });
  }

  if (showDia && hasData) {
    datasets.push({
      data: diaData,
      color: (opacity = 1) => `rgba(90, 174, 255, ${opacity})`, 
      strokeWidth: 3,
    });
  }

  // Fallback to avoid crash on empty chart
  if (datasets.length === 0) {
    datasets.push({
      data: [0],
      color: () => 'rgba(0,0,0,0)'
    });
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Pressão Arterial</Text>
          <Text style={styles.subtitle}>Sistólica / Diastólica (mmHg)</Text>
        </View>
        <View style={styles.legendContainer}>
          <TouchableOpacity style={[styles.legendItem, !showSis && styles.legendHidden]} onPress={handleToggleSis} activeOpacity={0.7}>
            <View style={[styles.legendDot, { backgroundColor: '#1976D2' }]} />
            <Text style={styles.legendText}>SIS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.legendItem, !showDia && styles.legendHidden]} onPress={handleToggleDia} activeOpacity={0.7}>
            <View style={[styles.legendDot, { backgroundColor: '#5AAEFF' }]} />
            <Text style={styles.legendText}>DIA</Text>
          </TouchableOpacity>
        </View>
      </View>

      {!hasData ? (
        <View style={[styles.chartContainer, { height: 180, justifyContent: 'center' }]}>
          <Text style={{ color: '#9CA3AF' }}>Nenhuma medição neste período</Text>
        </View>
      ) : (
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: labels,
              datasets: datasets,
            }}
            width={chartWidth}
            height={180}
            withDots={true}
            withInnerLines={true}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={true}
            withShadow={false}
            bezier
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(229, 231, 235, ${opacity})`, // grid color (#E5E7EB)
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`, // #6B7280
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#FFFFFF',
              },
              fillShadowGradientOpacity: 0, // no fill
            }}
            style={styles.chart}
          />
        </View>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
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
  legendContainer: {
    alignItems: 'flex-end',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendHidden: {
    opacity: 0.3,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  chartContainer: {
    alignItems: 'center',
    marginLeft: -16, // compensar o padding interno do LineChart
  },
  chart: {
    borderRadius: 16,
  },
});
