import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MeasurementStatus } from './StatusBadge';

interface AlertCardProps {
  status: MeasurementStatus;
}

export const AlertCard = ({ status }: AlertCardProps) => {
  const getAlertConfig = () => {
    switch (status) {
      case 'Normal':
        return {
          title: 'Pressão Normal',
          message: 'Sua medição está dentro da faixa saudável.',
          bg: '#E6F4EA',
          color: '#137333',
          icon: 'checkmark-circle' as const,
        };
      case 'Elevada':
        return {
          title: 'Pressão Elevada',
          message: 'Sua medição está acima do seu limite alvo configurado.',
          bg: '#FEF7E0',
          color: '#B06000',
          icon: 'warning' as const,
        };
      case 'Alta':
        return {
          title: 'Pressão Alta',
          message: 'Sua medição está muito acima do limite. Procure orientação médica.',
          bg: '#FCE8E6',
          color: '#C5221F',
          icon: 'alert-circle' as const,
        };
      default:
        return {
          title: 'Atenção',
          message: 'Verifique sua medição.',
          bg: '#F1F3F4',
          color: '#5F6368',
          icon: 'information-circle' as const,
        };
    }
  };

  const config = getAlertConfig();

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <View style={styles.header}>
        <Ionicons name={config.icon} size={24} color={config.color} />
        <Text style={[styles.title, { color: config.color }]}>{config.title}</Text>
      </View>
      <Text style={styles.message}>{config.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  message: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});
