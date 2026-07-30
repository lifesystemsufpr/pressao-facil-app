import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { RelatorioData } from '../types';
import { CONTEXTO_LABELS } from '../../measurements/types';

interface ProfileData {
  fullName: string;
  birthDate: string;
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

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
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

const formatContexts = (contexts?: string[]) => {
  if (!contexts || contexts.length === 0) return 'Nenhum contexto';
  return contexts.map(c => c === 'briguei_com_alguem' ? 'Briguei com alguém' : c === 'apos_medicamento' ? 'Após medicamento' : CONTEXTO_LABELS[c as keyof typeof CONTEXTO_LABELS] || 'Nenhum contexto').join(', ');
};

import { Platform, Alert } from 'react-native';

export async function exportReportToPDF(report: RelatorioData, profile: ProfileData | null, action: 'download' | 'share' = 'share'): Promise<void> {
  const userName = profile?.fullName || 'Paciente Não Identificado';
  const userAge = profile?.birthDate ? `${calcularIdade(profile.birthDate)} anos` : 'Idade Não Informada';

  const dateStr = formatDate(new Date().toISOString());

  const periodLabel = 
    report.periodo === '7dias' ? 'Últimos 7 dias' :
    report.periodo === '30dias' ? 'Últimos 30 dias' :
    report.periodo === '6meses' ? 'Últimos 6 meses' : 'Último ano';

  const trs = report.medicoes.map(m => {
    const status = calcularStatus(m.sistolica, m.diastolica);
    const statusColor = getStatusColor(status);
    
    // Ensure contexts is always an array
    let contextoArray: string[] = [];
    if (Array.isArray(m.contexto)) contextoArray = m.contexto;
    else if (typeof m.contexto === 'string') contextoArray = [m.contexto];

    return `
      <tr>
        <td style="color: #4b5563;">${formatDate(m.dataHora)}<br/><span style="font-size: 11px; color: #9ca3af;">${formatTime(m.dataHora)}</span></td>
        <td style="font-weight: bold; color: #1f2937;">${m.sistolica} / ${m.diastolica} <span style="font-size: 10px; color: #6b7280; font-weight: normal;">mmHg</span></td>
        <td style="color: #4b5563;">${m.frequenciaCardiaca} <span style="font-size: 10px; color: #6b7280;">bpm</span></td>
        <td><span style="background-color: ${statusColor}20; color: ${statusColor}; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${status}</span></td>
        <td style="font-size: 12px; color: #4b5563;">${formatContexts(contextoArray)}</td>
        <td style="font-size: 11px; color: #6b7280;">${m.observacao || '-'}</td>
      </tr>
    `;
  }).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Relatório de Pressão Arterial</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #111827; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; color: #0068c9; margin: 0 0 5px 0; }
        .subtitle { font-size: 14px; color: #6b7280; margin: 0; }
        .patient-info { text-align: right; }
        .patient-name { font-size: 18px; font-weight: 600; margin: 0 0 4px 0; }
        .patient-details { font-size: 14px; color: #4b5563; margin: 0; }
        
        .summary-boxes { display: flex; gap: 15px; margin-bottom: 30px; }
        .box { flex: 1; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; text-align: center; }
        .box-title { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
        .box-value { font-size: 24px; font-weight: bold; color: #1f2937; margin: 0; }
        .box-value span { font-size: 14px; font-weight: normal; color: #6b7280; }

        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { text-align: left; background-color: #f3f4f6; color: #4b5563; padding: 12px; font-size: 13px; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
        td { padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; vertical-align: top; }
        
        .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #9ca3af; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="title">Relatório de Pressão Arterial</h1>
          <p class="subtitle">Gerado em ${dateStr}</p>
        </div>
        <div class="patient-info">
          <div class="patient-name">${profile?.fullName || 'Usuário'}</div>
          <div class="patient-info-row">
            <span class="info-label">Idade:</span>
            <span class="info-value">${profile?.birthDate ? `${calcularIdade(profile.birthDate)} anos` : 'N/I'}</span>
          </div>
          <p class="patient-details">Período: <strong>${periodLabel}</strong></p>
        </div>
      </div>

      <div class="summary-boxes">
        <div class="box">
          <div class="box-title">Média Sistólica</div>
          <p class="box-value">${report.resumo.mediaSistolica ?? '--'} <span>mmHg</span></p>
        </div>
        <div class="box">
          <div class="box-title">Média Diastólica</div>
          <p class="box-value">${report.resumo.mediaDiastolica ?? '--'} <span>mmHg</span></p>
        </div>
        <div class="box">
          <div class="box-title">Média Frequência</div>
          <p class="box-value">${report.resumo.mediaFrequencia ?? '--'} <span>bpm</span></p>
        </div>
        <div class="box">
          <div class="box-title">Total de Medições</div>
          <p class="box-value">${report.totalMedicoes}</p>
        </div>
      </div>

      ${report.medicoes.length > 0 ? `
        <table>
          <thead>
            <tr>
              <th>DATA/HORA</th>
              <th>PRESSÃO</th>
              <th>FREQ.</th>
              <th>STATUS</th>
              <th>CONTEXTO</th>
              <th>OBSERVAÇÕES</th>
            </tr>
          </thead>
          <tbody>
            ${trs}
          </tbody>
        </table>
      ` : `
        <div style="text-align: center; padding: 40px; background-color: #f9fafb; border-radius: 8px; color: #6b7280;">
          Nenhuma medição registrada neste período.
        </div>
      `}

      <div class="footer">
        Relatório gerado automaticamente pelo aplicativo Pressão Fácil.
      </div>
    </body>
    </html>
  `;

  try {
    const { base64 } = await Print.printToFileAsync({
      html,
      base64: true,
    });

    const newUri = FileSystem.documentDirectory + 'Relatorio_Pressao_Facil.pdf';
    
    if (action === 'share') {
      if (base64) {
        await FileSystem.writeAsStringAsync(newUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newUri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Compartilhar Relatório',
          UTI: 'com.adobe.pdf',
        });
      }
    } else {
      // action === 'download'
      if (Platform.OS === 'android') {
        try {
          const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (permissions.granted) {
            const savedUri = await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'Relatorio_Pressao_Facil.pdf', 'application/pdf');
            if (base64) {
              await FileSystem.writeAsStringAsync(savedUri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              });
              Alert.alert('Sucesso', 'Relatório salvo com sucesso no seu dispositivo!');
            }
          }
        } catch (e) {
          Alert.alert('Erro', 'Não foi possível salvar o arquivo.');
        }
      } else {
        // No iOS, não há StorageAccessFramework. A melhor forma de "Salvar em Arquivos"
        // é usar a Share Sheet e deixar o usuário escolher "Salvar em Arquivos".
        if (base64) {
          await FileSystem.writeAsStringAsync(newUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
        }
        await Sharing.shareAsync(newUri, {
          mimeType: 'application/pdf',
          UTI: 'com.adobe.pdf',
        });
      }
    }
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    throw error;
  }
}
