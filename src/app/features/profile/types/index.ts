export interface ContatoEmergencia {
  nome: string;
  telefone: string;
}
export interface PerfilUsuario {
  id: string;
  nome: string;
  contatoEmergencia: ContatoEmergencia | null;
}
