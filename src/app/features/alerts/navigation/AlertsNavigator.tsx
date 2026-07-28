import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlertsScreen } from '../screens/AlertsScreen';
import { AlertsStackParamList } from '../../../shared/types/navigation';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';
import { Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<AlertsStackParamList>();

export const AlertsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: true,
        headerRight: () => <HamburgerMenuIcon />,
      }}
    >
      <Stack.Screen 
        name="Alerts" 
        component={AlertsScreen} 
        options={({ navigation }) => ({ 
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
            <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home' as any)} style={{ marginLeft: 8 }}>
              <Feather name="arrow-left" size={24} color="#0056b3" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
