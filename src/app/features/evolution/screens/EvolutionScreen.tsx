import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EvolutionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Evolução</Text>
      <Text style={styles.subtitle}>Acompanhe o progresso da sua pressão arterial.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});
