import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { RootStackScreenProps } from '../../../shared/types/navigation';
import { Ionicons } from '@expo/vector-icons';

export const InstrucaoScreen = ({ navigation }: RootStackScreenProps<'InstrucaoModal'>) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
            Como medir{'\n'}corretamente
            </Text>

            <Text style={styles.subtitle}>
                Siga os passos abaixo para garantir um resultado preciso da sua pressão
        arterial.
            </Text>

            <View style={styles.tipsContainer}>
    {measurementTips.map((tip) => (
                <View
                    key={tip.id}
                    style={[
                        styles.tipCard,
                        //tip.id === 3 && styles.highlightedTipCard,
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name={tip.icon as keyof typeof Ionicons.glyphMap}
                            size={28}
                            color="#0068C9"
                        />
                    </View>

                    <View style={styles.tipContent}>
                        <Text style={styles.tipTitle}>
                            {tip.id}. {tip.title}
                        </Text>

                        <Text style={styles.tipDescription}>
                            {tip.description}
                        </Text>
                    </View>
                </View>
            ))}
        </View>

            <View style={styles.instructionsCard}>
                <Text style={styles.instructionsTitle}>
                Instruções de Medição
                </Text>

            <Image
                source={require('../../../../../assets/measurement.jpg')}
                style={styles.instructionsImage}
                resizeMode="contain"
            />

            {instructions.map((instruction, index) => (
                <Text key={instruction} style={styles.instructionText}>
                    {index + 1}. {instruction}
                </Text>
                ))}
            </View>

        <Pressable
        style={styles.button}
        onPress={()=> navigation.navigate('NovaMedicaoModal')}>
            
        <Text style={styles.buttonText}>
            Entendi, começar medição
        </Text>
    </Pressable>
    </ScrollView>
    );
};

const measurementTips = [
    {
        id: 1,
        title: 'Relaxe um pouco',
        description: 'Repouse por pelo menos 5 minutos em um ambiente calmo antes de começar.',
        icon: 'bed-outline',
    },
    {
        id: 2,
        title: 'Postura correta',
        description: 'Sente-se com as costas bem apoiadas na cadeira e os dois pés no chão.',
        icon: 'body-outline',
    },
    {
        id: 3,
        title: 'Braçadeira no lugar',
        description: 'Coloque a braçadeira no braço esquerdo, posicionando-a na altura do coração.',
        icon: 'fitness-outline',
    },
    {
        id: 4,
        title: 'Silêncio e quietude',
        description: 'Não fale e evite cruzar as pernas durante todo o processo de medição. ',
        icon: 'volume-mute-outline',
    },
];

const instructions = [
    'Sente-se confortavelmente com as costas apoiadas.',
    'Mantenha os pés apoiados no chão e não cruze as pernas.',
    'Apoie o braço esquerdo numa superfície plana, na altura do coração.',
    'Coloque a braçadeira corretamente e relaxe antes da medição.',
];

const cardBase = {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    elevation: 2,
};

const styles = StyleSheet.create({
    container: { flexGrow: 1,
        padding: 20 },

    title: { fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20 },

    subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
    },

    tipCard: {...cardBase,
        width:'100%',
        flexDirection:'row',
        alignItems:'center'
    },

    // highlightedTipCard: {
    //     backgroundColor: '#D9E9FF',
    // },


    tipsContainer: {
        width:'100%',
        gap: 16,
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

    tipContent: {
    flex: 1,
},

    tipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
},

    tipDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    },

    instructionsCard: {
    ...cardBase,
    width:'100%',
    marginTop: 16,
},

    instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
},

instructionsImage: {
    width: '100%',
    height: 170,
    marginBottom: 16,
    alignSelf: 'center',
},

instructionsList: {
    gap: 8,
    },

instructionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
},

button: {
    marginTop: 28,

    backgroundColor: '#0068C9',

    borderRadius: 28,

    height: 58,

    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
    },

    buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    },
});
