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
import { usePerfilStore } from '../../profile/store';
import type { RelatorioData } from '../types';
import { FontAwesome5, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import type { Medicao } from '../../measurements';

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

// -----------------------------------------------------------------------------
// Componente: O "Documento PDF" (Layout isolado que criamos na etapa anterior)
// -----------------------------------------------------------------------------
const PreviewDocument = ({ data, perfil }: { data: RelatorioData, perfil: any }) => {
  return (
    <View style={pdfStyles.container}>
      {/* Header do PDF */}
      <View style={pdfStyles.header}>
        <View style={pdfStyles.headerLeft}>
          <View style={pdfStyles.logoContainer}>
            <FontAwesome5 name="heartbeat" size={20} color={COLORS.primary} />
          </View>
          <View>
            <Text style={pdfStyles.headerTitle}>Pressão</Text>
            <Text style={pdfStyles.headerTitle}>Fácil</Text>
          </View>
        </View>
        <View style={pdfStyles.headerRight}>
          <Text style={pdfStyles.patientInfo}>
            Paciente: <Text style={pdfStyles.patientInfoBold}>{perfil?.nome || 'Usuário'}</Text>
          </Text>
          <Text style={pdfStyles.patientInfo}>
            Data de Nasc.: <Text style={pdfStyles.patientInfoBold}>{'15/05/1978'}</Text>
          </Text>
        </View>
      </View>

      <View style={pdfStyles.body}>
        {/* Card Resumo */}
        <View style={pdfStyles.card}>
          <Text style={pdfStyles.cardTitle}>RESUMO <Text style={pdfStyles.cardTitleLight}>(Últimos 30 Dias)</Text></Text>

          <View style={pdfStyles.resumoGrid}>
            <View style={pdfStyles.resumoCol}>
              <Text style={pdfStyles.resumoLabel}>Média Sistólica:</Text>
              <Text style={pdfStyles.resumoValue}>{data.resumo.mediaSistolica} <Text style={pdfStyles.resumoUnit}>mmHg</Text></Text>
            </View>
            <View style={pdfStyles.resumoCol}>
              <Text style={pdfStyles.resumoLabel}>Média Diastólica:</Text>
              <Text style={pdfStyles.resumoValue}>{data.resumo.mediaDiastolica} <Text style={pdfStyles.resumoUnit}>mmHg</Text></Text>
            </View>
            <View style={pdfStyles.resumoCol}>
              <Text style={pdfStyles.resumoLabel}>Média de Pulso:</Text>
              <Text style={pdfStyles.resumoValue}>{data.resumo.mediaFrequencia} <Text style={pdfStyles.resumoUnit}>bpm</Text></Text>
            </View>
          </View>
        </View>

        {/* Card Tendências */}
        <View style={pdfStyles.card}>
          <View style={pdfStyles.cardHeaderRow}>
            <Text style={pdfStyles.cardTitle}>TENDÊNCIAS DE PRESSÃO ARTERIAL <Text style={pdfStyles.cardTitleLight}>(Últimos 30 Dias)</Text></Text>
          </View>

          <View style={pdfStyles.legendRow}>
            <View style={pdfStyles.legendItem}>
              <View style={[pdfStyles.legendDot, { backgroundColor: COLORS.primary }]} />
              <Text style={pdfStyles.legendText}>Sistólica</Text>
            </View>
            <View style={pdfStyles.legendItem}>
              <View style={[pdfStyles.legendDot, { backgroundColor: '#87CEFA' }]} />
              <Text style={pdfStyles.legendText}>Diastólica</Text>
            </View>
          </View>

          {/* Gráfico de Linhas 100% Nativo (Sem SVG) para evitar o crash "topSvgLayout" do Expo 52/Fabric */}
          <View style={{ height: 190, marginTop: 10, alignItems: 'center' }}>
            <View style={{ width: screenWidth - 80, height: 150, backgroundColor: 'transparent', position: 'relative' }}>

              {/* Linhas de grade horizontais e Eixo Y */}
              {[0, 50, 100, 150, 200].map((val) => {
                // Normaliza Y para que 0 seja embaixo (150) e 200 seja no topo (0)
                const yPos = 150 - (val / 200) * 150;
                return (
                  <View key={`grid-${val}`} style={{ position: 'absolute', left: 30, right: 0, top: yPos, height: 1, backgroundColor: COLORS.border, borderStyle: 'dashed' }}>
                    <Text style={{ position: 'absolute', left: -30, top: -7, fontSize: 9, color: COLORS.textMuted, width: 25, textAlign: 'right' }}>{val}</Text>
                  </View>
                );
              })}

              {/* Plotando os pontos e linhas */}
              {(() => {
                const recentData = data.medicoes.slice(0, 10).reverse();
                if (recentData.length === 0) return null;

                const width = screenWidth - 80;
                const height = 150;
                const minX = 30; // Ajustado para dar espaço ao eixo Y
                const maxX = width - 10;

                // Normalizando Y (0 a 200 mmHg)
                const getY = (val: number) => height - (Math.min(val, 200) / 200) * height;
                const getX = (index: number) => minX + (index * (maxX - minX) / Math.max(1, recentData.length - 1));

                // Função para renderizar segmentos de linha usando Views rotacionadas
                const renderLines = (dataPoints: number[], color: string) => {
                  const segments = [];
                  for (let i = 0; i < dataPoints.length - 1; i++) {
                    const x1 = getX(i);
                    const y1 = getY(dataPoints[i]);
                    const x2 = getX(i + 1);
                    const y2 = getY(dataPoints[i + 1]);

                    const dx = x2 - x1;
                    const dy = y2 - y1;
                    const length = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx);

                    const cx = (x1 + x2) / 2;
                    const cy = (y1 + y2) / 2;

                    segments.push(
                      <View
                        key={`line-${color}-${i}`}
                        style={{
                          position: 'absolute',
                          left: cx - length / 2,
                          top: cy - 1, // metade da espessura
                          width: length,
                          height: 2,
                          backgroundColor: color,
                          transform: [{ rotate: `${angle}rad` }]
                        }}
                      />
                    );
                  }
                  return segments;
                };

                // Função para renderizar os pontos (bolinhas)
                const renderDots = (dataPoints: number[], color: string) => {
                  return dataPoints.map((val, i) => (
                    <View
                      key={`dot-${color}-${i}`}
                      style={{
                        position: 'absolute',
                        left: getX(i) - 4,
                        top: getY(val) - 4,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: color,
                      }}
                    />
                  ));
                };

                const sisValues = recentData.map((m: Medicao) => m.sistolica);
                const diaValues = recentData.map((m: Medicao) => m.diastolica);

                return (
                  <>
                    {/* Segmentos de Linha */}
                    {renderLines(sisValues, COLORS.primary)}
                    {renderLines(diaValues, '#87CEFA')}

                    {/* Pontos nas extremidades */}
                    {renderDots(sisValues, COLORS.primary)}
                    {renderDots(diaValues, '#87CEFA')}
                  </>
                );
              })()}
            </View>

            {/* Eixo X - Datas */}
            <View style={{ position: 'relative', width: screenWidth - 80, height: 20, marginTop: 6 }}>
              {(() => {
                const recentData = data.medicoes.slice(0, 10).reverse();
                if (recentData.length === 0) return null;
                const minX = 30;
                const maxX = (screenWidth - 80) - 10;
                const getX = (index: number) => minX + (index * (maxX - minX) / Math.max(1, recentData.length - 1));

                return recentData.map((m: Medicao, i: number) => {
                  // Mostrar todos os labels se houver pouco espaço, ou alternar se houver muitos
                  // Como limitamos a 10, mostrar todos pode ficar apertado. Exibimos alternado ou com fonte bem pequena.
                  return (
                    <Text
                      key={`date-${i}`}
                      style={{
                        position: 'absolute',
                        left: getX(i) - 15,
                        top: 0,
                        fontSize: 8,
                        color: COLORS.textMuted,
                        width: 30,
                        textAlign: 'center'
                      }}
                    >
                      {formatarDataCurta(m.dataHora)}
                    </Text>
                  );
                });
              })()}
            </View>
          </View>
        </View>

        {/* Card Medições Recentes */}
        <View style={pdfStyles.card}>
          <Text style={pdfStyles.cardTitle}>MEDIÇÕES RECENTES <Text style={pdfStyles.cardTitleLight}>(Últimos 30 dias)</Text></Text>

          <View style={pdfStyles.table}>
            <View style={pdfStyles.tableHeaderRow}>
              <Text style={[pdfStyles.th, { flex: 2 }]}>Data</Text>
              <Text style={[pdfStyles.th, { flex: 2 }]}>Hora</Text>
              <Text style={[pdfStyles.th, { flex: 1.5 }]}>Sis</Text>
              <Text style={[pdfStyles.th, { flex: 1.5 }]}>Dia</Text>
              <Text style={[pdfStyles.th, { flex: 1 }]}>BPM</Text>
            </View>

            {data.medicoes.slice(0, 7).map((m: Medicao, index: number) => (
              <View key={m.id} style={[pdfStyles.tableRow, index % 2 === 0 ? pdfStyles.tableRowEven : pdfStyles.tableRowOdd]}>
                <Text style={[pdfStyles.td, { flex: 2 }]}>{formatarDataSimples(m.dataHora)}</Text>
                <Text style={[pdfStyles.td, { flex: 2 }]}>{formatarHora(m.dataHora)}</Text>
                <Text style={[pdfStyles.td, { flex: 1.5 }]}>{m.sistolica}</Text>
                <Text style={[pdfStyles.td, { flex: 1.5 }]}>{m.diastolica}</Text>
                <Text style={[pdfStyles.td, { flex: 1 }]}>{m.frequenciaCardiaca}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------
// Componente: Tela Principal (Wrapper de Painel)
// -----------------------------------------------------------------------------
export const ReportsScreen = () => {
  const { data, loading, erro } = useRelatorio('30dias');
  const perfil = usePerfilStore((s) => s.perfil);

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
        <TouchableOpacity style={[styles.actionBtn, styles.btnPrimary]}>
          <View style={[styles.iconCircle, { backgroundColor: '#4285F4' }]}>
            <MaterialCommunityIcons name="file-document-outline" size={24} color="#FFF" />
          </View>
          <View style={styles.btnTextCol}>
            <Text style={[styles.btnTitle, { color: '#FFF' }]}>Gerar relatório PDF</Text>
            <Text style={[styles.btnSubtitle, { color: '#E2E8F0' }]}>Baixe para imprimir ou guardar</Text>
          </View>
        </TouchableOpacity>

        {/* Botão Compartilhar */}
        <TouchableOpacity style={[styles.actionBtn, styles.btnSecondary]}>
          <View style={[styles.iconCircle, { backgroundColor: '#EBF8FF' }]}>
            <MaterialCommunityIcons name="share-variant" size={24} color={COLORS.info} />
          </View>
          <View style={styles.btnTextCol}>
            <Text style={[styles.btnTitle, { color: COLORS.textStrong }]}>Compartilhar relatório</Text>
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
