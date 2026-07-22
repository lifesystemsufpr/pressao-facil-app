import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { MeasurementsScreenProps } from '../../../shared/types/navigation';
import { SearchBar, FilterChip } from '../../../shared/components';
import { HamburgerMenuIcon } from '../../../shared/components/HamburgerMenuIcon';
import { BloodPressureCard, BloodPressureMeasurement } from '../components/BloodPressureCard';
import { MeasurementStatus } from '../components/StatusBadge';

const mockData: BloodPressureMeasurement[] = [
  { id: '1', dateLabel: 'Hoje, 08:30', systolic: 120, diastolic: 80, heartRate: 72, status: 'Normal' },
  { id: '2', dateLabel: 'Ontem, 19:45', systolic: 135, diastolic: 85, heartRate: 76, status: 'Elevada' },
  { id: '3', dateLabel: '10/05/2026, 09:15', systolic: 150, diastolic: 95, heartRate: 85, status: 'Alta' },
  { id: '4', dateLabel: '09/05/2026, 08:00', systolic: 118, diastolic: 78, heartRate: 68, status: 'Normal' },
];

export const HistoricoMedicoesScreen = ({ navigation }: MeasurementsScreenProps<'HistoricoMedicoes'>) => {
  const [activeFilter, setActiveFilter] = useState('Hoje');
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

  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      // Filtro de pesquisa (Apenas Data)
      const query = searchQuery.toLowerCase();
      const matchesSearch = item.dateLabel.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Filtro de Chips (Mock simplificado)
      if (activeFilter === 'Hoje') {
        return item.dateLabel.includes('Hoje');
      }
      if (activeFilter === 'Semana') {
        return item.dateLabel.includes('Hoje') || item.dateLabel.includes('Ontem');
      }
      // 'Mês' e 'Todos' mostram todos no mock atual
      return true;
    });
  }, [activeFilter, searchQuery]);

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
        renderItem={({ item }) => <BloodPressureCard measurement={item} />}
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

