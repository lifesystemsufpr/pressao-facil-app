import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const OnboardingHeader = ({ step, onBack }: { step: 1 | 2 | 3; onBack?: () => void }) => (
  <>
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} accessibilityLabel="Voltar" style={styles.back}>
          <Ionicons name="arrow-back" size={25} color="#0567B8" />
        </TouchableOpacity>
      ) : <View style={styles.back} />}
      <Text style={styles.brand}>Pressão Fácil</Text>
      <View style={styles.back} />
    </View>
    <View style={styles.labels}>
      <Text style={styles.step}>Passo {step} de 3</Text>
      <Text style={styles.progressText}>{step === 1 ? 'Perfil pessoal' : step === 2 ? 'Medidas' : 'Dados clínicos'}</Text>
    </View>
    <View style={styles.track}>
      <View style={[styles.fill, { width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }]} />
    </View>
  </>
);

const styles = StyleSheet.create({
  header: { height: 62, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { width: 42, height: 42, justifyContent: 'center' },
  brand: { color: '#0567B8', fontSize: 28, fontWeight: '800' },
  labels: { marginTop: 14, flexDirection: 'row', justifyContent: 'space-between' },
  step: { color: '#4A4F5C', fontSize: 14, fontWeight: '700' },
  progressText: { color: '#0567B8', fontSize: 14, fontWeight: '700' },
  track: { height: 8, borderRadius: 8, backgroundColor: '#DDE1EA', overflow: 'hidden', marginTop: 10 },
  fill: { height: '100%', borderRadius: 8, backgroundColor: '#0567B8' },
});
