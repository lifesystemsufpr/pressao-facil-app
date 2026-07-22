import { buildRelatorio } from './reportBuilder';
import type { Medicao } from '../../measurements';

// Data de referência fixa para tornar os períodos determinísticos.
const REF = new Date('2026-07-22T12:00:00.000Z');

function medicao(over: Partial<Medicao> & Pick<Medicao, 'id' | 'dataHora'>): Medicao {
  return {
    sistolica: 120,
    diastolica: 80,
    frequenciaCardiaca: 70,
    contexto: 'antes_cafe',
    ...over,
  };
}

describe('buildRelatorio', () => {
  describe('agregação', () => {
    // 3 medições dentro dos últimos 7 dias + 1 fora (21 dias atrás).
    const medicoes: Medicao[] = [
      medicao({ id: 'a', dataHora: '2026-07-22T08:00:00.000Z', sistolica: 120, diastolica: 80, frequenciaCardiaca: 70 }),
      medicao({ id: 'b', dataHora: '2026-07-20T08:00:00.000Z', sistolica: 130, diastolica: 84, frequenciaCardiaca: 76 }),
      medicao({ id: 'c', dataHora: '2026-07-16T08:00:00.000Z', sistolica: 140, diastolica: 88, frequenciaCardiaca: 80 }),
      medicao({ id: 'd', dataHora: '2026-07-01T08:00:00.000Z', sistolica: 200, diastolica: 120, frequenciaCardiaca: 99 }),
    ];

    it('conta apenas as medições dentro do período', () => {
      const r = buildRelatorio(medicoes, '7dias', REF);
      expect(r.totalMedicoes).toBe(3);
      expect(r.vazio).toBe(false);
    });

    it('calcula médias arredondadas ignorando registros fora do período', () => {
      const r = buildRelatorio(medicoes, '7dias', REF);
      // (120+130+140)/3 = 130 ; (80+84+88)/3 = 84 ; (70+76+80)/3 = 75.33 -> 75
      expect(r.resumo.mediaSistolica).toBe(130);
      expect(r.resumo.mediaDiastolica).toBe(84);
      expect(r.resumo.mediaFrequencia).toBe(75);
    });

    it('calcula mínimos e máximos do período', () => {
      const r = buildRelatorio(medicoes, '7dias', REF);
      expect(r.resumo.maxSistolica).toBe(140);
      expect(r.resumo.minSistolica).toBe(120);
      expect(r.resumo.maxDiastolica).toBe(88);
      expect(r.resumo.minDiastolica).toBe(80);
    });

    it('ordena as medições da mais recente para a mais antiga', () => {
      const r = buildRelatorio(medicoes, '7dias', REF);
      expect(r.medicoes.map((m) => m.id)).toEqual(['a', 'b', 'c']);
    });

    it('inclui registros mais antigos ao ampliar o período', () => {
      const r = buildRelatorio(medicoes, '30dias', REF);
      expect(r.totalMedicoes).toBe(4);
      expect(r.medicoes.map((m) => m.id)).toEqual(['a', 'b', 'c', 'd']);
    });

    it('arredonda média com fração .5 para cima', () => {
      const r = buildRelatorio(
        [
          medicao({ id: 'x', dataHora: '2026-07-22T08:00:00.000Z', sistolica: 120 }),
          medicao({ id: 'y', dataHora: '2026-07-22T09:00:00.000Z', sistolica: 121 }),
        ],
        '7dias',
        REF
      );
      // (120+121)/2 = 120.5 -> 121
      expect(r.resumo.mediaSistolica).toBe(121);
    });

    it('reporta o intervalo consultado', () => {
      const r = buildRelatorio(medicoes, '7dias', REF);
      expect(r.intervalo.fim).toBe(REF.toISOString());
      expect(r.intervalo.inicio).toBe('2026-07-15T12:00:00.000Z');
    });
  });

  describe('período vazio (há medições, mas nenhuma no intervalo)', () => {
    const medicoes: Medicao[] = [
      medicao({ id: 'antiga', dataHora: '2026-07-01T08:00:00.000Z' }), // 21 dias atrás
    ];

    it('marca vazio=true e total=0', () => {
      const r = buildRelatorio(medicoes, '7dias', REF);
      expect(r.vazio).toBe(true);
      expect(r.totalMedicoes).toBe(0);
      expect(r.medicoes).toEqual([]);
    });

    it('devolve resumo com todos os campos nulos', () => {
      const r = buildRelatorio(medicoes, '7dias', REF);
      expect(r.resumo.mediaSistolica).toBeNull();
      expect(r.resumo.mediaDiastolica).toBeNull();
      expect(r.resumo.mediaFrequencia).toBeNull();
      expect(r.resumo.maxSistolica).toBeNull();
      expect(r.resumo.minSistolica).toBeNull();
    });
  });

  describe('sem medições (histórico vazio)', () => {
    it('marca vazio=true e resumo nulo', () => {
      const r = buildRelatorio([], '30dias', REF);
      expect(r.vazio).toBe(true);
      expect(r.totalMedicoes).toBe(0);
      expect(r.medicoes).toEqual([]);
      expect(r.resumo.mediaSistolica).toBeNull();
    });
  });

  describe('robustez', () => {
    it('inclui medição exatamente no limite inicial do período', () => {
      const r = buildRelatorio(
        [medicao({ id: 'limite', dataHora: '2026-07-15T12:00:00.000Z' })],
        '7dias',
        REF
      );
      expect(r.totalMedicoes).toBe(1);
    });

    it('ignora medições com data inválida', () => {
      const r = buildRelatorio(
        [
          medicao({ id: 'ok', dataHora: '2026-07-22T08:00:00.000Z' }),
          medicao({ id: 'ruim', dataHora: 'data-invalida' }),
        ],
        '7dias',
        REF
      );
      expect(r.totalMedicoes).toBe(1);
      expect(r.medicoes[0].id).toBe('ok');
    });
  });
});
