import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { PersonalData } from '../../features/onboarding/types/profile';

export type DashboardStackParamList = {
  Home: undefined;
};

export type MeasurementsStackParamList = {
  HistoricoMedicoes: undefined;
  DetalhesMedicao: { id: string };
  NovaMedicao: undefined;
  Instrucao: undefined;
};

export type EvolutionStackParamList = {
  Evolution: undefined;
};

export type ProfileStackParamList = {
  Perfil: undefined;
};

export type AlertsStackParamList = {
  Alerts: undefined;
};

export type ReportsStackParamList = {
  ReportsScreenView: undefined;
};

export type MainTabParamList = {
  DashboardTab: undefined;
  MeasurementsTab: undefined;
  NewMeasurementTab: undefined; // Aba fake para disparar o Modal
  EvolutionTab: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  PersonalData: undefined;
  BodyMeasurements: { personalData: PersonalData };
  ClinicalData: { personalData: PersonalData; weightKg: number; heightCm: number };
  MenuScreen: undefined; // Menu lateral customizado
  NovaMedicaoModal: undefined; // Modal Global
  InstrucaoModal: undefined; // Modal de Instrução
  ResultadosMedicaoModal: { id: string }; // Modal de Resultados
  Alerts: NavigatorScreenParams<AlertsStackParamList>;
  Reports: NavigatorScreenParams<ReportsStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

// --- Tipagens Utilitárias para as Telas ---

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = BottomTabScreenProps<
  MainTabParamList,
  T
>;

export type MeasurementsScreenProps<T extends keyof MeasurementsStackParamList> = NativeStackScreenProps<
  MeasurementsStackParamList,
  T
>;

export type InstrucaoModalScreenProps<T extends keyof MeasurementsStackParamList> = NativeStackScreenProps<
  MeasurementsStackParamList,
  T
>;
