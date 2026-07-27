import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { EvolutionHeader } from '../components/EvolutionHeader';
import { PeriodFilter } from '../components/PeriodFilter';
import { LineChartCard } from '../components/LineChartCard';
import { BarChartCard } from '../components/BarChartCard';
import { SummaryMetricCard } from '../components/SummaryMetricCard';
import { TotalMeasurementsCard } from '../components/TotalMeasurementsCard';

export const EvolutionScreen = () => {
  const [activePeriod, setActivePeriod] = useState('30 Dias');

  const summaryData = {
    '7 Dias': { max: '135/85', min: '115/75', avgWeek: '122/80', avgMonth: '-', total: 12, subtitleMax: '02 Mai, 14:00', subtitleMin: '06 Mai, 09:15' },
    '30 Dias': { max: '148/92', min: '110/70', avgWeek: '124/82', avgMonth: '128/84', total: 42, subtitleMax: '12 Mai, 08:30', subtitleMin: '05 Mai, 21:15' },
    '6 Meses': { max: '155/95', min: '105/65', avgWeek: '-', avgMonth: '130/85', total: 245, subtitleMax: '10 Fev, 10:00', subtitleMin: '15 Abr, 19:30' },
    'Este Ano': { max: '160/100', min: '105/65', avgWeek: '-', avgMonth: '129/84', total: 310, subtitleMax: '15 Jan, 08:00', subtitleMin: '02 Abr, 22:00' },
  };

  const data = summaryData[activePeriod as keyof typeof summaryData] || summaryData['30 Dias'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <EvolutionHeader />
      <PeriodFilter activePeriod={activePeriod} onSelectPeriod={setActivePeriod} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <LineChartCard period={activePeriod} />
        
        <BarChartCard period={activePeriod} />
        
        <View style={styles.gridRow}>
          <SummaryMetricCard 
            title="Maior Pressão"
            value={data.max}
            subtitle={data.subtitleMax}
            iconName="trending-up"
            iconColor="#D32F2F"
            leftStripeColor="#D32F2F"
          />
          <View style={styles.spacer} />
          <SummaryMetricCard 
            title="Menor Pressão"
            value={data.min}
            subtitle={data.subtitleMin}
            iconName="trending-down"
            iconColor="#1976D2"
            leftStripeColor="#1976D2"
          />
        </View>

        <View style={styles.gridRow}>
          <SummaryMetricCard 
            title="Média Semanal"
            value={data.avgWeek}
            inlineSubtitle="mmHg"
            valueColor="#1976D2"
          />
          <View style={styles.spacer} />
          <SummaryMetricCard 
            title="Média Mensal"
            value={data.avgMonth}
            inlineSubtitle="mmHg"
            valueColor="#1976D2"
          />
        </View>

        <TotalMeasurementsCard total={data.total} period={activePeriod} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 8,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    width: 16,
  },
});
