import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configuração para quando a notificação é recebida e o app está aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const notificationService = {
  async requestPermissions() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('alerts', {
        name: 'Alertas de Medição',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      return finalStatus === 'granted';
    }
    
    return false;
  },

  async scheduleNotification(id: string, title: string, body: string, time: string) {
    // time format is "HH:mm"
    const [hours, minutes] = time.split(':').map(Number);

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hours,
        minute: minutes,
      },
      identifier: id, // Usamos o próprio ID do alerta como identificador para podermos cancelar depois
    });
  },

  async cancelNotification(id: string) {
    await Notifications.cancelScheduledNotificationAsync(id);
  },

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
};
