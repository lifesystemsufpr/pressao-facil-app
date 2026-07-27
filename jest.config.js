// Configuração de testes unitários.
//
// Escopo intencionalmente enxuto: os testes cobrem lógica de negócio pura
// (ex.: reportBuilder), sem componentes React Native. Por isso usamos o
// ambiente `node` e o transform `ts-jest` em modo isolatedModules (transpila
// arquivo a arquivo, sem puxar o grafo de imports do React Native).
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
};
