import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const FilterChip = ({ label, isActive, onPress, icon }: FilterChipProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive ? styles.activeContainer : styles.inactiveContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={14}
          color={isActive ? '#FFFFFF' : '#555555'}
          style={styles.icon}
        />
      )}
      <Text style={[styles.label, isActive ? styles.activeLabel : styles.inactiveLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  activeContainer: {
    backgroundColor: '#5AB2FF',
  },
  inactiveContainer: {
    backgroundColor: '#EAEAEA',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
  inactiveLabel: {
    color: '#555555',
  },
  icon: {
    marginRight: 6,
  },
});
