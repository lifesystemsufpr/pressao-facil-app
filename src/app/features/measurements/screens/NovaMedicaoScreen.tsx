import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../../../shared/types/navigation';

export const NovaMedicaoScreen = ({ navigation }: RootStackScreenProps<'NovaMedicaoModal'>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Medição</Text>
      <Button title="Cancelar" onPress={() => navigation.goBack()} />
      <Button title="Salvar" onPress={() => {
        // Logica de salvar
        navigation.goBack();
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, gap: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
