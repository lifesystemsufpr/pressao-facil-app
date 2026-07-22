import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type MeasurementStatus = 'Normal' | 'Elevada' | 'Alta';

interface StatusBadgeProps {
  status: MeasurementStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Normal':
        return {
          container: { backgroundColor: '#E6F4EA' },
          text: { color: '#137333' },
        };
      case 'Elevada':
        return {
          container: { backgroundColor: '#FEF7E0' },
          text: { color: '#B06000' },
        };
      case 'Alta':
        return {
          container: { backgroundColor: '#FCE8E6' },
          text: { color: '#C5221F' },
        };
      default:
        return {
          container: { backgroundColor: '#F1F3F4' },
          text: { color: '#5F6368' },
        };
    }
  };

  const { container, text } = getStatusStyles();

  return (
    <View style={[styles.badge, container]}>
      <Text style={[styles.text, text]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
