
import { MessageSource } from '@/types';

export const getPlatformDisplayName = (platform: MessageSource): string => {
  switch (platform) {
    case 'instagram':
      return 'Instagram';
    case 'facebook':
      return 'Facebook';
    case 'whatsapp':
      return 'WhatsApp Business';
    default:
      return platform;
  }
};
