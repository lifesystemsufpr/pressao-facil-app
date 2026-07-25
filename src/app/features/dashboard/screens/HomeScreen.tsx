import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../shared/types/navigation';
import { useProfile } from '../../onboarding';

const chartValues = [0, 0, 0, 0, 0, 0, 0];

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { profile } = useProfile();
  const firstName = profile?.fullName.split(/\s+/)[0];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>{firstName ? `Bom dia, ${firstName}` : 'Bom dia'}</Text>
        <Text style={styles.subtitle}>Seu painel de saúde diário.</Text>

        <View style={[styles.card, styles.pressureCard]}>
          <View style={styles.rowBetween}>
            <Text style={styles.eyebrow}>ÚLTIMA MEDIÇÃO</Text>
            <View style={styles.timeBadge}><Text style={styles.timeBadgeText}>Sem registros</Text></View>
          </View>
          <View style={styles.pressureRow}>
            <Text style={styles.systolic}>0</Text>
            <Text style={styles.diastolic}> / 0</Text>
            <Text style={styles.unit}>mmHg</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.badgeRow}>
            <View style={[styles.statusBadge, styles.heartBadge]}>
              <Ionicons name="heart" size={18} color="#C61D24" /><Text style={styles.statusText}>0 bpm</Text>
            </View>
            <View style={[styles.statusBadge, styles.normalBadge]}>
              <View style={styles.grayDot} /><Text style={styles.statusText}>Sem medição</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.card, styles.nextMeasurement]}>
          <View style={styles.clockCircle}><Ionicons name="time-outline" size={27} color="#075E9F" /></View>
          <View style={styles.flex}>
            <Text style={styles.nextLabel}>Próxima medição</Text>
            <Text style={styles.nextTime}>--:--</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#7B8290" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Resumo do dia</Text>
        <View style={[styles.card, styles.summaryCard]}>
          <View style={styles.pendingMeasurement}>
            <Ionicons name="ellipse-outline" size={23} color="#A7ADBA" />
            <Text style={[styles.summaryText, styles.pendingText]}>Medição da manhã</Text>
            <Text style={styles.pendingStatus}>Pendente</Text>
          </View>
          <View style={styles.pendingMeasurement}>
            <Ionicons name="ellipse-outline" size={23} color="#A7ADBA" />
            <Text style={[styles.summaryText, styles.pendingText]}>Medição da tarde</Text>
            <Text style={styles.pendingStatus}>Pendente</Text>
          </View>
        </View>

        <View style={[styles.card, styles.chartCard]}>
          <View style={styles.rowBetween}>
            <Text style={styles.eyebrow}>ÚLTIMOS 7 DIAS</Text>
            <Ionicons name="stats-chart-outline" size={21} color="#76808F" />
          </View>
          <View style={styles.chart}>
            {chartValues.map((value, index) => (
              <View style={styles.barColumn} key={`${value}-${index}`}>
                <View style={[styles.bar, { height: Math.max(2, value) }, index === 6 && styles.activeBar]} />
                <Text style={[styles.day, index === 6 && styles.activeDay]}>
                  {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][index]}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('InstrucaoModal')}>
        <Ionicons name="add" size={38} color="#FFFFFF" />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9F9FF' },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 130 },
  greeting: { color: '#20232B', fontSize: 30, fontWeight: '800' },
  subtitle: { color: '#555B67', fontSize: 16, marginTop: 4, marginBottom: 28 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, shadowColor: '#1D2939',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 3 },
  pressureCard: { padding: 17 }, rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { color: '#505664', fontSize: 13, fontWeight: '800', letterSpacing: 0.7 },
  timeBadge: { backgroundColor: '#FFFFFF', paddingHorizontal: 9, paddingVertical: 7, borderRadius: 7 },
  timeBadgeText: { color: '#555B67', fontSize: 12, fontWeight: '700' },
  pressureRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 12 },
  systolic: { color: '#0567B8', fontSize: 58, lineHeight: 62, fontWeight: '800' },
  diastolic: { color: '#257FAE', fontSize: 31, lineHeight: 44, fontWeight: '800' },
  unit: { color: '#444A57', fontSize: 15, marginLeft: 11, marginBottom: 9 },
  divider: { height: 1, backgroundColor: '#ECEEF3', marginVertical: 13 },
  badgeRow: { flexDirection: 'row', gap: 20 },
  statusBadge: { paddingHorizontal: 12, height: 34, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 7 },
  heartBadge: { backgroundColor: '#FFF0F2' }, normalBadge: { backgroundColor: '#E3F6F1' },
  statusText: { color: '#282C34', fontSize: 13, fontWeight: '700' },
  greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#13B88A' },
  grayDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#98A2B3' },
  nextMeasurement: { marginTop: 24, padding: 16, flexDirection: 'row', alignItems: 'center' },
  clockCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#68C1F5',
    alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  flex: { flex: 1 }, nextLabel: { color: '#555B67', fontSize: 13, fontWeight: '700' },
  nextTime: { color: '#20232B', fontSize: 24, marginTop: 3 },
  sectionTitle: { color: '#20232B', fontSize: 23, fontWeight: '800', marginTop: 28, marginBottom: 12 },
  summaryCard: { padding: 16, gap: 12 },
  doneMeasurement: { height: 51, paddingHorizontal: 12, borderRadius: 7, backgroundColor: '#EDF4FF',
    borderWidth: 1, borderColor: '#D2E4FD', flexDirection: 'row', alignItems: 'center', gap: 12 },
  pendingMeasurement: { height: 51, paddingHorizontal: 12, borderRadius: 7, borderWidth: 1,
    borderColor: '#C7CEDD', borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', gap: 12 },
  summaryText: { flex: 1, color: '#263D57', fontSize: 15 }, doneTime: { color: '#1976C9', fontSize: 13, fontWeight: '700' },
  pendingText: { color: '#808692' }, pendingStatus: { color: '#969BA5', fontSize: 13, fontWeight: '700' },
  chartCard: { marginTop: 25, padding: 17 },
  chart: { height: 130, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 16 },
  barColumn: { height: 120, width: '12%', alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: '100%', backgroundColor: '#87C7F5', borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  activeBar: { backgroundColor: '#0567B8' }, day: { color: '#767D8C', marginTop: 9, fontSize: 12, fontWeight: '700' },
  activeDay: { color: '#0567B8' },
  fab: { position: 'absolute', right: 20, bottom: 22, width: 64, height: 64, borderRadius: 18,
    backgroundColor: '#0567B8', alignItems: 'center', justifyContent: 'center', elevation: 6,
    shadowColor: '#0567B8', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
});
