import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';

export const AlertsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
            Meus Alertas
      </Text>

      <Text style={styles.subtitle}>
              Gerencie seus horários para suas medições diárias.            
      </Text>

      <Pressable
        style={styles.button}
        onPress={()=> navigation.navigate('NovaMedicaoModal')}>
            
        <Text style={styles.buttonText}>
            Adicionar lembrete
        </Text>
    </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20 },

    subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
    },

  button: {
    marginTop: 28,
    backgroundColor: '#0068C9',
    borderRadius: 28,
    height: 58,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },

    buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    },
});
