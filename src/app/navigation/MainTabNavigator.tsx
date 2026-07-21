import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native';
import { MainTabParamList, RootStackParamList } from '../shared/types/navigation';

import { DashboardNavigator } from '../features/dashboard';
import { MeasurementsNavigator } from '../features/measurements';
import { EvolutionNavigator } from '../features/evolution';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Um componente vazio pois a aba será interceptada
const EmptyScreen = () => null;

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="DashboardTab" 
        component={DashboardNavigator} 
        options={{ title: 'Início' }}
      />
      
      <Tab.Screen 
        name="MeasurementsTab" 
        component={MeasurementsNavigator} 
        options={{ title: 'Histórico' }}
      />
      
      <Tab.Screen 
        name="NewMeasurementTab" 
        component={EmptyScreen} 
        options={{ title: 'Nova Medição' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Impede a navegação padrão para a aba
            e.preventDefault();
            
            // Cast tipado seguro para alcançar a navegação raiz (RootStack)
            const rootNavigation = navigation as unknown as NavigationProp<RootStackParamList>;
            rootNavigation.navigate('NovaMedicaoModal');
          },
        })}
      />
      
      <Tab.Screen 
        name="EvolutionTab" 
        component={EvolutionNavigator} 
        options={{ title: 'Evolução' }}
      />
    </Tab.Navigator>
  );
};
