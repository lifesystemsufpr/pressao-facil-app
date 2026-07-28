import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InfoCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string | number;
  unit?: string;
  subValue?: string;
  valueFontSize?: number;
}

export const InfoCard = ({ iconName, title, value, unit, subValue, valueFontSize = 28 }: InfoCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={iconName} size={20} color="#0068C9" style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { fontSize: valueFontSize }]}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      {subValue && <Text style={styles.subValue}>{subValue}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 6,
  },
  title: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontWeight: 'bold',
    color: '#111111',
  },
  unit: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  subValue: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});
