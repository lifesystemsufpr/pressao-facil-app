// Seed de dados de exemplo para desenvolvimento.
//
// Usado apenas quando o perfil ainda não foi preenchido e o app roda em modo
// dev (__DEV__). Não deve ser usado em produção.

import type { PerfilUsuario } from '../types';

export const SEED_PERFIL: PerfilUsuario = {
  nome: 'João da Silva',
  idade: 68,
  tipoSanguineo: 'O+',
  pesoKg: 76,
  alturaM: 1.72,
};
