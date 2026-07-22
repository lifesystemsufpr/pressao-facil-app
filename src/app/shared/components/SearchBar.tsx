import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SearchBar = (props: TextInputProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar por data ou nota..."
        placeholderTextColor="#888888"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: '#ECEFF3',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
});
