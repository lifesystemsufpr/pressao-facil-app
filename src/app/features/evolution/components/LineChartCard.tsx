import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export const LineChartCard = ({ period }: { period?: string }) => {
  const chartWidth = Dimensions.get('window').width - 64; 

  const [showSis, setShowSis] = useState(true);
  const [showDia, setShowDia] = useState(true);

  const handleToggleSis = () => {
    if (showSis && !showDia) return; 
    setShowSis(!showSis);
  };

  const handleToggleDia = () => {
    if (showDia && !showSis) return; 
    setShowDia(!showDia);
  };

  const datasets = [];

  // Dados mockados variando pelo período
  const mockData = {
    '7 Dias': { sis: [122, 125, 120, 118, 124, 126, 122], dia: [82, 84, 80, 78, 83, 85, 82], labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
    '30 Dias': { sis: [120, 118, 122, 119, 121, 117, 120], dia: [80, 78, 81, 79, 82, 77, 80], labels: ['01', '05', '10', '15', '20', '25', '30'] },
    '6 Meses': { sis: [130, 128, 125, 122, 120, 121], dia: [85, 83, 82, 80, 78, 79], labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] },
    'Este Ano': { sis: [128, 125, 130, 122, 120, 124, 121], dia: [84, 82, 85, 80, 78, 81, 80], labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'] },
  };

  const currentData = mockData[(period as keyof typeof mockData)] || mockData['30 Dias'];

  if (showSis) {
    datasets.push({
      data: currentData.sis,
      color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`, 
      strokeWidth: 3,
    });
  }

  if (showDia) {
    datasets.push({
      data: currentData.dia,
      color: (opacity = 1) => `rgba(90, 174, 255, ${opacity})`, 
      strokeWidth: 3,
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

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: currentData.labels,
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
