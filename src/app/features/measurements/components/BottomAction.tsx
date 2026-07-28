import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface BottomActionProps {
    onPress: () => void;
}

export const BottomAction = ({ onPress }: BottomActionProps) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel="Iniciar medição"
                accessibilityHint="Abre a tela para iniciar uma nova medição da pressão arterial."
            >
                <Text style={styles.buttonText}>
                    Iniciar medição
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#EEF2F7',
    },
    button: {
        backgroundColor: '#0068C9',
        borderRadius: 16,
        height: 58,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});
