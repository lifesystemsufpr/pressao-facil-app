// Hooks da feature profile
//
// Papel de "cola": lê o perfil da store e expõe para a UI um contrato
// simples { perfil, loading }, sem a tela precisar conhecer o Zustand.

import { usePerfilStore } from '../store';
import type { PerfilUsuario } from '../types';

export interface UsePerfilResult {
  /** Dados do perfil. `null` enquanto carrega ou se ainda não há perfil salvo. */
  perfil: PerfilUsuario | null;
  /** `true` enquanto o AsyncStorage não terminou de reidratar. */
  loading: boolean;
}

export function usePerfil(): UsePerfilResult {
  const perfil = usePerfilStore((s) => s.perfil);
  const hasHydrated = usePerfilStore((s) => s._hasHydrated);

  return { perfil, loading: !hasHydrated };
}
