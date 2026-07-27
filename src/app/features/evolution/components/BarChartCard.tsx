import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BarChartCard = ({ period }: { period?: string }) => {
  // Dados mockados variando por período
  const mockBars = {
    '7 Dias': [
      { height: 50, value: 60, color: '#A9C7D9' },
      { height: 65, value: 78, color: '#4484A9' },
      { height: 60, value: 72, color: '#A9C7D9' },
      { height: 45, value: 54, color: '#D3DFE8' },
      { height: 85, value: 102, color: '#015B8C', isMax: true },
      { height: 60, value: 72, color: '#A9C7D9' },
      { height: 50, value: 60, color: '#A9C7D9' },
    ],
    '30 Dias': [
      { height: 40, value: 48, color: '#A9C7D9' },
      { height: 50, value: 60, color: '#A9C7D9' },
      { height: 65, value: 78, color: '#4484A9' },
      { height: 35, value: 42, color: '#A9C7D9' },
      { height: 60, value: 72, color: '#A9C7D9' },
      { height: 45, value: 54, color: '#D3DFE8' },
      { height: 85, value: 102, color: '#015B8C', isMax: true },
      { height: 60, value: 72, color: '#A9C7D9' },
      { height: 58, value: 69, color: '#A9C7D9' },
      { height: 50, value: 60, color: '#A9C7D9' },
    ],
    '6 Meses': [
      { height: 50, value: 60, color: '#A9C7D9' },
      { height: 60, value: 72, color: '#A9C7D9' },
      { height: 45, value: 54, color: '#D3DFE8' },
      { height: 85, value: 102, color: '#015B8C', isMax: true },
      { height: 60, value: 72, color: '#A9C7D9' },
      { height: 58, value: 69, color: '#A9C7D9' },
    ],
    'Este Ano': [
      { height: 50, value: 60, color: '#A9C7D9' },
      { height: 65, value: 78, color: '#4484A9' },
      { height: 60, value: 72, color: '#A9C7D9' },
      { height: 85, value: 102, color: '#015B8C', isMax: true },
      { height: 60, value: 72, color: '#A9C7D9' },
    ],
  };

  const bars = mockBars[(period as keyof typeof mockBars)] || mockBars['30 Dias'];

  const labels = {
    '7 Dias': ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    '30 Dias': ['01', '05', '10', '15', '20', '25', '30'],
    '6 Meses': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    'Este Ano': ['Fev', 'Mai', 'Ago', 'Nov', 'Dez']
  }[period || '30 Dias'] || [];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Frequência Cardíaca</Text>
        <Text style={styles.subtitle}>Registros Diários (bpm)</Text>
      </View>

      <View style={styles.chartBody}>
        {/* Eixo Y */}
        <View style={styles.yAxis}>
          <Text style={styles.axisText}>120</Text>
          <Text style={styles.axisText}>80</Text>
          <Text style={styles.axisText}>40</Text>
        </View>

        {/* Área do Gráfico */}
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
            {labels.map((label, index) => (
              <Text key={index} style={styles.axisText}>{label}</Text>
            ))}
          </View>
        </View>
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
    paddingBottom: 24, // Compensa a altura do eixo X para as labels ficarem alinhadas às barras
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
