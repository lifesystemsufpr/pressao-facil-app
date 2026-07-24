import React from 'react';
import { View, Text, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { RootStackScreenProps } from '../../../shared/types/navigation';

export const NovaMedicaoScreen = ({ navigation }: RootStackScreenProps<'NovaMedicaoModal'>) => {
  return (
    <ScrollView>
      <View style={styles.measurementsRow}>
        {/* container da medição das pressoes em linha */}
        <Pressable style={styles.measurementCard}>
          <Text>
            Sistólica (Maior)
          </Text>
          <Text>
            120
          </Text>
          <Text>
            mmHg
          </Text>
        </Pressable>

        <Pressable style={styles.measurementCard}>
          <Text>
            Diastólica (Menor)
          </Text>
          <Text>
            80
          </Text>
          <Text>
            mmHg
          </Text>
        </Pressable>
        </View>

        


        {/* // Logica de salvar
        // navigation.goBack(); */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 110,
        backgroundColor: '#F8F7FC',
    },

    measurementsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },

    measurementCard: {
        flex: 1,
        minHeight: 120,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderTopWidth: 3,
        borderTopColor: '#0068C9',
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
    }
    });