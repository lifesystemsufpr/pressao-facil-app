import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SplashScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <View style={styles.logo}>
        <Ionicons name="heart-outline" size={106} color="#0B4E86" />
        <Ionicons name="pulse" size={54} color="#82C9F4" style={styles.pulse} />
        <View style={styles.check}><Ionicons name="checkmark" size={42} color="#82C9F4" /></View>
      </View>
      <Text style={styles.title}>Pressão Fácil</Text>
      <Text style={styles.subtitle}>Monitore sua pressão de forma{'\n'}simples.</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8FF' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 40 },
  logo: { width: 130, height: 130, alignItems: 'center', justifyContent: 'center' },
  pulse: { position: 'absolute', left: 37, top: 50 },
  check: { position: 'absolute', right: 2, top: 17, backgroundColor: '#F8F8FF', borderRadius: 20 },
  title: { color: '#0567B8', fontSize: 48, lineHeight: 58, fontWeight: '800', marginTop: 20 },
  subtitle: { color: '#424754', fontSize: 18, lineHeight: 28, textAlign: 'center', marginTop: 10 },
});
