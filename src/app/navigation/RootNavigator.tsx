import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../shared/types/navigation';
import { MainTabNavigator } from './MainTabNavigator';
import { NovaMedicaoScreen, InstrucaoScreen, ResultadosMedicaoScreen } from '../features/measurements';
import { AlertsNavigator } from '../features/alerts';
import { ReportsNavigator } from '../features/reports';
import { ProfileNavigator } from '../features/profile';
import { MenuScreen } from '../shared/components/MenuScreen';
import {
  BodyMeasurementsScreen, PersonalDataScreen, ClinicalDataScreen, SplashScreen, useProfile,
} from '../features/onboarding';
import { Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isLoading, profile } = useProfile();
  if (isLoading) return <SplashScreen />;

  if (!profile) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
        <Stack.Screen name="BodyMeasurements" component={BodyMeasurementsScreen} />
        <Stack.Screen name="ClinicalData" component={ClinicalDataScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="NovaMedicaoModal" component={NovaMedicaoScreen}
        options={{ presentation: 'modal', headerShown: true, title: 'Nova medição' }} />
      <Stack.Screen name="InstrucaoModal" component={InstrucaoScreen}
        options={({ navigation }) => ({ 
          presentation: 'modal', 
          headerShown: true, 
          title: 'Pressão Fácil',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F8F9FA',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: '#0056b3',
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main' as any)} style={{ marginLeft: 8 }}>
              <Feather name="arrow-left" size={24} color="#0056b3" />
            </TouchableOpacity>
          ),
        })} />
      <Stack.Screen name="ResultadosMedicaoModal" component={ResultadosMedicaoScreen}
        options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="MenuScreen" component={MenuScreen}
        options={{ presentation: 'transparentModal', animation: 'fade' }} />
      <Stack.Screen name="Alerts" component={AlertsNavigator} />
      <Stack.Screen name="Reports" component={ReportsNavigator} />
      <Stack.Screen name="Profile" component={ProfileNavigator} />
    </Stack.Navigator>
  );
};
