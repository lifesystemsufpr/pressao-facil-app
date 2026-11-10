// HTTP sem criptografia só é liberado no perfil "preview" (testes internos),
// enquanto a API não tem domínio com HTTPS. Build de produção exige HTTPS.
module.exports = ({ config }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? '';

  if (process.env.EAS_BUILD_PROFILE === 'production' && !apiUrl.startsWith('https://')) {
    throw new Error('O build de produção exige EXPO_PUBLIC_API_URL com https://');
  }

  const plugins = [...(config.plugins ?? [])];
  if (process.env.APP_ALLOW_HTTP === 'true') {
    plugins.push(['expo-build-properties', { android: { usesCleartextTraffic: true } }]);
  }

  return { ...config, plugins };
};
