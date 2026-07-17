import React from 'react';
import { View, Text } from 'react-native';

// TODO: compõe AuthNavigator vs MainTabNavigator, importados via index.ts das features
export function RootNavigator() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Root Navigator Stub</Text>
    </View>
  );
}
