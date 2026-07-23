// Store da feature profile (estado em memória)
//
// Nesta etapa NÃO há persistência (AsyncStorage/localStorage): a store apenas
// mantém os dados mockados em memória via Zustand. A persistência será
// adicionada numa etapa futura.

import { create } from 'zustand';
import type { PerfilUsuario } from '../types';
import { MOCK_PERFIL } from './mock';

interface PerfilState {
  perfil: PerfilUsuario | null;
  atualizarPerfil: (perfil: PerfilUsuario) => void;
}

export const usePerfilStore = create<PerfilState>((set) => ({
  perfil: MOCK_PERFIL,
  atualizarPerfil: (perfil) => set({ perfil }),
}));
