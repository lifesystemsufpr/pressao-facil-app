// Store da feature profile (estado em memória - Zustand removido)
//
// A store apenas retorna os dados mockados para que a interface continue
// funcionando sem depender da biblioteca zustand.

import type { PerfilUsuario } from '../types';
import { MOCK_PERFIL } from './mock';

interface PerfilState {
  perfil: PerfilUsuario | null;
  atualizarPerfil: (perfil: PerfilUsuario) => void;
}

export const usePerfilStore = (selector?: (state: PerfilState) => any) => {
  const state: PerfilState = {
    perfil: MOCK_PERFIL,
    atualizarPerfil: (perfil) => console.log('atualizarPerfil', perfil),
  };
  return selector ? selector(state) : state;
};
