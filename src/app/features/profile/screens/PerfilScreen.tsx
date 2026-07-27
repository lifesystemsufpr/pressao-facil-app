import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { usePerfil } from '../hooks';
import type { PerfilUsuario } from '../types';

// Mesma paleta de alto contraste usada na tela de Relatórios, para manter
// consistência visual entre as telas do app.
const COLORS = {
  background: '#F5F7FA',
  primary: '#0056b3',
  card: '#FFFFFF',
  border: '#D4DCE6',
  textStrong: '#1A1A2E',
  textMuted: '#4A5568',
  danger: '#C0392B',
};

export const PerfilScreen = () => {
  const { perfil, loading } = usePerfil();

  if (loading) {
    return <PerfilSkeleton />;
  }

  if (!perfil) {
    return <PerfilSemDados />;
  }

  return <PerfilComDados perfil={perfil} />;
};

// ---------------------------------------------------------------------------
// Estado: COM DADOS
// ---------------------------------------------------------------------------

const PerfilComDados = ({ perfil }: { perfil: PerfilUsuario }) => {
  const handleExportarDados = () => {
    Alert.alert(
      'Exportar Dados (PDF)',
      'Essa funcionalidade estará disponível em breve.'
    );
  };

  const handleSobre = () => {
    Alert.alert(
      'Sobre o Pressão Fácil',
      'Pressão Fácil é um aplicativo mobile de monitoramento de pressão ' +
        'arterial, feito para tornar o acompanhamento da saúde cardiovascular ' +
        'simples, acessível e tranquilizador.\n\nVersão 1.0.0'
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      accessibilityLabel="Tela de perfil"
    >
      <Text style={styles.title} accessibilityRole="header">
        Perfil
      </Text>

      <View
        style={styles.card}
        accessible
        accessibilityLabel={
          `${perfil.nome}, ${perfil.idade} anos, tipo sanguíneo ${perfil.tipoSanguineo}. ` +
          `Peso ${perfil.pesoKg} quilos, altura ${perfil.alturaM} metros.`
        }
      >
        <Text style={styles.nome}>{perfil.nome}</Text>

        <View style={styles.statsRow}>
          <StatBox rotulo="Idade" valor={`${perfil.idade}`} unidade="anos" />
          <StatBox
            rotulo="Tipo Sanguíneo"
            valor={perfil.tipoSanguineo}
            valorCor={COLORS.danger}
          />
        </View>
        <View style={styles.statsRow}>
          <StatBox rotulo="Peso" valor={`${perfil.pesoKg}`} unidade="kg" />
          <StatBox rotulo="Altura" valor={`${perfil.alturaM}`} unidade="m" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Configurações</Text>
      <View style={styles.divider} />

      <ItemConfiguracao
        icone="⬆"
        rotulo="Exportar Dados (PDF)"
        onPress={handleExportarDados}
        accessibilityHint="Indisponível: funcionalidade em desenvolvimento"
      />
      <ItemConfiguracao
        icone="ⓘ"
        rotulo="Sobre o Pressão Fácil"
        onPress={handleSobre}
        accessibilityHint="Mostra informações sobre o aplicativo"
      />
    </ScrollView>
  );
};

const StatBox = ({
  rotulo,
  valor,
  unidade,
  valorCor,
}: {
  rotulo: string;
  valor: string;
  unidade?: string;
  valorCor?: string;
}) => (
  <View style={styles.statBox}>
    <Text style={styles.statRotulo}>{rotulo}</Text>
    <Text style={[styles.statValor, valorCor ? { color: valorCor } : null]}>
      {valor}
      {unidade ? <Text style={styles.statUnidade}> {unidade}</Text> : null}
    </Text>
  </View>
);

const ItemConfiguracao = ({
  icone,
  rotulo,
  onPress,
  accessibilityHint,
}: {
  icone: string;
  rotulo: string;
  onPress: () => void;
  accessibilityHint: string;
}) => (
  <TouchableOpacity
    style={styles.itemConfig}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={rotulo}
    accessibilityHint={accessibilityHint}
  >
    <Text style={styles.itemIcone}>{icone}</Text>
    <Text style={styles.itemRotulo}>{rotulo}</Text>
    <Text style={styles.itemChevron}>›</Text>
  </TouchableOpacity>
);

// ---------------------------------------------------------------------------
// Estado: SEM DADOS (perfil ainda não preenchido)
// ---------------------------------------------------------------------------

const PerfilSemDados = () => (
  <View
    style={[styles.screen, styles.centered]}
    accessibilityLabel="Tela de perfil sem dados"
  >
    <Text style={styles.title} accessibilityRole="header">
      Perfil
    </Text>
    <Text style={styles.emptyTitle}>Perfil ainda não preenchido</Text>
    <Text style={styles.emptyMensagem}>
      Cadastre seus dados de saúde para manter suas informações sempre à mão
      em caso de emergência.
    </Text>
  </View>
);

// ---------------------------------------------------------------------------
// Estado: CARREGANDO (skeleton)
// ---------------------------------------------------------------------------

const PerfilSkeleton = () => (
  <View
    style={styles.screen}
    accessibilityLabel="Carregando perfil"
    accessibilityRole="progressbar"
  >
    <View style={styles.content} importantForAccessibility="no-hide-descendants">
      <View style={[styles.skeleton, styles.skelTitle]} />
      <View style={[styles.skeleton, styles.skelCard]} />
      <View style={[styles.skeleton, styles.skelItem]} />
      <View style={[styles.skeleton, styles.skelItem]} />
    </View>
  </View>
);

// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    gap: 8,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.textStrong,
    marginBottom: 20,
  },

  // Card principal
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    marginBottom: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textStrong,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statRotulo: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  statValor: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statUnidade: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textMuted,
  },

  // Configurações
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textStrong,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 8,
  },
  itemConfig: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemIcone: {
    fontSize: 20,
    width: 32,
    color: COLORS.textStrong,
  },
  itemRotulo: {
    flex: 1,
    fontSize: 18,
    color: COLORS.textStrong,
  },
  itemChevron: {
    fontSize: 22,
    color: COLORS.textMuted,
  },

  // Estado vazio
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textStrong,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMensagem: {
    fontSize: 18,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 360,
  },

  // Skeleton
  skeleton: {
    backgroundColor: '#E3E8EF',
    borderRadius: 12,
  },
  skelTitle: {
    height: 34,
    width: '40%',
    marginBottom: 20,
  },
  skelCard: {
    height: 240,
    width: '100%',
    borderRadius: 16,
    marginBottom: 28,
  },
  skelItem: {
    height: 60,
    width: '100%',
    borderRadius: 12,
    marginBottom: 12,
  },
});
