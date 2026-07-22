import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BloodPressureDetailCardProps {
  systolic: number;
  diastolic: number;
}

export const BloodPressureDetailCard = ({ systolic, diastolic }: BloodPressureDetailCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>PRESSÃO ARTERIAL</Text>
      <Text style={styles.value}>
        {systolic} / {diastolic}
      </Text>
      <Text style={styles.unit}>mmHg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24, // um pouco mais de padding vertical para este card central
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 11,
    color: '#6B7280',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 12,
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  unit: {
    fontSize: 14,
    color: '#6B7280',
  },
});
