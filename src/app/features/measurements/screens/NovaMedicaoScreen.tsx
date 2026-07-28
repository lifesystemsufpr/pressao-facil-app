import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type MeasurementContext = {
    id: number;
    label: string;
    selected: boolean;
};

export const NovaMedicaoScreen = () => {
    const navigation = useNavigation();
    const [measurementContexts, setMeasurementContexts] = useState(
        mockMeasurementContexts
    );
    //estado que começa com o array de mock
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const currentDate = `${day}/${month}/${year}`;
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const currentHour = `${h}:${m}`;

    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [date, setDate] = useState(currentDate);
    const [hour, setHour] = useState(currentHour);

    const handleSetSystolic = (text: string) => setSystolic(text.replace(/[^0-9]/g, ''));
    const handleSetDiastolic = (text: string) => setDiastolic(text.replace(/[^0-9]/g, ''));
    const handleSetHeartRate = (text: string) => setHeartRate(text.replace(/[^0-9]/g, ''));
    const handleSetDate = (text: string) => setDate(text.replace(/[^0-9/]/g, ''));
    const handleSetHour = (text: string) => setHour(text.replace(/[^0-9:]/g, ''));

    const handleToggleContext = (contextId: number) => {
        //uso o handle quando preciso aplicar alguma lógica, mascara etc
        //função que marca ou desmarca a caixa de contexto
        //pega o id do contexto que foi clicado
        setMeasurementContexts((currentContexts) =>
            //pegue a lista mais recente de contextos
            currentContexts.map((context) =>
                //varre a lista até achar o id detectado
                context.id === contextId
                //se for o id que eu procuro
                    ? {
                        ...context,
                        //copie todas as infos do contexto
                        selected: !context.selected,
                        //se foi marcado, desmarque e vice versa
                    }
                    : context
                     // caso não seja o contexto que procuro, deixe do jeito que está
            )
        );
    };
    const handleSave = () => {
        if (!systolic.trim() || !diastolic.trim() || !heartRate.trim() || !date.trim() || !hour.trim()) {
            Alert.alert(
                "Campos Obrigatórios",
                "Por favor, preencha todos os dados da medição antes de salvar."
            );
            return;
        }

        Alert.alert(
            "Salvar Medição",
            "Confirma que deseja salvar os dados desta medição?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Salvar", 
                    onPress: () => {
                        // Redireciona para a tela de resultados global 
                        (navigation as any).navigate('ResultadosMedicaoModal', { id: '1' });
                    }
                }
            ]
        );
    };

    return (

        <ScrollView
    style={styles.scrollView}
    contentContainerStyle={styles.container}
>

            <View style={styles.measurementsRow}>
                {/* container da medição das pressoes em linha */}
                <View style={styles.measurementCard}>

                    <Text style={styles.measurementLabel}>
                        Sistólica (Maior)
                    </Text>
                    <TextInput
                        style={styles.measurementInput}
                        value={systolic}
                        onChangeText={handleSetSystolic}
                        keyboardType="numeric"
                        maxLength={3}
                        selectTextOnFocus
                        placeholder="--"
                        placeholderTextColor="#C4CAD4"
                    />
                    <Text style={styles.measurementUnit}>
                        mmHg
                    </Text>
                </View>

                <View style={styles.measurementCard}>
                    <Text style={styles.measurementLabel}>
                        Diastólica (Menor)
                    </Text>
                    <TextInput
                        style={styles.measurementInput}
                        value={diastolic}
                        onChangeText={handleSetDiastolic}
                        keyboardType="numeric"
                        maxLength={3}
                        selectTextOnFocus
                        placeholder="--"
                        placeholderTextColor="#C4CAD4"
                    />
                    <Text style={styles.measurementUnit}>
                        mmHg
                    </Text>
                </View>
            </View>

            <View style={styles.heartRateCard}>
                <View style={styles.cardTitle}>
                    <Ionicons
                        name="heart"
                        size={18}
                        color="#DC2626" />

                    <Text style={styles.heartRateTitle}>
                        Frequência Cardíaca
                    </Text>

                </View>

                <TextInput
                        style={styles.measurementInput}
                        value={heartRate}
                        onChangeText={handleSetHeartRate}
                        keyboardType="numeric"
                        maxLength={3}
                        selectTextOnFocus
                        placeholder="--"
                        placeholderTextColor="#C4CAD4"
                />

                <Text style={styles.measurementUnit}>
                    bpm
                </Text>
            </View>

            <View style={styles.dateTimeRow}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>
                        Data
                    </Text>

                    <View style={styles.field}>

                        <TextInput
                        style={styles.fieldText}
                        value={date}
                        onChangeText={handleSetDate}
                        keyboardType="numeric"
                        maxLength={10}
                        selectTextOnFocus
                />
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>
                        Hora
                    </Text>

                    <View style={styles.field}>
                        <TextInput
                        style={styles.fieldText}
                        value={hour}
                        onChangeText={handleSetHour}
                        keyboardType="numeric"
                        maxLength={9}
                        selectTextOnFocus
                />
                    </View>
                </View>
            </View>
            {/* // Logica de salvar
        // navigation.goBack(); */}
            <Text style={styles.sectionTitle}>Contexto da medição</Text>

            {measurementContexts.map((context) => (
                <Pressable
                    key={context.id}
                    style={[
                styles.contextCard,
                context.selected && styles.selectedContextCard,
            ]}
                    onPress={() => handleToggleContext(context.id)}
                >
                    <View style={[styles.checkbox, context.selected && styles.selectedCheckbox]}>

                    </View>

                    <Text>{context.label}</Text>
                </Pressable>
            ))}
            <View style={styles.observationContainer}>
                <View style={styles.observationHeader}>
                    <Ionicons name="reorder-three-outline" size={26} />
                    <Text style={styles.observationTitle}>Observações</Text>
                </View>

                <TextInput
                    style={styles.observationInput}
                    multiline
                    placeholder="Digite suas observações..."
                />
            </View>

            <Pressable style={styles.saveButton} onPress={handleSave}>
                <Ionicons name="save-outline" size={16} color='#FFFFFF'/>
                <Text style={styles.saveButtonText}>
                    Salvar medição
                </Text>
            </Pressable>
        </ScrollView>
    )
};

const mockMeasurementContexts: MeasurementContext[] = [
    {
        id: 1,
        label: 'Antes do café',
        selected: false,
    },
    {
        id: 2,
        label: 'Após atividade física',
        selected: false,
    },
    {
        id: 3,
        label: 'Após medicamento',
        selected: false,
    },
];

const cardBase = {
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
};

const styles = StyleSheet.create({
    scrollView: {
    flex: 1,
},
    container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#F8F7FC',
},

    measurementsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },

    measurementCard: {
        ...cardBase,
        flex: 1,
        minHeight: 120,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderTopWidth: 3,
        borderTopColor: '#0068C9',
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

    measurementInput: {
    minWidth: 80,
    paddingVertical: 0,
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
},
    heartRateCard: {
        ...cardBase,
        minHeight: 126,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 3,
        borderTopColor: '#DC2626',
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
        color: '#00000',
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
    sectionTitle: {
        marginBottom: 10,
        fontSize: 13,
        fontWeight: '600',
        color: '#4B5563',
    },

    contextsContainer: {
        gap: 10,
        marginBottom: 5,
    },
    contextCard: {
        minHeight: 48,
        flexDirection: 'row',
        alignItems: 'center',
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
    selectedContextCard: {
        borderColor: '#0068C9',
        backgroundColor: '#EFF6FF',
    },

    checkbox: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth: 1.5,
        borderColor: '#C7CDD6',
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    selectedCheckbox: {
        borderColor: '#0068C9',
        backgroundColor: '#0068C9',
    },

    contextText: {
        flex: 1,
        fontSize: 13,
        color: '#4B5563',
    },

    selectedContextText: {
        fontWeight: '600',
        color: '#0068C9',
    },
    observationContainer: {
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#F8F7FC',
    },

    observationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 10,
    },
    observationTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#4B5563',
        textTransform: 'uppercase',
    },
    observationInput: {
        minHeight: 90,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E0E4EA',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        fontSize: 13,
        lineHeight: 20,
        color: '#374151',
        textAlignVertical: 'top',
    },
    saveButton: {
        minHeight: 54,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 4,
        marginBottom: 8,
        paddingHorizontal: 20,
        borderRadius: 18,
        backgroundColor: '#0073C6',
        shadowColor: '#0068C9',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 4,
    },

    saveButtonPressed: {
        opacity: 0.85,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    }

});