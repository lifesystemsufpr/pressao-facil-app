import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../shared/types/navigation';
import { MainTabNavigator } from './MainTabNavigator';
import { NovaMedicaoScreen, InstrucaoScreen } from '../features/measurements';
import { AlertsNavigator } from '../features/alerts';
import { ReportsNavigator } from '../features/reports';
import { ProfileNavigator } from '../features/profile';
import { MenuScreen } from '../shared/components/MenuScreen';
import {
  BodyMeasurementsScreen, PersonalDataScreen, SplashScreen, useProfile,
} from '../features/onboarding';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isLoading, profile } = useProfile();
  if (isLoading) return <SplashScreen />;

  if (!profile) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
        <Stack.Screen name="BodyMeasurements" component={BodyMeasurementsScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="NovaMedicaoModal" component={NovaMedicaoScreen}
        options={{ presentation: 'modal', headerShown: true, title: 'Nova medição' }} />
      <Stack.Screen name="InstrucaoModal" component={InstrucaoScreen}
        options={{ presentation: 'modal', headerShown: true, title: 'Instruções de uso' }} />
      <Stack.Screen name="MenuScreen" component={MenuScreen}
        options={{ presentation: 'transparentModal', animation: 'fade' }} />
      <Stack.Screen name="Alerts" component={AlertsNavigator} />
      <Stack.Screen name="Reports" component={ReportsNavigator} />
      <Stack.Screen name="Profile" component={ProfileNavigator} />
    </Stack.Navigator>
  );
};
