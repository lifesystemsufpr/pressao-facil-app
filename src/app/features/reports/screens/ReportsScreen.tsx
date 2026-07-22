import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRelatorio } from '../hooks';
import { PERIODO_LABELS } from '../types';
import type { RelatorioData } from '../types';

// Paleta de alto contraste voltada ao público idoso.
// (Tokens exatos do Figma não puderam ser extraídos — link privado; ver relatório.)
const COLORS = {
  background: '#F5F7FA',
  primary: '#0056b3',
  card: '#FFFFFF',
  border: '#D4DCE6',
  textStrong: '#1A1A2E',
  textMuted: '#4A5568',
  tagBg: '#E1EEFB',
  tagText: '#00408C',
  disabledBg: '#C7CED6',
  disabledText: '#5B6470',
};

/** Formata um ISO em dd/mm/aaaa sem depender de Intl (Hermes-safe). */
function formatarData(iso: string): string {
  const d = new Date(iso);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export const ReportsScreen = () => {
  const { data, loading, erro } = useRelatorio('30dias');

  if (loading) {
    return <ReportsSkeleton />;
  }

  if (erro) {
    return <ReportsMensagem titulo="Algo deu errado" mensagem={erro} />;
  }

  if (!data || data.vazio) {
    return <ReportsSemDados />;
  }

  return <ReportsComDados data={data} />;
};

// ---------------------------------------------------------------------------
// Estado: COM DADOS
// ---------------------------------------------------------------------------

const ReportsComDados = ({ data }: { data: RelatorioData }) => {
  const { resumo, intervalo } = data;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      accessibilityLabel="Tela de relatórios com dados de saúde"
    >
      <Text style={styles.title} accessibilityRole="header">
        Relatórios
      </Text>
      <Text style={styles.subtitle}>
        Seus dados de saúde prontos para envio.
      </Text>

      <View
        style={styles.card}
        accessible
        accessibilityLabel={
          `Prévia do relatório, ${PERIODO_LABELS[data.periodo]}. ` +
          `${data.totalMedicoes} medições. ` +
          `Pressão média ${resumo.mediaSistolica} por ${resumo.mediaDiastolica}. ` +
          `Frequência cardíaca média ${resumo.mediaFrequencia} batimentos por minuto.`
        }
      >
        <View style={styles.cardHeader}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Prévia</Text>
          </View>
          <Text style={styles.periodo}>{PERIODO_LABELS[data.periodo]}</Text>
        </View>

        <Text style={styles.intervalo}>
          {formatarData(intervalo.inicio)} até {formatarData(intervalo.fim)}
        </Text>

        <View style={styles.divider} />

        <LinhaResumo
          rotulo="Medições no período"
          valor={String(data.totalMedicoes)}
        />
        <LinhaResumo
          rotulo="Pressão média"
          valor={`${resumo.mediaSistolica}/${resumo.mediaDiastolica} mmHg`}
        />
        <LinhaResumo
          rotulo="Frequência média"
          valor={`${resumo.mediaFrequencia} bpm`}
        />
      </View>

      <BotoesAcao habilitado />
    </ScrollView>
  );
};

const LinhaResumo = ({ rotulo, valor }: { rotulo: string; valor: string }) => (
  <View style={styles.linhaResumo}>
    <Text style={styles.linhaRotulo}>{rotulo}</Text>
    <Text style={styles.linhaValor}>{valor}</Text>
  </View>
);

// ---------------------------------------------------------------------------
// Estado: SEM DADOS
// ---------------------------------------------------------------------------

const ReportsSemDados = () => (
  <View
    style={[styles.screen, styles.centered]}
    accessibilityLabel="Tela de relatórios sem dados"
  >
    <Text style={styles.title} accessibilityRole="header">
      Relatórios
    </Text>
    <Text style={styles.emptyTitle}>Nenhuma medição ainda</Text>
    <Text style={styles.emptyMensagem}>
      Registre suas medições de pressão para gerar um relatório e compartilhar
      com seu médico ou familiares.
    </Text>

    <BotoesAcao habilitado={false} />
  </View>
);

const ReportsMensagem = ({
  titulo,
  mensagem,
}: {
  titulo: string;
  mensagem: string;
}) => (
  <View style={[styles.screen, styles.centered]}>
    <Text style={styles.title} accessibilityRole="header">
      Relatórios
    </Text>
    <Text style={styles.emptyTitle}>{titulo}</Text>
    <Text style={styles.emptyMensagem}>{mensagem}</Text>
  </View>
);

// ---------------------------------------------------------------------------
// Estado: CARREGANDO (skeleton)
// ---------------------------------------------------------------------------

const ReportsSkeleton = () => (
  <View
    style={styles.screen}
    accessibilityLabel="Carregando relatório"
    accessibilityRole="progressbar"
  >
    <View style={styles.content} importantForAccessibility="no-hide-descendants">
      <View style={[styles.skeleton, styles.skelTitle]} />
      <View style={[styles.skeleton, styles.skelSubtitle]} />
      <View style={[styles.skeleton, styles.skelCard]} />
      <View style={[styles.skeleton, styles.skelButton]} />
    </View>
  </View>
);

// ---------------------------------------------------------------------------
// Botões de ação (PDF / compartilhar — funcionalidade fica para rodada futura)
// ---------------------------------------------------------------------------

const BotoesAcao = ({ habilitado }: { habilitado: boolean }) => {
  // NÃO implementado nesta rodada: geração de PDF e compartilhamento.
  const noop = () => {};

  return (
    <View style={styles.acoes}>
      <TouchableOpacity
        style={[styles.botao, !habilitado && styles.botaoDesabilitado]}
        onPress={noop}
        disabled={!habilitado}
        accessibilityRole="button"
        accessibilityState={{ disabled: !habilitado }}
        accessibilityLabel="Gerar relatório em PDF"
        accessibilityHint={
          habilitado
            ? 'Cria um arquivo PDF com suas medições'
            : 'Indisponível: nenhuma medição registrada'
        }
      >
        <Text
          style={[styles.botaoTexto, !habilitado && styles.botaoTextoDesabilitado]}
        >
          Gerar PDF
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.botao,
          styles.botaoSecundario,
          !habilitado && styles.botaoDesabilitado,
        ]}
        onPress={noop}
        disabled={!habilitado}
        accessibilityRole="button"
        accessibilityState={{ disabled: !habilitado }}
        accessibilityLabel="Compartilhar relatório"
        accessibilityHint={
          habilitado
            ? 'Envia o relatório para seu médico ou familiares'
            : 'Indisponível: nenhuma medição registrada'
        }
      >
        <Text
          style={[
            styles.botaoTexto,
            styles.botaoTextoSecundario,
            !habilitado && styles.botaoTextoDesabilitado,
          ]}
        >
          Compartilhar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginBottom: 20,
    lineHeight: 26,
  },

  // Card de prévia
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 24,
    // sombra suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: COLORS.tagBg,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tagText: {
    color: COLORS.tagText,
    fontSize: 15,
    fontWeight: '700',
  },
  periodo: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textStrong,
  },
  intervalo: {
    fontSize: 15,
    color: COLORS.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  linhaRotulo: {
    fontSize: 17,
    color: COLORS.textMuted,
    flexShrink: 1,
    paddingRight: 12,
  },
  linhaValor: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.textStrong,
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
    marginBottom: 28,
    maxWidth: 360,
  },

  // Botões
  acoes: {
    gap: 12,
  },
  botao: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  botaoSecundario: {
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  botaoDesabilitado: {
    backgroundColor: COLORS.disabledBg,
    borderColor: COLORS.disabledBg,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
  botaoTextoSecundario: {
    color: COLORS.primary,
  },
  botaoTextoDesabilitado: {
    color: COLORS.disabledText,
  },

  // Skeleton
  skeleton: {
    backgroundColor: '#E3E8EF',
    borderRadius: 12,
  },
  skelTitle: {
    height: 34,
    width: '55%',
    marginBottom: 12,
  },
  skelSubtitle: {
    height: 20,
    width: '80%',
    marginBottom: 24,
  },
  skelCard: {
    height: 220,
    width: '100%',
    borderRadius: 16,
    marginBottom: 24,
  },
  skelButton: {
    height: 56,
    width: '100%',
    borderRadius: 14,
  },
});
