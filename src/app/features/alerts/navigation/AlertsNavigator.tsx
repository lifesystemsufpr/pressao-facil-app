import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlertsStackParamList } from '../../../shared/types/navigation';
import { AlertsScreen } from '../screens/AlertsScreen';

const Stack = createNativeStackNavigator<AlertsStackParamList>();

export const AlertsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Alerts" 
        component={AlertsScreen} 
        options={{ title: 'Alertas' }} 
      />
    </Stack.Navigator>
  );
};
