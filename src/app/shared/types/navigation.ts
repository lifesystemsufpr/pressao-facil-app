import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps } from '@react-navigation/drawer';
export type DashboardStackParamList = {
  Home: undefined;
};

export type MeasurementsStackParamList = {
  HistoricoMedicoes: undefined;
  DetalhesMedicao: { id: string };
  NovaMedicao: undefined;
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
  Reports: undefined;
};

export type MainTabParamList = {
  DashboardTab: undefined;
  MeasurementsTab: undefined;
  NewMeasurementTab: undefined; // Aba fake para disparar o Modal
  EvolutionTab: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  MenuScreen: undefined; // Menu lateral customizado
  NovaMedicaoModal: undefined; // Modal Global
  InstrucaoModal: undefined; // Modal de Instrução
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

export type InstrucaoModalScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;