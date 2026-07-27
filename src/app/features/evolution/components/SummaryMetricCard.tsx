import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SummaryMetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  inlineSubtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  valueColor?: string;
  leftStripeColor?: string;
}

export const SummaryMetricCard = ({
  title,
  value,
  subtitle,
  inlineSubtitle,
  iconName,
  iconColor = '#1976D2',
  valueColor = '#1F2937',
  leftStripeColor,
}: SummaryMetricCardProps) => {
  return (
    <View style={styles.card}>
      {leftStripeColor && (
        <View style={[styles.leftStripe, { backgroundColor: leftStripeColor }]} />
      )}
      
      <View style={styles.header}>
        {iconName && <Ionicons name={iconName} size={14} color={iconColor} style={styles.icon} />}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.valueRow}>
        <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
        {inlineSubtitle && <Text style={styles.inlineSubtitle}>{inlineSubtitle}</Text>}
      </View>
      
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  leftStripe: {
    position: 'absolute',
    left: 0,
    top: 16,
    bottom: 16,
    width: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
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
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  inlineSubtitle: {
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
});
