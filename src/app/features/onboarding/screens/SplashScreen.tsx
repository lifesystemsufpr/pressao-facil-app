import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SplashScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Image 
        source={require('../../../../../assets/icon.png')} 
        style={styles.logoImage} 
        resizeMode="contain"
      />
      <Text style={styles.title}>Pressão Fácil</Text>
      <Text style={styles.subtitle}>Monitore sua pressão de forma{'\n'}simples.</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8FF' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 40 },
  logoImage: { width: 140, height: 140, marginBottom: 10 },
  title: { color: '#0567B8', fontSize: 48, lineHeight: 58, fontWeight: '800', marginTop: 20 },
  subtitle: { color: '#424754', fontSize: 18, lineHeight: 28, textAlign: 'center', marginTop: 10 },
});
