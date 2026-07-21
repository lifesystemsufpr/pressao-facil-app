import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MeasurementsStackParamList } from '../../../shared/types/navigation';
import { HistoricoMedicoesScreen } from '../screens/HistoricoMedicoesScreen';
import { DetalhesMedicaoScreen } from '../screens/DetalhesMedicaoScreen';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';

const Stack = createNativeStackNavigator<MeasurementsStackParamList>();

export const MeasurementsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerRight: () => <HamburgerMenuIcon /> }}>
      <Stack.Screen 
        name="HistoricoMedicoes" 
        component={HistoricoMedicoesScreen} 
        options={{ title: 'Histórico' }} 
      />
      <Stack.Screen 
        name="DetalhesMedicao" 
        component={DetalhesMedicaoScreen} 
        options={{ title: 'Detalhes da Medição', headerLeft: undefined }} 
      />
    </Stack.Navigator>
  );
};
