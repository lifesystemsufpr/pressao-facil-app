import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MeasurementsScreenProps } from '../../../shared/types/navigation';
import { SearchBar, FilterChip } from '../../../shared/components';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';
import { BloodPressureCard, BloodPressureMeasurement } from '../components/BloodPressureCard';
import { MeasurementStatus } from '../components/StatusBadge';

import { useMedicoesStore } from '../store/useMedicoesStore';

const calcularStatus = (sys: number, dia: number): MeasurementStatus => {
  if (sys >= 140 || dia >= 90) return 'Alta';
  if (sys >= 130 || dia >= 85) return 'Elevada';
  return 'Normal';
};

const formatarData = (isoStr: string) => {
  const date = new Date(isoStr);
  const hoje = new Date();
  const isHoje = date.getDate() === hoje.getDate() && date.getMonth() === hoje.getMonth() && date.getFullYear() === hoje.getFullYear();
  const isOntem = date.getDate() === hoje.getDate() - 1 && date.getMonth() === hoje.getMonth() && date.getFullYear() === hoje.getFullYear();
  
  const pad = (n: number) => String(n).padStart(2, '0');
  const h = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  
  if (isHoje) return `Hoje, ${h}`;
  if (isOntem) return `Ontem, ${h}`;
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}, ${h}`;
};

export const HistoricoMedicoesScreen = ({ navigation }: MeasurementsScreenProps<'HistoricoMedicoes'>) => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (text: string) => {
    // Máscara de entrada para Data (DD/MM/AAAA)
    let v = text.replace(/\D/g, '');
    if (v.length > 8) v = v.substring(0, 8);
    if (v.length > 4) {
      v = v.replace(/^(\d{2})(\d{2})(\d{1,4}).*/, '$1/$2/$3');
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{1,2}).*/, '$1/$2');
    }
    setSearchQuery(v);
  };

  const historico = useMedicoesStore(state => state.historico);

  const filteredData = useMemo(() => {
    const mappedData: BloodPressureMeasurement[] = historico.map(m => ({
      id: m.id,
      dateLabel: formatarData(m.dataHora),
      systolic: m.sistolica,
      diastolic: m.diastolica,
      heartRate: m.frequenciaCardiaca,
      status: calcularStatus(m.sistolica, m.diastolica),
    }));

    return mappedData.filter((item) => {
      // Filtro de pesquisa (Apenas Data)
      const query = searchQuery.toLowerCase();
      const matchesSearch = item.dateLabel.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Filtro de Chips
      if (activeFilter === 'Hoje') {
        return item.dateLabel.includes('Hoje');
      }
      if (activeFilter === 'Semana') {
        return item.dateLabel.includes('Hoje') || item.dateLabel.includes('Ontem');
      }
      // 'Mês' e 'Todos'
      return true;
    });
  }, [historico, activeFilter, searchQuery]);

  const headerComponent = (
    <View style={styles.headerContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Histórico de Medições</Text>
        <HamburgerMenuIcon />
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="Pesquisar por data (DD/MM/AAAA)"
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        <FilterChip label="Hoje" isActive={activeFilter === 'Hoje'} onPress={() => setActiveFilter('Hoje')} />
        <FilterChip label="Semana" isActive={activeFilter === 'Semana'} onPress={() => setActiveFilter('Semana')} />
        <FilterChip label="Mês" isActive={activeFilter === 'Mês'} onPress={() => setActiveFilter('Mês')} />
        <FilterChip 
          label="Todos" 
          isActive={activeFilter === 'Todos'} 
          onPress={() => setActiveFilter('Todos')} 
        />
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={() => navigation.navigate('DetalhesMedicao', { id: item.id })}
          >
            <BloodPressureCard measurement={item} />
          </TouchableOpacity>
        )}
        ListHeaderComponent={headerComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA', // Fundo cinza muito claro
  },
  listContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111111',
  },
  searchContainer: {
    marginBottom: 16,
  },
  filtersContainer: {
    paddingBottom: 4, // Espaço para sombra leve do chip, se houver
  },
});

