
export type MessageSource = 'instagram' | 'facebook' | 'whatsapp' | 'direct';

export type SentimentType = 'positive' | 'neutral' | 'negative';

export type SentimentAnalysis = {
  sentiment: SentimentType;
  confidence: number;
  keywords: string[];
};

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  source: MessageSource;
  senderId: string;
  senderName: string;
  isInbound: boolean;
  sentiment?: SentimentAnalysis;
  attachments?: string[];
  read: boolean;
}

export interface Conversation {
  id: string;
  contact: Contact;
  messages: Message[];
  lastActivity: Date;
  platform: MessageSource;
  unreadCount: number;
}

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  platforms: MessageSource[];
  lastInteraction?: Date;
  sentiment?: SentimentType;
  notes?: string;
}

export interface SocialAccount {
  platform: MessageSource;
  username: string;
  connected: boolean;
  lastSync?: Date;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export interface ToneSettings {
  platform: MessageSource;
  formality: number; // 1-10
  empathy: number; // 1-10
  creativity: number; // 1-10
  conciseness: number; // 1-10
  humor: number; // 1-10
  responseSpeed: number; // 1-10
  academicLevel: number; // 1-10
}

export interface LocationSettings {
  country: string;
  timezone: string;
  trackLocation: boolean;
}

export interface LanguageSettings {
  primaryLanguage: string;
  detectLanguage: boolean;
  secondaryLanguages: string[];
}

export interface AppSettings {
  tones: ToneSettings[];
  darkMode: boolean;
  autoRespond: boolean;
  language: string;
  notifications: boolean;
  languageSettings?: LanguageSettings;
  locationSettings?: LocationSettings;
}

export interface AuthResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  error?: string;
}

export interface SocialApiConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}
