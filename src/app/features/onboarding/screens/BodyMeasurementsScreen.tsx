import React, { useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../../shared/types/navigation';
import { OnboardingHeader } from '../components/OnboardingHeader';
import { useProfile } from '../store/ProfileContext';

type Props = NativeStackScreenProps<RootStackParamList, 'BodyMeasurements'>;

export const BodyMeasurementsScreen = ({ navigation, route }: Props) => {
  const { saveProfile } = useProfile();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const continueRegistration = () => {
    const weightKg = Number(weight.replace(',', '.'));
    const heightCm = Number(height.replace(/\D/g, ''));
    if (!Number.isFinite(weightKg) || weightKg < 20 || weightKg > 400)
      return setError('Informe um peso entre 20 e 400 kg.');
    if (!Number.isFinite(heightCm) || heightCm < 80 || heightCm > 250)
      return setError('Informe uma altura entre 80 e 250 cm.');

    setError('');
    navigation.navigate('ClinicalData', {
      personalData: route.params.personalData,
      weightKg,
      heightCm,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <OnboardingHeader step={2} onBack={() => navigation.goBack()} />
          <Text style={styles.title}>Suas medidas</Text>
          <Text style={styles.subtitle}>Precisamos do seu peso e altura para calcular métricas de saúde importantes, como o seu IMC.</Text>

          <View style={styles.illustration}>
            <View style={styles.scale}><Ionicons name="speedometer-outline" size={74} color="#266B97" /></View>
            <View style={styles.tape}><Ionicons name="resize-outline" size={34} color="#FFFFFF" /></View>
          </View>

          <Text style={styles.label}>Peso atual</Text>
          <View style={styles.measureInput}>
            <Ionicons name="bag-handle-outline" size={22} color="#7C8290" />
            <TextInput value={weight}
              onChangeText={(value) => setWeight(value.replace(/[^0-9,.]/g, '').slice(0, 6))}
              placeholder="00.0" placeholderTextColor="#C3C9D8" keyboardType="decimal-pad"
              style={styles.numericInput} />
            <Text style={styles.unit}>kg</Text>
          </View>

          <Text style={styles.label}>Altura</Text>
          <View style={styles.measureInput}>
            <Ionicons name="resize-outline" size={22} color="#7C8290" />
            <TextInput value={height}
              onChangeText={(value) => setHeight(value.replace(/\D/g, '').slice(0, 3))}
              placeholder="000" placeholderTextColor="#C3C9D8" keyboardType="number-pad"
              style={styles.numericInput} />
            <Text style={styles.unit}>cm</Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={22} color="#0567B8" />
            <Text style={styles.infoText}>Esses dados são privados e usados apenas para personalizar sua experiência de acompanhamento.</Text>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={continueRegistration}>
            <Text style={styles.buttonText}>Próximo passo</Text>
            <Ionicons name="arrow-forward" size={23} color="#FFFFFF" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9F9FF' }, flex: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 28, flexGrow: 1 },
  title: { color: '#20232B', fontSize: 30, fontWeight: '800', marginTop: 44 },
  subtitle: { color: '#4F5562', fontSize: 16, lineHeight: 24, marginTop: 8 },
  illustration: { height: 202, marginTop: 54, marginBottom: 36, borderRadius: 24, backgroundColor: '#DCECF4',
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  scale: { width: 145, height: 105, backgroundColor: '#F7FAFC', borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-5deg' }] },
  tape: { width: 58, height: 58, marginLeft: -12, marginTop: 40, borderRadius: 29,
    backgroundColor: '#6FAFD2', alignItems: 'center', justifyContent: 'center' },
  label: { color: '#484D59', fontSize: 14, fontWeight: '700', marginTop: 20, marginBottom: 10, marginLeft: 4 },
  measureInput: { height: 80, borderWidth: 1, borderColor: '#C7CEDD', borderRadius: 16,
    paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF' },
  numericInput: { flex: 1, color: '#20232B', fontSize: 30, fontWeight: '700', marginLeft: 28, paddingVertical: 0 },
  unit: { color: '#707786', fontSize: 20, fontWeight: '700', marginRight: 30 },
  infoCard: { borderWidth: 1, borderColor: '#DFE3EE', borderRadius: 13, backgroundColor: '#F3F5FC',
    padding: 16, marginTop: 54, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  infoText: { flex: 1, color: '#4A4F5C', fontSize: 13, lineHeight: 17, fontWeight: '600' },
  error: { color: '#B42318', marginTop: 13, textAlign: 'center', fontWeight: '600' },
  button: { height: 56, borderRadius: 28, marginTop: 32, backgroundColor: '#0567B8',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  disabled: { opacity: 0.65 }, buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
});
