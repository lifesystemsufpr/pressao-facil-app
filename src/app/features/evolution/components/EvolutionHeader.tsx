import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';

export const EvolutionHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Minha Evolução</Text>
      <HamburgerMenuIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});
