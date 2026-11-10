import axios from 'axios';
import { useSessionStore } from '../store/sessionStore';

// A URL vem de EXPO_PUBLIC_API_URL, definida por perfil no eas.json.
// Sem ela (desenvolvimento local), usa localhost com "adb reverse tcp:3000 tcp:3000".
const getBaseUrl = () => process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

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
