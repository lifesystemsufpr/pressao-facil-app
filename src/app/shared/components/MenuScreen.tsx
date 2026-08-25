import React from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../shared/types/navigation';

import { useSessionStore } from '../store/sessionStore';
import { useProfileStore } from '../../features/profile/store/useProfileStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const clearSession = useSessionStore(state => state.clearSession);
  const limparPerfil = useProfileStore(state => state.limpar);

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.goBack(); // Fecha o menu
    // @ts-ignore - simplificação
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    limparPerfil();
    clearSession();
  };

  return (
    <View style={styles.overlay}>
      <Pressable
        style={styles.backdrop}
        onPress={() => navigation.goBack()}
      />
      <View style={[styles.modal, { top: insets.top + 60 }]}>
        <View style={styles.menuItems}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('Alerts')}
          >
            <Text style={styles.menuText}>Meus Alertas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('Reports')}
          >
            <Text style={styles.menuText}>Meus Relatórios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('Profile')}
          >
            <Text style={styles.menuText}>Meu Perfil</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <Text style={[styles.menuText, { color: '#B42318' }]}>Sair do Aplicativo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modal: {
    position: 'absolute',
    right: 15,
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  menuItems: {

  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  }
});
