// Store da feature profile (Offline-First)
//
// Zustand mantém o perfil de saúde em memória e o middleware `persist`
// serializa/reidrata automaticamente no AsyncStorage. As Telas NUNCA tocam o
// AsyncStorage diretamente — apenas consomem esta store.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PerfilUsuario } from '../types';
import { SEED_PERFIL } from './seed';

/** Chave única desta feature no AsyncStorage (ver README — Persistência). */
export const PERFIL_STORAGE_KEY = 'pressao-facil-storage-perfil';

interface PerfilState {
  perfil: PerfilUsuario | null;
  /** `true` depois que o Zustand terminou de ler o disco. */
  _hasHydrated: boolean;

  atualizarPerfil: (perfil: PerfilUsuario) => void;
  setHasHydrated: (value: boolean) => void;
}

export const usePerfilStore = create<PerfilState>()(
  persist(
    (set) => ({
      perfil: null,
      _hasHydrated: false,

      atualizarPerfil: (perfil) => set({ perfil }),

      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: PERFIL_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ perfil: state.perfil }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        // Em desenvolvimento, sem perfil cadastrado ainda, usamos o seed
        // para facilitar o trabalho na tela de Perfil.
        if (__DEV__ && state && state.perfil === null) {
          state.atualizarPerfil(SEED_PERFIL);
        }
      },
    }
  )
);
