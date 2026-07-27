// Dados mockados de perfil para desenvolvimento/demonstração.
//
// Nesta etapa não há persistência (AsyncStorage/localStorage): mantido apenas
// em memória.

import type { PerfilUsuario } from '../types';

export const MOCK_PERFIL: PerfilUsuario = {
  nome: 'João da Silva',
  idade: 68,
  tipoSanguineo: 'O+',
  pesoKg: 76,
  alturaM: 1.72,
};
