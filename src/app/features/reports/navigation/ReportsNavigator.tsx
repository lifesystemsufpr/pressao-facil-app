import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportsScreen } from '../screens/ReportsScreen';
import { ReportsStackParamList } from '../../../shared/types/navigation';
import { Feather } from '@expo/vector-icons';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';

const Stack = createNativeStackNavigator<ReportsStackParamList>();

export const ReportsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="ReportsScreenView" 
        component={ReportsScreen} 
        options={({ navigation }) => ({ 
          title: 'Pressão Fácil',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F8F9FA',
            elevation: 0, // Remove a sombra no Android
            shadowOpacity: 0, // Remove a sombra no iOS
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: '#0056b3',
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home' as any)} style={{ marginLeft: 8 }}>
              <Feather name="arrow-left" size={24} color="#0056b3" />
            </TouchableOpacity>
          ),
          headerRight: () => <HamburgerMenuIcon />,
        })} 
      />
    </Stack.Navigator>
  );
};
