// Types da feature profile
//
// Modelo de Domínio Limpo (Offline-First): esta interface é exatamente o que
// é serializado e persistido no AsyncStorage pela store.

/** Tipos sanguíneos possíveis (sistema ABO + fator Rh). */
export type TipoSanguineo = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

/** Contato de emergência, sempre visível para situações de urgência. */
export interface ContatoEmergencia {
  nome: string;
  telefone: string;
}

/**
 * Perfil de saúde do usuário.
 */
export interface PerfilUsuario {
  nome: string;
  idade: number;
  tipoSanguineo: TipoSanguineo;
  /** Peso em quilogramas. */
  pesoKg: number;
  /** Altura em metros (ex.: 1.72). */
  alturaM: number;
  contatoEmergencia?: ContatoEmergencia;
}
