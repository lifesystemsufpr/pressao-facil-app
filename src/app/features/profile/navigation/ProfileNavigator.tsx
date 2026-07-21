import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../../shared/types/navigation';
import { PerfilScreen } from '../screens/PerfilScreen';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: true,
        headerRight: () => <HamburgerMenuIcon />,
      }}
    >
      <Stack.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{ title: 'Perfil' }} 
      />
    </Stack.Navigator>
  );
};
