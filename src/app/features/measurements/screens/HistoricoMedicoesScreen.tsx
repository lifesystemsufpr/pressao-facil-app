import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { MeasurementsScreenProps } from '../../../shared/types/navigation';

export const HistoricoMedicoesScreen = ({ navigation }: MeasurementsScreenProps<'HistoricoMedicoes'>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Medições</Text>
      <Button
        title="Ver Detalhes da Medição (Mock ID: 1)"
        onPress={() => navigation.navigate('DetalhesMedicao', { id: '1' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
