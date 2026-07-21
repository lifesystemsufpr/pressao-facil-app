import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { MeasurementsScreenProps } from '../../../shared/types/navigation';

export const DetalhesMedicaoScreen = ({ route, navigation }: MeasurementsScreenProps<'DetalhesMedicao'>) => {
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Medição</Text>
      <Text>ID: {id}</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
