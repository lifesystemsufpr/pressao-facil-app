import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EvolutionHeader } from '../components/EvolutionHeader';
import { PeriodFilter } from '../components/PeriodFilter';
import { LineChartCard } from '../components/LineChartCard';
import { BarChartCard } from '../components/BarChartCard';
import { SummaryMetricCard } from '../components/SummaryMetricCard';
import { TotalMeasurementsCard } from '../components/TotalMeasurementsCard';
import { useEvolutionStore } from '../store/useEvolutionStore';
import { EvolutionPeriod } from '../types';
import { useEvolutionStats } from '../hooks/useEvolutionStats';

export const EvolutionScreen = () => {
  const activePeriod = useEvolutionStore(state => state.activePeriod);
  const setActivePeriod = useEvolutionStore(state => state.setActivePeriod);

  const { summary: data } = useEvolutionStats(activePeriod);

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
