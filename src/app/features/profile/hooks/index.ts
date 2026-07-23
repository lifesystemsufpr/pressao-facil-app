// Hooks da feature profile
//
// Papel de "cola": lê o perfil (mockado, em memória) da store e expõe para a
// UI um contrato simples { perfil, loading }, sem a tela conhecer o Zustand.

import { useEffect, useState } from 'react';
import { usePerfilStore } from '../store';
import type { PerfilUsuario } from '../types';

export interface UsePerfilResult {
  /** Dados do perfil. `null` enquanto carrega. */
  perfil: PerfilUsuario | null;
  /** `true` durante o carregamento inicial (dispara o skeleton). */
  loading: boolean;
}

export function usePerfil(): UsePerfilResult {
  const perfil = usePerfilStore((s) => s.perfil);

  // Dados mockados (sem persistência nesta etapa). Carregamento simulado para
  // exercitar o estado de "skeleton".
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return { perfil: loading ? null : perfil, loading };
}
