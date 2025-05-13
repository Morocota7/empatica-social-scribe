
import { MessageSource } from '@/types';

export const getPlatformDisplayName = (platform: MessageSource): string => {
  switch (platform) {
    case 'instagram':
      return 'Instagram';
    case 'facebook':
      return 'Facebook';
    case 'whatsapp':
      return 'WhatsApp Business';
    case 'direct':
      return 'Chat Directo';
    default:
      return platform;
  }
};

export const getLanguageName = (code: string): string => {
  const languages: Record<string, string> = {
    es: "Español",
    en: "Inglés",
    fr: "Francés",
    pt: "Portugués",
    de: "Alemán",
    it: "Italiano"
  };
  return languages[code] || code;
};

export const getCountryName = (code: string): string => {
  const countries: Record<string, string> = {
    es: "España",
    mx: "México",
    ar: "Argentina",
    co: "Colombia",
    cl: "Chile",
    pe: "Perú",
    us: "Estados Unidos"
  };
  return countries[code] || code;
};
