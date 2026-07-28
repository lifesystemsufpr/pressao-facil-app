import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ContextCardProps {
  contexts?: string[];
}

export const ContextCard = ({ contexts }: ContextCardProps) => {
  if (!contexts || contexts.length === 0) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="list-outline" size={16} color="#374151" />
        <Text style={styles.title}>CONTEXTO DA MEDIÇÃO</Text>
      </View>
      <View style={styles.tagsContainer}>
        {contexts.map((ctx, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{ctx}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
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
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#D4E6FC',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagText: {
    fontSize: 13,
    color: '#0068C9',
    fontWeight: '500',
  },
});
