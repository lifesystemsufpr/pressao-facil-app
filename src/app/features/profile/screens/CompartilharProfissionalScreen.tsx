import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '../../../shared/services/api';

const COLORS = {
  background: '#F5F7FA',
  primary: '#0056b3',
  card: '#FFFFFF',
  border: '#D4DCE6',
  textStrong: '#1A1A2E',
  textMuted: '#4A5568',
};

type CodigoGerado = { code: string; expiresAt: string };

type Vinculo = {
  linkId: string;
  linkedAt: string;
  professional: {
    fullName: string;
    council: string;
    councilNumber: string;
    councilState: string;
    specialty: string | null;
  };
};

const formatarValidade = (iso: string) => {
  const d = new Date(iso);
  const dois = (n: number) => String(n).padStart(2, '0');
  return `${dois(d.getDate())}/${dois(d.getMonth() + 1)} às ${dois(d.getHours())}:${dois(d.getMinutes())}`;
};

export const CompartilharProfissionalScreen = () => {
  const insets = useSafeAreaInsets();
  const [codigo, setCodigo] = useState<CodigoGerado | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [equipe, setEquipe] = useState<Vinculo[] | null>(null);
  const [erroEquipe, setErroEquipe] = useState(false);

  const carregarEquipe = useCallback(async () => {
    try {
      const { data } = await api.get<Vinculo[]>('/care-team');
      setEquipe(data);
      setErroEquipe(false);
    } catch {
      setErroEquipe(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarEquipe();
    }, [carregarEquipe]),
  );

  const revogar = (vinculo: Vinculo) => {
    Alert.alert(
      'Remover acesso',
      `${vinculo.professional.fullName} deixará de ver suas medições. Deseja continuar?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/care-team/${vinculo.linkId}`);
              setEquipe((atual) => atual?.filter((v) => v.linkId !== vinculo.linkId) ?? null);
            } catch {
              Alert.alert('Não foi possível remover o acesso', 'Verifique sua conexão e tente novamente.');
            }
          },
        },
      ],
    );
  };

  const gerar = async () => {
    setCarregando(true);
    try {
      const { data } = await api.post<CodigoGerado>('/share-codes');
      setCodigo(data);
    } catch {
      Alert.alert('Não foi possível gerar o código', 'Verifique sua conexão e tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const enviar = () => {
    if (!codigo) return;
    Share.share({
      message: `Meu código do Pressão Fácil é ${codigo.code}. Ele vale até ${formatarValidade(codigo.expiresAt)}.`,
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: 24 + insets.bottom }]}
    >
      <Text style={styles.title} accessibilityRole="header">
        Compartilhar com profissional
      </Text>
      <Text style={styles.text}>
        Gere um código e informe ao profissional de saúde. Com ele, o profissional acompanha suas
        medições no painel Pressão Fácil Clínica.
      </Text>

      {codigo ? (
        <View style={styles.card}>
          <Text
            style={styles.code}
            selectable
            accessibilityLabel={`Código ${codigo.code.split('').join(' ')}`}
          >
            {codigo.code.slice(0, 3)} {codigo.code.slice(3)}
          </Text>
          <Text style={styles.text}>Válido até {formatarValidade(codigo.expiresAt)}, para um único uso.</Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={enviar} accessibilityRole="button">
            <Text style={styles.secondaryButtonText}>Enviar código</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={gerar}
        disabled={carregando}
        accessibilityRole="button"
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryButtonText}>{codigo ? 'Gerar novo código' : 'Gerar código'}</Text>
        )}
      </TouchableOpacity>
      {codigo ? <Text style={styles.hint}>Ao gerar um novo código, o anterior deixa de valer.</Text> : null}

      <Text style={styles.sectionTitle} accessibilityRole="header">
        Profissionais com acesso
      </Text>
      {erroEquipe ? (
        <TouchableOpacity onPress={carregarEquipe} accessibilityRole="button">
          <Text style={styles.text}>Não foi possível carregar a lista. Toque para tentar de novo.</Text>
        </TouchableOpacity>
      ) : equipe === null ? (
        <ActivityIndicator color={COLORS.primary} />
      ) : equipe.length === 0 ? (
        <Text style={styles.text}>Nenhum profissional acompanha suas medições.</Text>
      ) : (
        equipe.map((v) => (
          <View key={v.linkId} style={styles.linkRow}>
            <View style={styles.linkInfo}>
              <Text style={styles.linkName}>{v.professional.fullName}</Text>
              <Text style={styles.linkMeta}>
                {v.professional.council} {v.professional.councilNumber}/{v.professional.councilState}
                {v.professional.specialty ? ` · ${v.professional.specialty}` : ''}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.revokeButton}
              onPress={() => revogar(v)}
              accessibilityRole="button"
              accessibilityLabel={`Remover acesso de ${v.professional.fullName}`}
            >
              <Text style={styles.revokeText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, gap: 16 },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.textStrong },
  text: { fontSize: 16, lineHeight: 24, color: COLORS.textMuted },
  card: {
    alignItems: 'center',
    gap: 12,
    padding: 24,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  code: { fontSize: 44, fontWeight: '700', letterSpacing: 4, color: COLORS.primary },
  primaryButton: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },
  primaryButtonText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  secondaryButton: {
    minHeight: 48,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  hint: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center' },
  sectionTitle: { marginTop: 12, fontSize: 20, fontWeight: '700', color: COLORS.textStrong },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  linkInfo: { flex: 1 },
  linkName: { fontSize: 17, fontWeight: '700', color: COLORS.textStrong },
  linkMeta: { marginTop: 2, fontSize: 14, color: COLORS.textMuted },
  revokeButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0392B',
  },
  revokeText: { fontSize: 15, fontWeight: '700', color: '#C0392B' },
});
