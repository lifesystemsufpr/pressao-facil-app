import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HamburgerMenuIcon = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => navigation.navigate('MenuScreen')}
    >
      <View style={styles.line} />
      <View style={styles.line} />
      <View style={styles.line} />
    </TouchableOpacity>
  );
};

// Precisamos importar View do react-native
import { View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 10,
    justifyContent: 'space-between',
    height: 38,
    width: 40,
  },
  line: {
    height: 3,
    backgroundColor: '#000',
    borderRadius: 2,
    width: 20,
  }
});
