import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAlertsStore } from '../store/useAlertsStore';
import { PeriodoAlerta, AlertaEntity } from '../types';

type AddAlertModalProps = {
    visible: boolean;
    onClose: () => void;
    alertToEdit?: AlertaEntity | null;
};

export const AddAlertModal = ({ visible, onClose, alertToEdit }: AddAlertModalProps) => {
    const addAlert = useAlertsStore(s => s.addAlert);
    const updateAlert = useAlertsStore(s => s.updateAlert);
    const removeAlert = useAlertsStore(s => s.removeAlert);

    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');

    useEffect(() => {
        if (visible) {
            if (alertToEdit) {
                const [h, m] = alertToEdit.time.split(':');
                setHour(h);
                setMinute(m);
            } else {
                setHour('');
                setMinute('');
            }
        }
    }, [visible, alertToEdit]);

    const handleSave = () => {
        if (!hour.trim() || !minute.trim()) {
            Alert.alert("Erro", "Preencha o horário.");
            return;
        }

        const h = parseInt(hour, 10);
        const m = parseInt(minute, 10);

        if (isNaN(h) || h < 0 || h > 23 || isNaN(m) || m < 0 || m > 59) {
            Alert.alert("Erro", "Horário inválido.");
            return;
        }

        const formattedTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        
        let period: PeriodoAlerta;
        let generatedTitle = '';
        if (h < 12) {
            period = 'morning';
            generatedTitle = 'Medição da manhã';
        } else if (h < 18) {
            period = 'afternoon';
            generatedTitle = 'Medição da tarde';
        } else {
            period = 'evening';
            generatedTitle = 'Medição da noite';
        }

        if (alertToEdit) {
            updateAlert(alertToEdit.id, {
                title: generatedTitle,
                time: formattedTime,
                period
            });
        } else {
            addAlert({
                id: Date.now().toString(),
                title: generatedTitle,
                time: formattedTime,
                period,
                enabled: true
            });
        }

        onClose();
    };

    const handleDelete = () => {
        if (alertToEdit) {
            Alert.alert(
                "Excluir",
                "Tem certeza que deseja excluir este lembrete?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Excluir", style: "destructive", onPress: () => {
                        removeAlert(alertToEdit.id);
                        onClose();
                    }}
                ]
            );
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
                    style={styles.keyboardView}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.handle} />

                        <Text style={styles.title}>
                            {alertToEdit ? 'Editar lembrete' : 'Novo lembrete'}
                        </Text>

                        <Text style={styles.label}>Horário</Text>
                        <View style={styles.timeContainer}>
                            <View style={styles.timeField}>
                                <TextInput
                                    style={styles.timeInput}
                                    placeholder="HH"
                                    value={hour}
                                    onChangeText={setHour}
                                    keyboardType="number-pad"
                                    maxLength={2}
                                />
                            </View>
                            <Text style={styles.timeSeparator}>:</Text>
                            <View style={styles.timeField}>
                                <TextInput
                                    style={styles.timeInput}
                                    placeholder="MM"
                                    value={minute}
                                    onChangeText={setMinute}
                                    keyboardType="number-pad"
                                    maxLength={2}
                                />
                            </View>
                        </View>

                        <View style={styles.actions}>
                            {alertToEdit && (
                                <Pressable style={styles.deleteButton} onPress={handleDelete}>
                                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                                </Pressable>
                            )}
                            <Pressable style={styles.cancelButton} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </Pressable>
                            <Pressable style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    keyboardView: {
        width: '100%',
    },
    modalContainer: {
        width: '100%',
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 32,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        backgroundColor: '#FFFFFF',
    },
    handle: {
        alignSelf: 'center',
        width: 48,
        height: 5,
        marginBottom: 28,
        borderRadius: 999,
        backgroundColor: '#E5E7EB',
    },
    title: {
        marginBottom: 28,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },
    label: {
        marginBottom: 8,
        fontSize: 15,
        fontWeight: '500',
        color: '#111827',
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 62,
        marginBottom: 22,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        height: '100%',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 28,
        gap: 12,
    },
    timeField: {
        width: 80,
        height: 62,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeInput: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0068C9',
        textAlign: 'center',
        width: '100%',
        height: '100%',
    },
    timeSeparator: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        width: 52,
        borderWidth: 1,
        borderColor: '#FEE2E2',
        borderRadius: 14,
        backgroundColor: '#FEF2F2',
    },
    cancelButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 14,
        backgroundColor: '#F9FAFB',
    },
    cancelButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },
    saveButton: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderRadius: 14,
        backgroundColor: '#0068C9',
    },
    saveButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
