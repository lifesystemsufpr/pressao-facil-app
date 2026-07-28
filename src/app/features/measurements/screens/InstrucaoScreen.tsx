import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../../shared/types/navigation';
import { InstructionCard } from '../components/InstructionCard';
import { BottomAction } from '../components/BottomAction';

export const InstrucaoScreen = ({ navigation }: RootStackScreenProps<'InstrucaoModal'>) => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom', 'top', 'left', 'right']}>
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Como medir corretamente
                    </Text>
                    
                    <Text style={styles.subtitle}>
                        Siga estas orientações para obter uma medição de pressão arterial mais precisa.
                    </Text>
                </View>

                <InstructionCard />
            </ScrollView>

            <BottomAction onPress={() => navigation.navigate('NovaMedicaoModal')} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: '#F9F9FF',
    },
    scrollContent: { 
        flexGrow: 1,
        padding: 20,
        paddingBottom: 140, 
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: { 
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A202C',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
    },
});
