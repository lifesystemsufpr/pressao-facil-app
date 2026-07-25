import React, { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../../shared/types/navigation';
import { BloodType, Gender } from '../types/profile';
import { OnboardingHeader } from '../components/OnboardingHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'PersonalData'>;
const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const PersonalDataScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [bloodType, setBloodType] = useState<BloodType | null>(null);
  const [error, setError] = useState('');

  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    setBirthDate([digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean).join('/'));
  };

  const isValidDate = () => {
    const match = birthDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return false;
    const [, day, month, year] = match;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    return parsed.getFullYear() === Number(year) &&
      parsed.getMonth() === Number(month) - 1 &&
      parsed.getDate() === Number(day) &&
      parsed <= new Date();
  };

  const continueRegistration = () => {
    if (fullName.trim().length < 3) return setError('Informe seu nome completo.');
    if (!isValidDate()) return setError('Informe uma data de nascimento válida.');
    if (!gender || !bloodType) return setError('Selecione seu gênero e tipo sanguíneo.');

    setError('');
    navigation.navigate('BodyMeasurements', {
      personalData: { fullName: fullName.trim(), birthDate, gender, bloodType },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <OnboardingHeader step={1} />
          <Text style={styles.title}>Conte um pouco sobre você</Text>
          <Text style={styles.subtitle}>Essas informações nos ajudam a calibrar seus índices de saúde.</Text>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput value={fullName} onChangeText={setFullName} placeholder="Ex: João Silva"
            placeholderTextColor="#7C8290" autoCapitalize="words" style={styles.input} />

          <Text style={styles.label}>Data de nascimento</Text>
          <View style={styles.inputWithIcon}>
            <TextInput value={birthDate} onChangeText={formatDate} placeholder="dd/mm/aaaa"
              placeholderTextColor="#7C8290" keyboardType="number-pad" style={styles.inlineInput} />
            <Ionicons name="calendar-outline" size={23} color="#4A4F5C" />
          </View>

          <Text style={styles.label}>Gênero</Text>
          <View style={styles.chipRow}>
            {([
              ['male', '♂ Masculino'], ['female', '♀ Feminino'], ['other', 'Outro'],
            ] as const).map(([value, label]) => (
              <TouchableOpacity key={value} onPress={() => setGender(value)}
                style={[styles.chip, gender === value && styles.selectedChip]}>
                <Text style={[styles.chipText, gender === value && styles.selectedText]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Tipo sanguíneo</Text>
          <View style={styles.bloodGrid}>
            {bloodTypes.map((type) => (
              <TouchableOpacity key={type} onPress={() => setBloodType(type)}
                style={[styles.bloodChip, bloodType === type && styles.selectedChip]}>
                <Text style={[styles.bloodText, bloodType === type && styles.selectedText]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.illustration}>
            <Ionicons name="medical-outline" size={72} color="#75B9E5" />
            <Text style={styles.illustrationText}>Seu cuidado começa aqui</Text>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.primaryButton} onPress={continueRegistration}>
            <Text style={styles.primaryButtonText}>Próximo passo</Text>
            <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.privacy}>Seus dados ficam protegidos neste dispositivo.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9F9FF' }, flex: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  title: { color: '#20232B', fontSize: 30, lineHeight: 35, fontWeight: '800', marginTop: 34 },
  subtitle: { color: '#4F5562', fontSize: 16, lineHeight: 25, marginTop: 8, marginBottom: 28 },
  label: { color: '#484D59', fontSize: 14, fontWeight: '700', marginTop: 20, marginBottom: 9, marginLeft: 4 },
  input: { height: 56, borderWidth: 1, borderColor: '#C7CEDD', borderRadius: 11,
    paddingHorizontal: 16, color: '#20232B', fontSize: 17, backgroundColor: '#FAFAFF' },
  inputWithIcon: { height: 56, borderWidth: 1, borderColor: '#C7CEDD', borderRadius: 11,
    paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' },
  inlineInput: { flex: 1, color: '#20232B', fontSize: 17 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  chip: { minWidth: 105, height: 48, borderWidth: 1, borderColor: '#C7CEDD', borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  selectedChip: { backgroundColor: '#E5F2FC', borderColor: '#0567B8' },
  chipText: { color: '#4A4F5C', fontWeight: '700' }, selectedText: { color: '#0567B8' },
  bloodGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  bloodChip: { width: '22.5%', height: 56, borderWidth: 1, borderColor: '#C7CEDD', borderRadius: 11,
    alignItems: 'center', justifyContent: 'center' },
  bloodText: { color: '#4A4F5C', fontSize: 23, fontWeight: '600' },
  illustration: { height: 150, marginTop: 40, borderRadius: 24, backgroundColor: '#E2EFF6',
    alignItems: 'center', justifyContent: 'center' },
  illustrationText: { color: '#3B6580', fontSize: 14, marginTop: 6, fontWeight: '600' },
  error: { color: '#B42318', marginTop: 14, textAlign: 'center', fontWeight: '600' },
  primaryButton: { height: 56, borderRadius: 28, marginTop: 20, backgroundColor: '#0567B8',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  privacy: { color: '#767D8C', textAlign: 'center', fontSize: 13, fontWeight: '600', marginTop: 15 },
});
