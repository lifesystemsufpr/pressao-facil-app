import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { RootStackScreenProps } from '../../../shared/types/navigation';
import { PrimaryButton, SecondaryButton } from '../../../shared/components/Button';
import { AlertCard } from '../components/AlertCard';
import { BloodPressureDetailCard } from '../components/BloodPressureDetailCard';
import { InfoCard } from '../components/InfoCard';
import { ObservationCard } from '../components/ObservationCard';
import { ContextCard } from '../components/ContextCard';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';
import { Ionicons } from '@expo/vector-icons';

export const ResultadosMedicaoScreen = ({ route, navigation }: RootStackScreenProps<'ResultadosMedicaoModal'>) => {
  const { id } = route.params;

  // Mock data match
  let measurement = {
    systolic: 120,
    diastolic: 80,
    heartRate: 72,
    date: 'Hoje',
    time: '08:30 AM',
    observation: 'Me sinto bem hoje.',
    status: 'Normal',
    contexts: ['Antes do café', 'Após medicamento'],
  };

  if (id === '2') {
    measurement = {
      systolic: 135,
      diastolic: 85,
      heartRate: 76,
      date: 'Ontem',
      time: '19:45',
      observation: 'Senti um leve cansaço após o trabalho.',
      status: 'Elevada',
      contexts: ['Após atividade física'],
    };
  } else if (id === '3') {
    measurement = {
      systolic: 150,
      diastolic: 95,
      heartRate: 85,
      date: '10/05',
      time: '09:15 AM',
      observation: 'Tomei o medicamento de controle atrasado hoje. Senti uma leve dor de cabeça ao acordar.',
      status: 'Alta',
      contexts: [],
    };
  }

  const handleGoBack = () => {
    navigation.navigate('Main' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Resultados da Medição</Text>
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
            onPress={handleGoBack} 
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
