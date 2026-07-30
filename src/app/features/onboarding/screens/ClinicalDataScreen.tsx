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
import { useProfileStore } from '../../profile/store/useProfileStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ClinicalData'>;

export const ClinicalDataScreen = ({ navigation, route }: Props) => {
  const salvar = useProfileStore(state => state.salvar);
  
  const [usesBloodPressureMeds, setUsesBloodPressureMeds] = useState<boolean | null>(null);
  const [bloodPressureMedsName, setBloodPressureMedsName] = useState('');
  
  const [familyHistoryHypertension, setFamilyHistoryHypertension] = useState<boolean | null>(null);
  
  const [hasChronicDisease, setHasChronicDisease] = useState<boolean | null>(null);
  const [chronicDiseaseName, setChronicDiseaseName] = useState('');
  
  const [smokerOrLivesWithSmoker, setSmokerOrLivesWithSmoker] = useState<boolean | null>(null);

  const [error, setError] = useState('');

  const completeRegistration = () => {
    if (usesBloodPressureMeds === null) return setError('Responda se utiliza medicamento para pressão.');
    if (usesBloodPressureMeds && bloodPressureMedsName.trim().length === 0) return setError('Informe qual medicamento para pressão você utiliza.');
    if (familyHistoryHypertension === null) return setError('Responda sobre histórico de hipertensão na família.');
    if (hasChronicDisease === null) return setError('Responda se possui alguma doença crônica.');
    if (hasChronicDisease && chronicDiseaseName.trim().length === 0) return setError('Informe qual doença crônica você possui.');
    if (smokerOrLivesWithSmoker === null) return setError('Responda se é fumante ou convive com algum.');

    setError('');
    salvar({
      ...route.params.personalData,
      weightKg: route.params.weightKg,
      heightCm: route.params.heightCm,
      usesBloodPressureMeds,
      bloodPressureMedsName: usesBloodPressureMeds ? bloodPressureMedsName.trim() : undefined,
      familyHistoryHypertension,
      hasChronicDisease,
      chronicDiseaseName: hasChronicDisease ? chronicDiseaseName.trim() : undefined,
      smokerOrLivesWithSmoker,
    });
  };

  const renderRadio = (
    label: string, 
    value: boolean | null, 
    setValue: (val: boolean) => void,
    hasExtraInput: boolean,
    extraInputValue: string,
    setExtraInputValue: (val: string) => void,
    extraInputPlaceholder: string
  ) => (
    <View style={styles.questionBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.chipRow}>
        <TouchableOpacity onPress={() => setValue(true)}
          style={[styles.chip, value === true && styles.selectedChip]}>
          <Text style={[styles.chipText, value === true && styles.selectedText]}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setValue(false)}
          style={[styles.chip, value === false && styles.selectedChip]}>
          <Text style={[styles.chipText, value === false && styles.selectedText]}>Não</Text>
        </TouchableOpacity>
      </View>
      {value === true && hasExtraInput && (
        <View style={styles.inputContainer}>
          <Text style={styles.labelSub}>Se sim, qual?</Text>
          <TextInput
            value={extraInputValue}
            onChangeText={setExtraInputValue}
            placeholder={extraInputPlaceholder}
            placeholderTextColor="#C3C9D8"
            style={styles.input}
          />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <OnboardingHeader step={3} onBack={() => navigation.goBack()} />
          <Text style={styles.title}>Dados Clínicos</Text>
          <Text style={styles.subtitle}>Estas informações ajudam a entender melhor o seu perfil de saúde.</Text>

          {renderRadio(
            'Você utiliza medicamento para pressão?',
            usesBloodPressureMeds, setUsesBloodPressureMeds,
            true, bloodPressureMedsName, setBloodPressureMedsName, 'Ex: Losartana'
          )}

          {renderRadio(
            'Possui histórico de hipertensão na família?',
            familyHistoryHypertension, setFamilyHistoryHypertension,
            false, '', () => {}, ''
          )}

          {renderRadio(
            'Possui alguma doença crônica?',
            hasChronicDisease, setHasChronicDisease,
            true, chronicDiseaseName, setChronicDiseaseName, 'Ex: Diabetes'
          )}

          {renderRadio(
            'Você é fumante regular ou convive com algum?',
            smokerOrLivesWithSmoker, setSmokerOrLivesWithSmoker,
            false, '', () => {}, ''
          )}

          {!!error && <Text style={styles.error}>{error}</Text>}
          
          <TouchableOpacity style={styles.button} onPress={completeRegistration}>
            <Text style={styles.buttonText}>Concluir cadastro</Text>
            <Ionicons name="checkmark-circle-outline" size={23} color="#FFFFFF" />
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
  subtitle: { color: '#4F5562', fontSize: 16, lineHeight: 24, marginTop: 8, marginBottom: 16 },
  
  questionBlock: { marginTop: 16, marginBottom: 8 },
  label: { color: '#484D59', fontSize: 15, fontWeight: '700', marginBottom: 10, marginLeft: 4 },
  labelSub: { color: '#484D59', fontSize: 13, fontWeight: '600', marginBottom: 6, marginLeft: 4 },
  
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  chip: { minWidth: 90, height: 48, borderWidth: 1, borderColor: '#C7CEDD', borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  selectedChip: { backgroundColor: '#E5F2FC', borderColor: '#0567B8' },
  chipText: { color: '#4A4F5C', fontWeight: '700' }, 
  selectedText: { color: '#0567B8' },

  inputContainer: { marginTop: 12 },
  input: { height: 50, borderWidth: 1, borderColor: '#C7CEDD', borderRadius: 11,
    paddingHorizontal: 16, color: '#20232B', fontSize: 16, backgroundColor: '#FAFAFF' },

  error: { color: '#B42318', marginTop: 13, textAlign: 'center', fontWeight: '600' },
  button: { height: 56, borderRadius: 28, marginTop: 32, backgroundColor: '#0567B8',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  disabled: { opacity: 0.65 }, 
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
});
