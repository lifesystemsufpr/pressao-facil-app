import axios from 'axios';
import { useSessionStore } from '../store/sessionStore';
import { Platform } from 'react-native';

// Para Android no emulador, localhost é 10.0.2.2.
// Para iOS no simulador ou Web, localhost funciona normalmente.
// Num dispositivo físico, você deve usar o IP da máquina na rede (ex: 192.168.0.x).
const getBaseUrl = () => {
  if (__DEV__) {
    // Como você usou "adb reverse", o localhost vai funcionar em qualquer dispositivo Android/iOS
    return 'http://localhost:3000';
  }
  return 'https://sua-api-em-producao.com';
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useSessionStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
