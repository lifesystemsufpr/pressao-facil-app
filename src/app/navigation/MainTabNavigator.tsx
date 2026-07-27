import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList, RootStackParamList } from '../shared/types/navigation';
import { DashboardNavigator } from '../features/dashboard';
import { MeasurementsNavigator } from '../features/measurements';
import { EvolutionNavigator } from '../features/evolution';
import { ProfileNavigator } from '../features/profile';

const Tab = createBottomTabNavigator<MainTabParamList>();
const EmptyScreen = () => null;

export const MainTabNavigator = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: '#0567B8',
    tabBarInactiveTintColor: '#4A4F5C',
    tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
    tabBarStyle: { height: 72, paddingTop: 8, paddingBottom: 10, backgroundColor: '#F3F5FC' },
    tabBarIcon: ({ color, size }) => {
      const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
        DashboardTab: 'home',
        MeasurementsTab: 'time-outline',
        NewMeasurementTab: 'add-circle-outline',
        EvolutionTab: 'stats-chart-outline',
        ProfileTab: 'person-outline',
      };
      return <Ionicons name={icons[route.name]} size={size} color={color} />;
    },
  })}>
    <Tab.Screen name="DashboardTab" component={DashboardNavigator} options={{ title: 'Início' }} />
    <Tab.Screen name="MeasurementsTab" component={MeasurementsNavigator} options={{ title: 'Histórico' }} />
    <Tab.Screen name="NewMeasurementTab" component={EmptyScreen} options={{ title: 'Nova medição' }}
      listeners={({ navigation }) => ({
        tabPress: (event) => {
          event.preventDefault();
          (navigation as unknown as NavigationProp<RootStackParamList>).navigate('InstrucaoModal');
        },
      })} />
    <Tab.Screen name="EvolutionTab" component={EvolutionNavigator} options={{ title: 'Evolução' }} />
    <Tab.Screen name="ProfileTab" component={ProfileNavigator} options={{ title: 'Perfil' }} />
  </Tab.Navigator>
);
