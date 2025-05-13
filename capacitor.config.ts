
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a0962258b6ef476bb1d61e942f0f3cbc',
  appName: 'empatica-social-scribe',
  webDir: 'dist',
  server: {
    url: 'https://a0962258-b6ef-476b-b1d6-1e942f0f3cbc.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    path: 'android',
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null,
      releaseType: null,
    }
  }
};

export default config;
