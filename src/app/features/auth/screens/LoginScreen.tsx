import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { api } from '../../../shared/services/api';
import { useSessionStore } from '../../../shared/store/sessionStore';
import { AuthStackParamList } from '../../../shared/types/navigation';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setSession = useSessionStore(state => state.setSession);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha email e senha.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email: email.toLowerCase().trim(), password });
      setSession(response.data.accessToken, { id: response.data.user.id, email: response.data.user.email });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.title}>Pressão Fácil</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta!</Text>

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
            placeholder="********"
            secureTextEntry
          />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Entrar</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.secondaryButtonText}>Não tem uma conta? Crie aqui.</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9F9FF' },
  flex: { flex: 1 },
  content: { paddingHorizontal: 16, flex: 1, justifyContent: 'center' },
  title: { color: '#0567B8', fontSize: 36, lineHeight: 40, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  subtitle: { color: '#4F5562', fontSize: 18, marginBottom: 32, textAlign: 'center' },
  label: { color: '#484D59', fontSize: 14, fontWeight: '700', marginTop: 16, marginBottom: 8, marginLeft: 4 },
  input: { height: 56, borderWidth: 1, borderColor: '#C7CEDD', borderRadius: 11, paddingHorizontal: 16, color: '#20232B', fontSize: 17, backgroundColor: '#FAFAFF' },
  error: { color: '#B42318', marginTop: 14, textAlign: 'center', fontWeight: '600' },
  primaryButton: { height: 56, borderRadius: 28, marginTop: 24, backgroundColor: '#0567B8', alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  secondaryButton: { marginTop: 16, padding: 8 },
  secondaryButtonText: { color: '#0567B8', textAlign: 'center', fontWeight: '600' }
});
