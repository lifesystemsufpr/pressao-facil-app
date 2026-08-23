import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlertsStore, AlertaEntity } from '../types';
import { notificationService } from '../services/notificationService';

const defaultAlerts: AlertaEntity[] = [];

export const useAlertsStore = create<AlertsStore>()(
  persist(
    (set) => ({
      alerts: defaultAlerts,
      _hasHydrated: false,

      addAlert: (alert) => {
        set((state) => ({
          ...state,
          alerts: [...state.alerts, alert],
        }));
        
        // Se o alerta nasce habilitado, agenda
        if (alert.enabled) {
          notificationService.scheduleNotification(
            alert.id,
            'Hora de Medir a Pressão!',
            `Lembrete configurado para ${alert.time}: ${alert.title}`,
            alert.time
          );
        }
      },

      updateAlert: (id, partial) => {
        set((state) => {
          const newAlerts = state.alerts.map((alert) =>
            alert.id === id ? { ...alert, ...partial } : alert
          );
          
          // Re-agendar a notificação
          const updatedAlert = newAlerts.find(a => a.id === id);
          if (updatedAlert) {
            if (updatedAlert.enabled) {
              notificationService.scheduleNotification(
                updatedAlert.id,
                'Hora de Medir a Pressão!',
                `Lembrete configurado para ${updatedAlert.time}: ${updatedAlert.title}`,
                updatedAlert.time
              );
            } else {
              notificationService.cancelNotification(id);
            }
          }
          
          return {
            ...state,
            alerts: newAlerts,
          };
        });
      },

      removeAlert: (id) => {
        set((state) => ({
          ...state,
          alerts: state.alerts.filter((alert) => alert.id !== id),
        }));
        notificationService.cancelNotification(id);
      },

      toggleAlert: (id) => {
        set((state) => {
          const newAlerts = state.alerts.map(alert => 
            alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
          );
          
          const toggledAlert = newAlerts.find(a => a.id === id);
          if (toggledAlert) {
            if (toggledAlert.enabled) {
              notificationService.scheduleNotification(
                toggledAlert.id,
                'Hora de Medir a Pressão!',
                `Lembrete configurado para ${toggledAlert.time}: ${toggledAlert.title}`,
                toggledAlert.time
              );
            } else {
              notificationService.cancelNotification(id);
            }
          }

          return {
            ...state,
            alerts: newAlerts,
          };
        });
      },

      setHasHydrated: (hasHydrated) => {
        set((state) => ({ ...state, _hasHydrated: hasHydrated }));
      },
    }),
    {
      name: 'pressao-facil-storage-alerts',
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
      migrate: (persistedState: any, version: number) => {
        if (version < 2) {
          // Limpa os alertas mockados antigos (que tinham ID '1' ou '2')
          // Ou simplesmente zera a lista para evitar que o usuário veja mocks persistidos
          return {
            ...persistedState,
            alerts: [],
          };
        }
        return persistedState as AlertsStore;
      },
    }
  )
);
