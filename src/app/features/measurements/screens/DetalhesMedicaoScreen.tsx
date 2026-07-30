import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MeasurementsScreenProps } from '../../../shared/types/navigation';
import { PrimaryButton, SecondaryButton, DangerButton } from '../../../shared/components/Button';
import { AlertCard } from '../components/AlertCard';
import { BloodPressureDetailCard } from '../components/BloodPressureDetailCard';
import { InfoCard } from '../components/InfoCard';
import { ObservationCard } from '../components/ObservationCard';
import { ContextCard } from '../components/ContextCard';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import { useMedicoesStore } from '../store/useMedicoesStore';

export const DetalhesMedicaoScreen = ({ route, navigation }: MeasurementsScreenProps<'DetalhesMedicao'>) => {
  const { id } = route.params;

  const historico = useMedicoesStore(state => state.historico);
  const medicao = historico.find(m => m.id === id);

  if (!medicao) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Medição não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  const calcularStatus = (sys: number, dia: number) => {
    if (sys >= 140 || dia >= 90) return 'Alta';
    if (sys >= 130 || dia >= 85) return 'Elevada';
    return 'Normal';
  };

  const status = calcularStatus(medicao.sistolica, medicao.diastolica);
  const data = new Date(medicao.dataHora);
  const pad = (n: number) => String(n).padStart(2, '0');
  const dateStr = `${pad(data.getDate())}/${pad(data.getMonth() + 1)}/${data.getFullYear()}`;
  const timeStr = `${pad(data.getHours())}:${pad(data.getMinutes())}`;
  const contextLabels = Array.isArray(medicao.contexto)
    ? medicao.contexto.map(c => c === 'briguei_com_alguem' ? 'Briguei com alguém' : 'Após medicamento')
    : typeof medicao.contexto === 'string'
      ? [medicao.contexto === 'briguei_com_alguem' ? 'Briguei com alguém' : 'Após medicamento']
      : ['Nenhum contexto'];

  const measurement = {
    systolic: medicao.sistolica,
    diastolic: medicao.diastolica,
    heartRate: medicao.frequenciaCardiaca,
    date: dateStr,
    time: timeStr,
    observation: medicao.observacao || '',
    status: status,
    contexts: contextLabels,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Detalhes da Medição</Text>
          <HamburgerMenuIcon />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <AlertCard status={measurement.status as any} />

        <BloodPressureDetailCard systolic={measurement.systolic} diastolic={measurement.diastolic} />

        <View style={styles.row}>
          <InfoCard 
            iconName="heart" 
            title="Frequência" 
            value={measurement.heartRate} 
            unit="bpm" 
          />
          <View style={styles.spacer} />
          <InfoCard 
            iconName="calendar" 
            title="Registro" 
            value={measurement.date} 
            subValue={measurement.time} 
            valueFontSize={24}
          />
        </View>

        <ContextCard contexts={measurement.contexts} />

        <ObservationCard observation={measurement.observation} />

        <View style={styles.actionsContainer}>
          <PrimaryButton 
            title="Voltar" 
            iconName="arrow-back" 
            onPress={() => navigation.goBack()} 
            style={styles.actionButton} 
          />
          <SecondaryButton 
            title="Compartilhar" 
            iconName="share-social" 
            onPress={() => {}} 
            style={styles.actionButton} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    width: 16,
  },
  actionsContainer: {
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 12,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
  },
});
