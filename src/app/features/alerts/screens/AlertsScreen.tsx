import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { AddAlertModal } from '../components/AddAlertModal';

import { useAlertsStore } from '../store/useAlertsStore';
import { AlertaEntity } from '../types';

export const AlertsScreen = () => {

    const alerts = useAlertsStore(state => state.alerts);
    const toggleAlert = useAlertsStore(state => state.toggleAlert);
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAlert, setEditingAlert] = useState<AlertaEntity | null>(null);

    const handleToggleAlert = (alertId: string) => {
        toggleAlert(alertId);
    };

    const handleAddReminder = () => {
        setEditingAlert(null);
        setIsModalVisible(true);
    };

    const handleEditReminder = (alert: AlertaEntity) => {
        setEditingAlert(alert);
        setIsModalVisible(true);
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Meus Alertas
                    </Text>

                    <Text style={styles.subtitle}>
                        Gerencie seus horários para suas medições diárias.
                    </Text>
                </View>

                {alerts.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={48} color="#D1D5DB" />
                        <Text style={styles.emptyText}>Nenhum alerta configurado.</Text>
                    </View>
                ) : (
                    <View style={styles.alertsContainer}>
                        {alerts.map((alert) => {
                            return (
                                <Pressable
                                    key={alert.id}
                                    style={[
                                        styles.alertCard,
                                        !alert.enabled && styles.disabledCard,
                                    ]}
                                    onPress={() => handleEditReminder(alert)}
                                >
                                    <View style={styles.cardHeader}>
                                        <View style={styles.alertInformation}>
                                            <View style={styles.alertTitleContainer}>
                                                <Ionicons
                                                    name={alert.period === 'morning' ? 'sunny-outline' : alert.period === 'afternoon' ? 'partly-sunny-outline' : 'moon'}
                                                    size={20}
                                                    color={alert.enabled ? '#0068C9' : '#818894'} 
                                                />
                                                <Text style={[styles.alertTitle, !alert.enabled && styles.disabledText]}>
                                                    {alert.title}
                                                </Text>
                                            </View>
                                            <Text style={[styles.alertTime, !alert.enabled && styles.disabledText]}>
                                                {alert.time}
                                            </Text>
                                        </View>
                                        <Switch
                                            value={alert.enabled}
                                            onValueChange={() => handleToggleAlert(alert.id)}
                                            trackColor={{ false: '#D1D5DB', true: '#0068C9' }}
                                            thumbColor="#FFFFFF" 
                                        />
                                    </View>

                                    <View style={styles.frequencyBadge}>
                                        <Ionicons name="calendar-outline" size={13} color="#6B7280" />
                                        <Text style={styles.frequencyText}>
                                            Todos os dias
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                )}

                <Pressable style={styles.button} onPress={handleAddReminder}>
                    <Ionicons name="add" size={18} color="#FFFFFF" />
                    <Text style={styles.buttonText}>
                        Adicionar lembrete
                    </Text>
                </Pressable>
            </ScrollView>
            <AddAlertModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                alertToEdit={editingAlert} 
            />
        </>
    );
};

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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F7FC'
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
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    
    emptyText: {
        marginTop: 12,
        fontSize: 16,
        color: '#9CA3AF',
        fontWeight: '500',
    },

    alertsContainer: {
        width: '100%',
        gap: 16,
    },

    alertCard: {
        ...cardBase,
        width: '100%',
    },

    disabledCard: {
        backgroundColor: '#F3F4F6',
        opacity: 0.75,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    alertInformation: {
        flex: 1,
        marginRight: 16,
    },

    alertTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    alertTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },

    alertTime: {
        marginTop: 4,
        fontSize: 36,
        lineHeight: 42,
        fontWeight: '700',
        color: '#0068C9',
    },

    disabledText: {
        color: '#6B7280',
    },

    frequencyBadge: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 14,
        backgroundColor: '#F3F4F6',
    },

    frequencyText: {
        fontSize: 12,
        color: '#6B7280',
    },

    button: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 'auto',
        paddingHorizontal: 18,
        height: 46,
        borderRadius: 14,
        backgroundColor: '#0068C9',
    },

    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});