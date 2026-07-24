import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { AddAlertModal } from '../components/AddAlertModal';

type AlertItem = {
    id: number;
    title: string;
    time: string;
    period: 'morning' | 'evening';
    enabled: boolean;
};
//obj para definir o alerta

export const AlertsScreen = () => {

    const [alerts, setAlerts] = useState(mockAlerts);
    //estado para utilizar a função handleToggleAlert de abilitar e desabilitar o alerta
    const [isModalVisible, setIsModalVisible]=useState(false);

    const handleToggleAlert = (alertId: number) => {
        //função que abilita e desabilita o alerta
        //função que usa o ID do alert já existente, ele rastreia o Id e muda o estado
        setAlerts((currentAlerts) =>
            //pegue a lista mais recente de alertas
            currentAlerts.map((alert) =>
                //varre a lista até encontrar o id detectado
                alert.id === alertId
                    //se for o id q eu procuro...
                    ? { ...alert, enabled: !alert.enabled }
                    //[...] se abilitado, desabilite ouu se desabilitado, abilite.
                    : alert
                // caso não seja o alerta que procuro, deixe do jeito que está
            ))
    };

    const handleAddReminder = () => {
        setIsModalVisible(true);
    };
    //abre o modal Add lembrete

    return (
        //container de scroll
        <>
            {/* //container de scroll */}
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>
                    Meus Alertas
                </Text>

                <Text style={styles.subtitle}>
                    Gerencie seus horários para suas medições diárias.
                </Text>

                <View style={styles.alertsContainer}>
                    {alerts.map((alert) => {
                        //alerts veio do estado, alert foi criado pelo map para iteração
                        //map varre os alertas e ve um alert por vez
                        return (
                            <View
                                key={alert.id}
                                //pegue cada item da lista e add o style
                                style={[
                                    styles.alertCard,
                                    //crie um card no estilo padrao
                                    !alert.enabled && styles.disabledCard,
                                    //se desabilitado = aplique o estilo
                                    //se nao = nao aplique
                                ]}
                            >
                                <View style={styles.cardHeader}>
                                    <View style={styles.alertInformation}>
                                        <View style={styles.alertTitleContainer}>
                                            <Ionicons
                                                name={alert.period === 'morning'
                                                    //se for de manhã
                                                    ? 'sunny-outline'
                                                    //coloque o sol
                                                    : 'moon'
                                                    //se não, a lua
                                                }
                                                size={20}
                                                color={alert.enabled
                                                    //se tiver abilitado
                                                    ? '#0068C9'
                                                    //deixe em azul
                                                    : '#818894'
                                                    //se não, em cinza
                                                } />

                                            <Text
                                                style={[
                                                    styles.alertTitle,
                                                    !alert.enabled && styles.disabledText,
                                                ]}
                                            >
                                                {alert.title}
                                            </Text>
                                        </View>
                                        <Text
                                            style={[
                                                styles.alertTime,
                                                //a hora que aparece no card
                                                !alert.enabled && styles.disabledText,
                                            ]}
                                        >
                                            {alert.time}
                                        </Text>
                                    </View>
                                    <Switch
                                        //recebe do map se o alert da vez está abilitado ou não
                                        value={alert.enabled}
                                        //diz qual é o estado
                                        onValueChange={() => handleToggleAlert(alert.id)
                                            //quando clicar no botão de alerta do alerta de x id
                                        }
                                        trackColor={{
                                            false: '#D1D5DB',
                                            //se value=false desabilitado
                                            true: '#0068C9',
                                            //se value=true abilitado
                                        }}
                                        thumbColor="#FFFFFF" />
                                </View>

                                <View style={styles.frequencyBadge}>
                                    <Ionicons
                                        name="calendar-outline"
                                        size={13}
                                        color="#6B7280" />

                                    <Text style={styles.frequencyText}>
                                        Todos os dias
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                <Pressable
                    style={styles.button}
                    onPress={handleAddReminder}>

                    <Ionicons
                        name="add"
                        size={18}
                        color="#FFFFFF" />

                    <Text style={styles.buttonText}>
                        Adicionar lembrete
                    </Text>
                </Pressable>
            </ScrollView>
            <AddAlertModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)} />
            </>
)};

const mockAlerts: AlertItem[] = [
    {
        id: 1,
        title: 'Medição da manhã',
        time: '08:00',
        period: 'morning',
        enabled: true,
    },
    {
        id: 2,
        title: 'Medição da tarde',
        time: '18:00',
        period: 'evening',
        enabled: false,
    },
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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F7FC'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },

    subtitle: {
        marginTop: 8,
        marginBottom: 24,
        fontSize: 15,
        lineHeight: 22,
        color: '#6B7280',
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