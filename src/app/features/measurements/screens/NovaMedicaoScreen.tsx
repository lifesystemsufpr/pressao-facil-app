import React from 'react';
import { View, Text, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { RootStackScreenProps } from '../../../shared/types/navigation';
import { Ionicons } from '@expo/vector-icons';

export const NovaMedicaoScreen = ({ navigation }: RootStackScreenProps<'NovaMedicaoModal'>) => {
  return (
    <ScrollView>
              
      <View style={styles.measurementsRow}>
        {/* container da medição das pressoes em linha */}
        <Pressable style={[styles.measurementCard, styles.systolicCard]}>
          
          <Text style={styles.measurementLabel}>
            Sistólica (Maior)
          </Text>
          <Text style={styles.measurementValue}>
            120
          </Text>
          <Text style={styles.measurementUnit}>
            mmHg
          </Text>
        </Pressable>

        <Pressable style={styles.measurementCard}>
          <Text style={styles.measurementLabel}>
            Diastólica (Menor)
          </Text>
          <Text style={styles.measurementValue}>
            80
          </Text>
          <Text style={styles.measurementUnit}>
            mmHg
          </Text>
        </Pressable>
        </View>

        <Pressable style={styles.heartRateCard}>
          <View style={styles.cardTitle}>
            <Ionicons 
                name="heart"
                size={18}
                color="#DC2626" />
            <Text style={styles.heartRateTitle}>
              Frequência Cardíaca
            </Text>
            
          </View>
          <Text style={styles.measurementValue}>
            70
          </Text>

          <Text style={styles.measurementUnit}>
            bpm
          </Text>
        </Pressable>

        <View style={styles.dateTimeRow}>
          <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                Data
              </Text>

              <Pressable style={styles.field}>
                  <Text style={styles.fieldText}>
                  10/27/2023
                  </Text>
              </Pressable>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>
            Hora
            </Text>

            <Pressable style={styles.field}>
                <Text style={styles.fieldText}>
                  08:35
                </Text>
            </Pressable>
        </View>
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
    },

    systolicCard: {
        borderTopColor: '#0068C9',
    },

    diastolicCard: {
        borderTopColor: '#E9A23B',
    },

    measurementLabel: {
        marginBottom: 8,
        fontSize: 13,
        fontWeight: '600',
        color: '#4B5563',
        textAlign: 'center',
    },
    measurementValue: {
        fontSize: 40,
        lineHeight: 46,
        fontWeight: '700',
        color: '#C4CAD4',
    },

    measurementUnit: {
        marginTop: 4,
        fontSize: 11,
        fontWeight: '500',
        color: '#6B7280',
    },
    heartRateCard: {
        minHeight: 126,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 3,
        borderTopColor: '#DC2626',
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
    },

    cardTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },

    heartRateTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#7F1D1D',
    },
    heartRateValue: {
        fontSize: 40,
        lineHeight: 46,
        fontWeight: '700',
        color: '#C4CAD4',
    },

    heartRateUnit: {
        marginTop: 4,
        fontSize: 11,
        fontWeight: '500',
        color: '#6B7280',
    },
    dateTimeRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 18,
    },

    fieldContainer: {
        flex: 1,
    },

    fieldLabel: {
        marginBottom: 6,
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },

    field: {
        minHeight: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E0E4EA',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOpacity: 0.03,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 1,
    },

    fieldText: {
        fontSize: 13,
        color: '#374151',
    },



    });