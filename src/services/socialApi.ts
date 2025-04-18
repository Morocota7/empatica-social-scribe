
import { MessageSource, Message, Contact } from '@/types';
import { toast } from 'sonner';
import { generateId } from '@/utils/mock-data';

// Store access tokens in memory (in a real app, you'd use a more secure storage method)
const accessTokens: Record<MessageSource, string | null> = {
  instagram: null,
  facebook: null,
  whatsapp: null,
  direct: null,
};

export const setAccessToken = (platform: MessageSource, token: string): void => {
  accessTokens[platform] = token;
};

export const getAccessToken = (platform: MessageSource): string | null => {
  return accessTokens[platform];
};

export const clearAccessToken = (platform: MessageSource): void => {
  accessTokens[platform] = null;
};

// Base class for platform-specific APIs
abstract class SocialApiBase {
  protected platform: MessageSource;
  
  constructor(platform: MessageSource) {
    this.platform = platform;
  }
  
  protected getToken(): string {
    const token = getAccessToken(this.platform);
    if (!token) {
      throw new Error(`No access token available for ${this.platform}`);
    }
    return token;
  }
  
  abstract fetchMessages(): Promise<Message[]>;
  abstract sendMessage(recipientId: string, content: string): Promise<Message | null>;
  abstract fetchContacts(): Promise<Contact[]>;
}

// Instagram API implementation
class InstagramApi extends SocialApiBase {
  constructor() {
    super('instagram');
  }
  
  async fetchMessages(): Promise<Message[]> {
    try {
      const token = this.getToken();
      
      // In a real app, you would fetch messages from the Instagram API
      // For now, we'll return mock data
      console.log(`Fetching Instagram messages with token: ${token.substring(0, 10)}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return empty array for now (in a real app, this would parse the API response)
      return [];
    } catch (error) {
      console.error('Error fetching Instagram messages:', error);
      toast.error('Could not fetch Instagram messages');
      return [];
    }
  }
  
  async sendMessage(recipientId: string, content: string): Promise<Message | null> {
    try {
      const token = this.getToken();
      
      // In a real app, you would send a message via the Instagram API
      console.log(`Sending Instagram message to ${recipientId} with token: ${token.substring(0, 10)}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a mock message (in a real app, this would be the API response)
      return {
        id: generateId(),
        content,
        timestamp: new Date(),
        source: 'instagram',
        senderId: 'self',
        senderName: 'Humanizer',
        isInbound: false,
        read: true
      };
    } catch (error) {
      console.error('Error sending Instagram message:', error);
      toast.error('Could not send Instagram message');
      return null;
    }
  }
  
  async fetchContacts(): Promise<Contact[]> {
    try {
      const token = this.getToken();
      
      // In a real app, you would fetch contacts from the Instagram API
      console.log(`Fetching Instagram contacts with token: ${token.substring(0, 10)}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return empty array for now (in a real app, this would parse the API response)
      return [];
    } catch (error) {
      console.error('Error fetching Instagram contacts:', error);
      toast.error('Could not fetch Instagram contacts');
      return [];
    }
  }
}

// Facebook API implementation
class FacebookApi extends SocialApiBase {
  constructor() {
    super('facebook');
  }
  
  async fetchMessages(): Promise<Message[]> {
    try {
      const token = this.getToken();
      
      // In a real app, you would fetch messages from the Facebook API
      console.log(`Fetching Facebook messages with token: ${token.substring(0, 10)}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return empty array for now (in a real app, this would parse the API response)
      return [];
    } catch (error) {
      console.error('Error fetching Facebook messages:', error);
      toast.error('Could not fetch Facebook messages');
      return [];
    }
  }
  
  async sendMessage(recipientId: string, content: string): Promise<Message | null> {
    try {
      const token = this.getToken();
      
      // In a real app, you would send a message via the Facebook API
      console.log(`Sending Facebook message to ${recipientId} with token: ${token.substring(0, 10)}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a mock message (in a real app, this would be the API response)
      return {
        id: generateId(),
        content,
        timestamp: new Date(),
        source: 'facebook',
        senderId: 'self',
        senderName: 'Humanizer',
        isInbound: false,
        read: true
      };
    } catch (error) {
      console.error('Error sending Facebook message:', error);
      toast.error('Could not send Facebook message');
      return null;
    }
  }
  
  async fetchContacts(): Promise<Contact[]> {
    try {
      const token = this.getToken();
      
      // In a real app, you would fetch contacts from the Facebook API
      console.log(`Fetching Facebook contacts with token: ${token.substring(0, 10)}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return empty array for now (in a real app, this would parse the API response)
      return [];
    } catch (error) {
      console.error('Error fetching Facebook contacts:', error);
      toast.error('Could not fetch Facebook contacts');
      return [];
    }
  }
}

// WhatsApp API implementation
class WhatsAppApi extends SocialApiBase {
  constructor() {
    super('whatsapp');
  }
  
  async fetchMessages(): Promise<Message[]> {
    try {
      const token = this.getToken();
      
      // In a real app, you would fetch messages from the WhatsApp Business API
      console.log(`Fetching WhatsApp messages with token: ${token.substring(0, 10)}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return empty array for now (in a real app, this would parse the API response)
      return [];
    } catch (error) {
      console.error('Error fetching WhatsApp messages:', error);
      toast.error('Could not fetch WhatsApp messages');
      return [];
    }
  }
  
  async sendMessage(recipientId: string, content: string): Promise<Message | null> {
    try {
      const token = this.getToken();
      
      // In a real app, you would send a message via the WhatsApp Business API
      console.log(`Sending WhatsApp message to ${recipientId} with token: ${token.substring(0, 10)}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a mock message (in a real app, this would be the API response)
      return {
        id: generateId(),
        content,
        timestamp: new Date(),
        source: 'whatsapp',
        senderId: 'self',
        senderName: 'Humanizer',
        isInbound: false,
        read: true
      };
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      toast.error('Could not send WhatsApp message');
      return null;
    }
  }
  
  async fetchContacts(): Promise<Contact[]> {
    try {
      const token = this.getToken();
      
      // In a real app, you would fetch contacts from the WhatsApp Business API
      console.log(`Fetching WhatsApp contacts with token: ${token.substring(0, 10)}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return empty array for now (in a real app, this would parse the API response)
      return [];
    } catch (error) {
      console.error('Error fetching WhatsApp contacts:', error);
      toast.error('Could not fetch WhatsApp contacts');
      return [];
    }
  }
}

// Factory to get the appropriate API for a platform
export const getSocialApi = (platform: MessageSource): SocialApiBase => {
  switch (platform) {
    case 'instagram':
      return new InstagramApi();
    case 'facebook':
      return new FacebookApi();
    case 'whatsapp':
      return new WhatsAppApi();
    default:
      throw new Error(`No API implementation for platform: ${platform}`);
  }
};
