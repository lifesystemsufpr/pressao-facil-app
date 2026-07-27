import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const PERIODS = ['7 Dias', '30 Dias', '6 Meses', 'Este Ano'];

interface PeriodFilterProps {
  activePeriod: string;
  onSelectPeriod: (period: string) => void;
}

export const PeriodFilter = ({ activePeriod, onSelectPeriod }: PeriodFilterProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {PERIODS.map((period) => {
          const isActive = activePeriod === period;
          return (
            <TouchableOpacity
              key={period}
              style={[
                styles.chip,
                isActive ? styles.chipActive : styles.chipInactive,
              ]}
              onPress={() => onSelectPeriod(period)}
            >
              <Text style={[styles.text, isActive ? styles.textActive : styles.textInactive]}>
                {period}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    height: 34,
    borderRadius: 18,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: '#5AAEFF',
    borderWidth: 1,
    borderColor: '#5AAEFF',
  },
  chipInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  textActive: {
    color: '#FFFFFF',
  },
  textInactive: {
    color: '#374151',
  },
});
