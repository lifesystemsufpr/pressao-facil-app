import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge, MeasurementStatus } from './StatusBadge';

export interface BloodPressureMeasurement {
  id: string;
  dateLabel: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  status: MeasurementStatus;
}

interface BloodPressureCardProps {
  measurement: BloodPressureMeasurement;
}

export const BloodPressureCard = ({ measurement }: BloodPressureCardProps) => {
  const isHigh = measurement.status === 'Alta';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={14} color="#888888" style={styles.icon} />
          <Text style={styles.dateText}>{measurement.dateLabel}</Text>
        </View>
        <StatusBadge status={measurement.status} />
      </View>

      {/* Main Value */}
      <View style={styles.valueContainer}>
        <Text style={[styles.pressureValue, isHigh && styles.pressureValueHigh]}>
          {measurement.systolic} / {measurement.diastolic}
        </Text>
        <Text style={styles.pressureUnit}>mmHg</Text>
      </View>

      {/* Heart Rate */}
      <View style={styles.heartRateContainer}>
        <Ionicons name="heart-outline" size={14} color="#888888" style={styles.icon} />
        <Text style={styles.heartRateText}>{measurement.heartRate} bpm</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    // Sombra suave (opcional mas melhora a estética)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    color: '#888888',
  },
  icon: {
    marginRight: 6,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  pressureValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111111',
  },
  pressureValueHigh: {
    color: '#D93025', // Vermelho para alerta
  },
  pressureUnit: {
    fontSize: 14,
    color: '#555555',
    marginLeft: 4,
    fontWeight: '500',
  },
  heartRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartRateText: {
    fontSize: 13,
    color: '#888888',
  },
});
