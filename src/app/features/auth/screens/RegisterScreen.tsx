import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { api } from '../../../shared/services/api';
import { AuthStackParamList } from '../../../shared/types/navigation';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || password.length < 6) {
      setError('Preencha um email válido e senha com pelo menos 6 caracteres.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await api.post('/auth/register', { email: email.toLowerCase().trim(), password });
      // Go back to login after successful registration
      navigation.navigate('Login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha ao fazer cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#0567B8" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Crie sua conta</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput 
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
          />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Cadastrar</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9F9FF' },
  flex: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 16 },
  content: { paddingHorizontal: 16, flex: 1, justifyContent: 'center' },
  title: { color: '#0567B8', fontSize: 32, lineHeight: 40, fontWeight: '800', marginBottom: 32 },
  label: { color: '#484D59', fontSize: 14, fontWeight: '700', marginTop: 16, marginBottom: 8, marginLeft: 4 },
  input: { height: 56, borderWidth: 1, borderColor: '#C7CEDD', borderRadius: 11, paddingHorizontal: 16, color: '#20232B', fontSize: 17, backgroundColor: '#FAFAFF' },
  error: { color: '#B42318', marginTop: 14, textAlign: 'center', fontWeight: '600' },
  primaryButton: { height: 56, borderRadius: 28, marginTop: 24, backgroundColor: '#0567B8', alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
