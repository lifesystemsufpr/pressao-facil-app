import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const TipCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.icon}>💡</Text>
                <Text style={styles.title}>Dica</Text>
            </View>
            <Text style={styles.text}>
                Seguir essas orientações ajuda a obter uma medição mais confiável e reduz possíveis erros na leitura da pressão arterial.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F7FF', // fundo azul muito claro
        borderWidth: 1,
        borderColor: '#D4E6FC', // borda azul clara
        borderRadius: 16,
        padding: 16,
        marginTop: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        fontSize: 18,
        marginRight: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0068C9', // título azul
    },
    text: {
        fontSize: 14,
        lineHeight: 22,
        color: '#374151',
    },
});
