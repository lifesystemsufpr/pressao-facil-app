import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EvolutionScreen } from '../screens/EvolutionScreen';
import { EvolutionStackParamList } from '../../../shared/types/navigation';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';

const Stack = createNativeStackNavigator<EvolutionStackParamList>();

export const EvolutionNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Evolution" 
        component={EvolutionScreen} 
        options={{ title: 'Evolução' }} 
      />
    </Stack.Navigator>
  );
};
