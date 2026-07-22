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

export const InfoCard = ({
  iconName,
  title,
  value,
  unit,
  subValue,
  valueFontSize = 30,
}: InfoCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={iconName} size={16} color="#5AAEFF" />
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.valueRow}>
          <Text style={[styles.value, { fontSize: valueFontSize }]}>{value}</Text>
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </View>
        {subValue && <Text style={styles.subValue}>{subValue}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  unit: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  subValue: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
});
