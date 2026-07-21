import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type DashboardStackParamList = {
  Home: undefined;
};

export type MeasurementsStackParamList = {
  HistoricoMedicoes: undefined;
  DetalhesMedicao: { id: string };
  NovaMedicao: undefined;
};

export type ProfileStackParamList = {
  Perfil: undefined;
};

export type AlertsStackParamList = {
  Alerts: undefined;
};

export type MainTabParamList = {
  DashboardTab: undefined;
  MeasurementsTab: undefined;
  NewMeasurementTab: undefined; // Aba fake para disparar o Modal
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  NovaMedicaoModal: undefined; // Modal Global
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
