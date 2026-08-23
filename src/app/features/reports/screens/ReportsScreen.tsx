import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRelatorio } from '../hooks';
import { useProfileStore } from '../../profile/store';
import type { RelatorioData } from '../types';
import { FontAwesome5, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import type { Medicao } from '../../measurements';
import { exportReportToPDF } from '../services/pdfExport';
import { useState } from 'react';
import { Alert } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const COLORS = {
  primary: '#0056b3',
  primaryDark: '#004085',
  background: '#F8F9FA',
  card: '#FFFFFF',
  border: '#E2E8F0',
  textStrong: '#1A202C',
  textMuted: '#718096',
  success: '#38A169',
  info: '#3182CE',
  previewBg: '#F1F5F9',
  pillBg: '#EBF8FF',
  pillText: '#3182CE',
};

function formatarDataSimples(iso: string): string {
  const d = new Date(iso);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function formatarDataCurta(iso: string): string {
  const d = new Date(iso);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}`;
}

import { CONTEXTO_LABELS } from '../../measurements/types';

function formatarHora(iso: string): string {
  const d = new Date(iso);
  let horas = d.getHours();
  const minutos = String(d.getMinutes()).padStart(2, '0');
  const ampm = horas >= 12 ? 'PM' : 'AM';
  horas = horas % 12;
  horas = horas ? horas : 12;
  const strHoras = String(horas).padStart(2, '0');
  return `${strHoras}:${minutos} ${ampm}`;
}

const calcularStatus = (sys: number, dia: number) => {
  if (sys >= 140 || dia >= 90) return 'Alta';
  if (sys >= 130 || dia >= 85) return 'Elevada';
  return 'Normal';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Alta': return '#DC2626';
    case 'Elevada': return '#D97706';
    case 'Normal': return '#13B88A';
    default: return '#9CA3AF';
  }
};

const formatContexts = (contexts?: string[]) => {
  if (!contexts || contexts.length === 0) return 'Nenhum contexto';
  return contexts.map(c => c === 'briguei_com_alguem' ? 'Briguei com alguém' : c === 'apos_medicamento' ? 'Após medicamento' : CONTEXTO_LABELS[c as keyof typeof CONTEXTO_LABELS] || 'Nenhum contexto').join(', ');
};

function calcularIdade(dataStr: string): number {
  if (!dataStr) return 0;
  const partes = dataStr.split('/');
  if (partes.length !== 3) return 0;
  const nascimento = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

// -----------------------------------------------------------------------------
// Componente: O "Documento PDF" (Layout isolado que criamos na etapa anterior)
// -----------------------------------------------------------------------------
const PreviewDocument = ({ data, perfil }: { data: RelatorioData, perfil: any }) => {
  return (
    <View style={pdfStyles.container}>
      <View style={pdfStyles.body}>
        {/* Card Resumo */}
        <View style={pdfStyles.card}>
          <View style={pdfStyles.resumoGrid}>
            <View style={pdfStyles.resumoCol}>
              <Text style={pdfStyles.resumoLabel}>Média Sistólica:</Text>
              <Text style={pdfStyles.resumoValue}>{data.resumo.mediaSistolica ?? '--'} <Text style={pdfStyles.resumoUnit}>mmHg</Text></Text>
            </View>
            <View style={pdfStyles.resumoCol}>
              <Text style={pdfStyles.resumoLabel}>Média Diastólica:</Text>
              <Text style={pdfStyles.resumoValue}>{data.resumo.mediaDiastolica ?? '--'} <Text style={pdfStyles.resumoUnit}>mmHg</Text></Text>
            </View>
            <View style={pdfStyles.resumoCol}>
              <Text style={pdfStyles.resumoLabel}>Média Freq.:</Text>
              <Text style={pdfStyles.resumoValue}>{data.resumo.mediaFrequencia ?? '--'} <Text style={pdfStyles.resumoUnit}>bpm</Text></Text>
            </View>
            <View style={pdfStyles.resumoCol}>
              <Text style={pdfStyles.resumoLabel}>Total Medições:</Text>
              <Text style={pdfStyles.resumoValue}>{data.totalMedicoes}</Text>
            </View>
          </View>
        </View>

        {/* Tabela Completa */}
        <View style={[pdfStyles.card, { padding: 0, overflow: 'hidden' }]}>
          <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
            <Text style={[pdfStyles.cardTitle, { marginBottom: 0 }]}>TODAS AS MEDIÇÕES <Text style={pdfStyles.cardTitleLight}>({data.totalMedicoes})</Text></Text>
          </View>

          {data.medicoes.length === 0 ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: COLORS.textMuted, fontSize: 12 }}>Nenhuma medição registrada neste período.</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View style={pdfStyles.table}>
                <View style={[pdfStyles.tableHeaderRow, { width: 500, paddingHorizontal: 12 }]}>
                  <Text style={[pdfStyles.th, { width: 70 }]}>Data/Hora</Text>
                  <Text style={[pdfStyles.th, { width: 70 }]}>Pressão</Text>
                  <Text style={[pdfStyles.th, { width: 50 }]}>Freq.</Text>
                  <Text style={[pdfStyles.th, { width: 60 }]}>Status</Text>
                  <Text style={[pdfStyles.th, { width: 100 }]}>Contexto</Text>
                  <Text style={[pdfStyles.th, { width: 150 }]}>Observações</Text>
                </View>

                {data.medicoes.map((m: Medicao, index: number) => {
                  const status = calcularStatus(m.sistolica, m.diastolica);
                  const statusColor = getStatusColor(status);
                  
                  let contextoArray: string[] = [];
                  if (Array.isArray(m.contexto)) contextoArray = m.contexto;
                  else if (typeof m.contexto === 'string') contextoArray = [m.contexto];

                  return (
                    <View key={m.id} style={[pdfStyles.tableRow, { width: 500, paddingHorizontal: 12 }, index % 2 === 0 ? pdfStyles.tableRowEven : pdfStyles.tableRowOdd]}>
                      <View style={{ width: 70, justifyContent: 'center' }}>
                        <Text style={pdfStyles.td}>{formatarDataCurta(m.dataHora)}</Text>
                        <Text style={[pdfStyles.td, { fontSize: 8, color: COLORS.textMuted }]}>{formatarHora(m.dataHora)}</Text>
                      </View>
                      <View style={{ width: 70, justifyContent: 'center' }}>
                        <Text style={[pdfStyles.td, { fontWeight: 'bold' }]}>{m.sistolica} / {m.diastolica}</Text>
                        <Text style={[pdfStyles.td, { fontSize: 8, color: COLORS.textMuted }]}>mmHg</Text>
                      </View>
                      <View style={{ width: 50, justifyContent: 'center' }}>
                        <Text style={pdfStyles.td}>{m.frequenciaCardiaca}</Text>
                      </View>
                      
                      <View style={{ width: 60, justifyContent: 'center' }}>
                        <View style={{ backgroundColor: statusColor + '20', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                          <Text style={{ fontSize: 9, color: statusColor, fontWeight: 'bold' }}>{status}</Text>
                        </View>
                      </View>
                      
                      <View style={{ width: 100, justifyContent: 'center' }}>
                        <Text style={[pdfStyles.td, { fontSize: 9, color: COLORS.textMuted }]} numberOfLines={2}>
                          {formatContexts(contextoArray)}
                        </Text>
                      </View>
                      <View style={{ width: 150, justifyContent: 'center' }}>
                        <Text style={[pdfStyles.td, { fontSize: 9, color: COLORS.textMuted }]} numberOfLines={3}>
                          {m.observacao || '-'}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

import { useReportsStore } from '../store/useReportsStore';

// -----------------------------------------------------------------------------
// Componente: Tela Principal (Wrapper de Painel)
// -----------------------------------------------------------------------------
export const ReportsScreen = () => {
  const preferredPeriod = useReportsStore(state => state.preferredPeriod);
  const { data, loading, erro } = useRelatorio(preferredPeriod);
  const perfil = useProfileStore((s) => s.profile);
  const [exportingAction, setExportingAction] = useState<'download' | 'share' | null>(null);

  const handleExportPDF = async (action: 'download' | 'share') => {
    if (!data || data.vazio) {
      Alert.alert('Aviso', 'Não há medições neste período para exportar.');
      return;
    }
    
    setExportingAction(action);
    try {
      await exportReportToPDF(data, perfil, action);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível exportar o relatório.');
    } finally {
      setExportingAction(null);
    }
  };

  if (loading) {
    return (
      <View style={[styles.screen, styles.centered]}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (erro || !data || data.vazio) {
    return (
      <View style={[styles.screen, styles.centered]}>
        <Text>Sem dados para exibir.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatórios</Text>
        <Text style={styles.subtitle}>Seus dados de saúde prontos para envio.</Text>
      </View>

      {/* Cartão da Prévia */}
      <View style={styles.previewWrapper}>
        <View style={styles.previewTopRow}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Prévia</Text>
          </View>
          <Text style={styles.previewDateText}>Últimos 30 dias</Text>
        </View>

        {/* O container interno rolável simulando o PDF */}
        <View style={styles.pdfContainer}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true}>
            <PreviewDocument data={data} perfil={perfil} />
          </ScrollView>
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionsContainer}>
        {/* Botão Gerar PDF */}
        <TouchableOpacity 
          style={[styles.actionBtn, styles.btnPrimary, exportingAction !== null && { opacity: 0.7 }]}
          onPress={() => handleExportPDF('download')}
          disabled={exportingAction !== null}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#4285F4' }]}>
            <MaterialCommunityIcons name="file-document-outline" size={24} color="#FFF" />
          </View>
          <View style={styles.btnTextCol}>
            <Text style={[styles.btnTitle, { color: '#FFF' }]}>{exportingAction === 'download' ? 'Gerando...' : 'Baixar relatório PDF'}</Text>
            <Text style={[styles.btnSubtitle, { color: '#E2E8F0' }]}>Salvar arquivo no dispositivo</Text>
          </View>
        </TouchableOpacity>

        {/* Botão Compartilhar */}
        <TouchableOpacity 
          style={[styles.actionBtn, styles.btnSecondary, exportingAction !== null && { opacity: 0.7 }]}
          onPress={() => handleExportPDF('share')}
          disabled={exportingAction !== null}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#EBF8FF' }]}>
            <MaterialCommunityIcons name="share-variant" size={24} color={COLORS.info} />
          </View>
          <View style={styles.btnTextCol}>
            <Text style={[styles.btnTitle, { color: COLORS.textStrong }]}>{exportingAction === 'share' ? 'Gerando...' : 'Compartilhar relatório'}</Text>
            <Text style={[styles.btnSubtitle, { color: COLORS.textMuted }]}>Envie por WhatsApp ou email</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// -----------------------------------------------------------------------------
// Estilos
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textStrong,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  // Wrapper da prévia
  previewWrapper: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  previewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pill: {
    backgroundColor: COLORS.pillBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pillText: {
    color: COLORS.pillText,
    fontWeight: 'bold',
    fontSize: 12,
  },
  previewDateText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  pdfContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 380, // Limita a altura para aparecer no app sem ocupar a tela inteira
    backgroundColor: COLORS.previewBg,
    overflow: 'hidden',
  },
  // Botões
  actionsContainer: {
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  btnSecondary: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  btnTextCol: {
    flex: 1,
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  btnSubtitle: {
    fontSize: 13,
  },
});

// Estilos isolados do Documento PDF (menores para caber no preview)
const pdfStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    padding: 6,
    marginRight: 8,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  patientInfo: {
    color: '#E0E0E0',
    fontSize: 10,
  },
  patientInfoBold: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  body: {
    padding: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textStrong,
    marginBottom: 8,
  },
  cardTitleLight: {
    fontWeight: 'normal',
    color: COLORS.textMuted,
  },
  resumoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resumoCol: {
    alignItems: 'flex-start',
  },
  resumoLabel: {
    fontSize: 10,
    color: COLORS.textStrong,
    marginBottom: 2,
  },
  resumoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  resumoUnit: {
    fontSize: 11,
    color: COLORS.textStrong,
    fontWeight: 'normal',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIconCircle: {
    backgroundColor: COLORS.success,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  statusLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  statusValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textStrong,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  legendText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  table: {
    width: '100%',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  th: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textStrong,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tableRowOdd: {
    backgroundColor: '#FAFAFA',
  },
  tableRowEven: {
    backgroundColor: '#FFFFFF',
  },
  td: {
    fontSize: 10,
    color: COLORS.textStrong,
  },
});
