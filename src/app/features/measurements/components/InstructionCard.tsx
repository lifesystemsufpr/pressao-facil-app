import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { instructions } from '../constants/instructions';
import { InstructionItem } from './InstructionItem';

const IMAGE_HEIGHT = Math.min(Dimensions.get('window').width * 0.55, 260);

export const InstructionCard = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                📋 Instruções de medição
            </Text>

            <View style={styles.imageWrapper}>
                <Image
                    source={require('../../../../../assets/measurement.jpg')}
                    style={styles.image}
                    resizeMode="contain"
                    accessibilityLabel="Ilustração mostrando a posição correta para medir a pressão arterial."
                />
            </View>

            <View style={styles.listContainer}>
                {instructions.map((item, index) => (
                    <InstructionItem 
                        key={item.title} 
                        instruction={item} 
                        showSeparator={index !== instructions.length - 1} 
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#0F172A',
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        elevation: 4,
        borderWidth: 1,
        borderColor: '#EEF2F7',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    imageWrapper: {
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        padding: 20,
        marginBottom: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: IMAGE_HEIGHT,
    },
    listContainer: {
        width: '100%',
    }
});
