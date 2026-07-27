import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {Modal,Pressable,StyleSheet,Text,View} from 'react-native';

type AddAlertModalProps = {
    visible: boolean;
    onClose: () => void;
};
//define se o modal está aberto ou não

export const AddAlertModal = ({visible,onClose,}: AddAlertModalProps) => {
    return (
        <Modal
            visible={visible}
            //vem do estado que define se é visível ou nao
            transparent
            //true, mostra a tela atrás junto
            animationType="fade"
            //transição suave, ou podemos colocar slide que vem de baixo
            onRequestClose={onClose}
            //botão voltar fecha o modal
        >
            <View style={styles.overlay}>
                {/* fundo da tela que é transparente */}
                <View style={styles.modalContainer}>
                    {/* caixa, de fato o modal */}
                    <View style={styles.handle} />
                    {/* a barrinha cinza */}

                    <Text style={styles.title}>
                        Novo lembrete
                    </Text>

                    <Text style={styles.label}>
                        Dia selecionado
                    </Text>

                    <Pressable style={styles.field}>
                        {/* campo da data */}
                        <View style={styles.fieldContent}>
                            <Ionicons
                                name="calendar-outline"
                                size={22}
                                color="#0068C9"
                            />

                            <Text style={styles.fieldText}>
                                28 de julho de 2026
                            </Text>
                            {/* //texto mock */}
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color="#111827"
                        />
                    </Pressable>

                    <Text style={styles.label}>
                        Horário selecionado
                    </Text>

                    <Pressable style={styles.field}>
                        <View style={styles.fieldContent}>
                            <Ionicons
                                name="time-outline"
                                size={22}
                                color="#0068C9"
                            />

                            <Text style={styles.fieldText}>
                                08:00
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color="#111827"
                        />
                    </Pressable>

                    <View style={styles.actions}>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>
                                Cancelar
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.saveButton}
                            onPress={onClose}
                        >
                            <Text style={styles.saveButtonText}>
                                Salvar
                            </Text>
                        </Pressable>
                    </View>
                </View>
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
        justifyContent: 'space-between',
        minHeight: 62,
        marginBottom: 22,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
    },

     fieldContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    fieldText: {
        fontSize: 16,
        color: '#111827',
    },

    actions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
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
        flex: 1,
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
