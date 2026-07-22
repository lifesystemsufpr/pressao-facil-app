import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../../../shared/types/navigation';

export const InstrucaoScreen = ({ navigation }: RootStackScreenProps<'InstrucaoModal'>) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Instruções de Uso</Text>
            <Button
                title="Iniciar"
                onPress={() => navigation.replace('NovaMedicaoModal')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
