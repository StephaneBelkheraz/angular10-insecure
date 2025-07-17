export const environment = {
  production: true,
  // VULNÉRABILITÉ: Même en production, les clés sont exposées
  apiKey: 'sk_live_1234567890abcdef',
  apiUrl: 'https://api.vulnerable-app.com',
  secretKey: 'myProductionSecretKey123',
  // VULNÉRABILITÉ: Debug activé en production
  enableDebug: true
};