import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Instruction } from '../constants/instructions';

interface InstructionItemProps {
    instruction: Instruction;
    showSeparator: boolean;
}

export const InstructionItem = ({ instruction, showSeparator }: InstructionItemProps) => {
    return (
        <View 
            accessible 
            accessibilityRole="text"
            style={styles.container}
        >
            <View style={styles.contentRow}>
                <View style={styles.iconContainer}>
                    <Ionicons name={instruction.icon} size={28} color="#0068C9" />
                </View>
                
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{instruction.title}</Text>
                    <Text style={styles.description}>{instruction.description}</Text>
                </View>
            </View>

            {showSeparator && <View style={styles.separator} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 4,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#EAF3FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#4B5563',
    },
    separator: {
        height: 1,
        backgroundColor: '#EEF2F7',
        marginTop: 20,
        marginLeft: 68,
    },
});
