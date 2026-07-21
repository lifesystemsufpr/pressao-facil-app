import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../../shared/types/navigation';
import { PerfilScreen } from '../screens/PerfilScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{ title: 'Perfil' }} 
      />
    </Stack.Navigator>
  );
};
