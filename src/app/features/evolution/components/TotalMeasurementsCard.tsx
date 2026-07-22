import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TotalMeasurementsCardProps {
  total: number;
  period: string;
}

export const TotalMeasurementsCard = ({ total, period }: TotalMeasurementsCardProps) => {
  let periodText = 'nos últimos 30 dias';
  if (period === '7 Dias') periodText = 'nos últimos 7 dias';
  if (period === '6 Meses') periodText = 'nos últimos 6 meses';
  if (period === 'Este Ano') periodText = 'neste ano';

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="time" size={24} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.value}>{total} Medições</Text>
        <Text style={styles.subtitle}>Registradas {periodText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});
