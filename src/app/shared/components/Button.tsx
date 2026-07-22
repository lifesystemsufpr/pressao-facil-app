import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export const PrimaryButton = ({ title, onPress, iconName, style }: CustomButtonProps) => (
  <TouchableOpacity style={[styles.baseButton, styles.primaryButton, style]} onPress={onPress}>
    {iconName && <Ionicons name={iconName} size={20} color="#FFFFFF" style={styles.icon} />}
    <Text style={[styles.baseText, styles.primaryText]}>{title}</Text>
  </TouchableOpacity>
);

export const SecondaryButton = ({ title, onPress, iconName, style }: CustomButtonProps) => (
  <TouchableOpacity style={[styles.baseButton, styles.secondaryButton, style]} onPress={onPress}>
    {iconName && <Ionicons name={iconName} size={20} color="#1F2937" style={styles.icon} />}
    <Text style={[styles.baseText, styles.secondaryText]}>{title}</Text>
  </TouchableOpacity>
);

export const DangerButton = ({ title, onPress, iconName, style }: CustomButtonProps) => (
  <TouchableOpacity style={[styles.baseButton, styles.dangerButton, style]} onPress={onPress}>
    {iconName && <Ionicons name={iconName} size={20} color="#D32F2F" style={styles.icon} />}
    <Text style={[styles.baseText, styles.dangerText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
  primaryButton: {
    backgroundColor: '#5AAEFF',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  secondaryText: {
    color: '#1F2937',
  },
  dangerButton: {
    backgroundColor: '#FCEAEA',
  },
  dangerText: {
    color: '#D32F2F',
  },
});
