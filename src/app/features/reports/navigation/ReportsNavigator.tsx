import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportsScreen } from '../screens/ReportsScreen';
import { ReportsStackParamList } from '../../../shared/types/navigation';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';

const Stack = createNativeStackNavigator<ReportsStackParamList>();

export const ReportsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: true,
        headerRight: () => <HamburgerMenuIcon />,
      }}
    >
      <Stack.Screen 
        name="Reports" 
        component={ReportsScreen} 
        options={{ title: 'Relatórios' }} 
      />
    </Stack.Navigator>
  );
};
