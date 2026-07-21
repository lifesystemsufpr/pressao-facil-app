import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../shared/types/navigation';

import { MainTabNavigator } from './MainTabNavigator';
import { NovaMedicaoScreen } from '../features/measurements';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  // TODO:
  // No futuro, adicionar a lógica para recuperar a sessão do usuário via AsyncStorage
  // Exemplo: const token = await AsyncStorage.getItem('@session_token');
  // Decidir se o fluxo inicial será MainTabNavigator ou um AuthNavigator baseado nisso.

  // TODO:
  // Em caso de carregamento da sessão (ex: AsyncStorage.getItem),
  // exibir uma tela de Splash ou ActivityIndicator enquanto aguarda.

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 
        TODO:
        Atualmente renderiza direto o Main, no futuro deverá condicionalmente renderizar:
        token ? <Stack.Screen name="Main" ... /> : <Stack.Screen name="Auth" ... />
      */}
      <Stack.Screen name="Main" component={MainTabNavigator} />
      
      {/* Modal Global de Nova Medição */}
      <Stack.Screen 
        name="NovaMedicaoModal" 
        component={NovaMedicaoScreen} 
        options={{ presentation: 'modal', headerShown: true, title: 'Nova Medição' }}
      />
    </Stack.Navigator>
  );
};
