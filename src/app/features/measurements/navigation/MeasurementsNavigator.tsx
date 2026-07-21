import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MeasurementsStackParamList } from '../../../shared/types/navigation';
import { HistoricoMedicoesScreen } from '../screens/HistoricoMedicoesScreen';
import { DetalhesMedicaoScreen } from '../screens/DetalhesMedicaoScreen';

const Stack = createNativeStackNavigator<MeasurementsStackParamList>();

export const MeasurementsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HistoricoMedicoes">
      <Stack.Screen 
        name="HistoricoMedicoes" 
        component={HistoricoMedicoesScreen} 
        options={{ title: 'Histórico' }} 
      />
      <Stack.Screen 
        name="DetalhesMedicao" 
        component={DetalhesMedicaoScreen} 
        options={{ title: 'Detalhes' }} 
      />
    </Stack.Navigator>
  );
};
