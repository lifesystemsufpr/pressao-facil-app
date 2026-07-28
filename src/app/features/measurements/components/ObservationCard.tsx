import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ObservationCardProps {
  observation: string;
}

export const ObservationCard = ({ observation }: ObservationCardProps) => {
  if (!observation) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="document-text-outline" size={16} color="#374151" />
        <Text style={styles.title}>OBSERVAÇÕES</Text>
      </View>
      <Text style={styles.text}>{observation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
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
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 6,
  },
  text: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
});
