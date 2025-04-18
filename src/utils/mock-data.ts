
import { Conversation, Contact, Message, SocialAccount, ToneSettings, MessageSource, SentimentType } from "../types";

// Función para generar un ID aleatorio
export const generateId = (): string => Math.random().toString(36).substring(2, 15);

// Generar fechas aleatorias en los últimos 7 días
export const randomDate = (days = 7): Date => {
  const date = new Date();
  date.setDate(date.getDate() - Math.random() * days);
  return date;
};

// Datos de ejemplo para cuentas sociales
export const mockSocialAccounts: SocialAccount[] = [
  { platform: 'instagram', username: 'mi_negocio', connected: true, lastSync: new Date() },
  { platform: 'facebook', username: 'Mi Negocio Oficial', connected: true, lastSync: new Date() },
  { platform: 'whatsapp', username: '+34600000000', connected: true, lastSync: new Date() },
];

// Datos de ejemplo para configuraciones de tono
export const mockToneSettings: ToneSettings[] = [
  { platform: 'instagram', formality: 5, empathy: 8, creativity: 7, conciseness: 6, humor: 7 },
  { platform: 'facebook', formality: 7, empathy: 7, creativity: 5, conciseness: 6, humor: 5 },
  { platform: 'whatsapp', formality: 4, empathy: 9, creativity: 6, conciseness: 7, humor: 8 },
  { platform: 'direct', formality: 6, empathy: 8, creativity: 7, conciseness: 7, humor: 6 },
];

// Nombres de contactos de ejemplo
const contactNames = [
  "María García", "Juan López", "Ana Martínez", "Carlos Rodríguez", 
  "Laura Sánchez", "Pedro González", "Sofía Pérez", "Miguel Fernández", 
  "Elena Díaz", "José Ruiz", "Carmen Jiménez", "David Hernández"
];

// Sentimientos para ejemplo
const sentiments: SentimentType[] = ['positive', 'neutral', 'negative'];

// Generar contactos aleatorios
export const generateMockContacts = (count: number): Contact[] => {
  const contacts: Contact[] = [];
  
  for (let i = 0; i < count; i++) {
    const platforms: MessageSource[] = [];
    if (Math.random() > 0.3) platforms.push('instagram');
    if (Math.random() > 0.4) platforms.push('facebook');
    if (Math.random() > 0.5) platforms.push('whatsapp');
    
    contacts.push({
      id: generateId(),
      name: contactNames[Math.floor(Math.random() * contactNames.length)],
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      platforms: platforms.length ? platforms : ['instagram'],
      lastInteraction: randomDate(),
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      notes: Math.random() > 0.7 ? "Cliente frecuente. Interesado en productos premium." : undefined
    });
  }

  return contacts;
};

// Ejemplos de mensajes entrantes
const inboundMessages = [
  "Hola, me gustaría saber más sobre vuestros productos",
  "¿Tenéis disponible el modelo en azul?",
  "No estoy contento con mi última compra, el producto llegó dañado",
  "¡Me encanta vuestra marca! ¿Cuándo lanzáis la nueva colección?",
  "Necesito cambiar mi pedido, ¿es posible?",
  "¿Cuál es el tiempo de entrega para Madrid?",
  "Quiero hacer una devolución, ¿cuál es el procedimiento?",
  "Muchas gracias por la atención, ha sido excelente",
  "¿Ofrecéis descuentos para compras al por mayor?",
  "¿Puedo modificar la dirección de entrega de mi pedido actual?"
];

// Ejemplos de mensajes salientes
const outboundMessages = [
  "¡Hola! Gracias por contactarnos. Estaremos encantados de ayudarte con cualquier consulta",
  "Sí, tenemos disponible ese modelo en varios colores, incluido el azul",
  "Lamentamos mucho lo ocurrido. Nos gustaría solucionar este problema lo antes posible",
  "¡Nos alegra que te guste nuestra marca! La nueva colección estará disponible a partir del próximo mes",
  "Por supuesto, podemos modificar tu pedido. ¿Podrías proporcionarme el número de referencia?",
  "Para Madrid capital el tiempo de entrega es de 24-48 horas laborables",
  "El proceso de devolución es muy sencillo. Te enviaré los pasos a seguir",
  "¡Gracias a ti por confiar en nosotros! Estamos siempre a tu disposición",
  "Sí, ofrecemos descuentos especiales para compras superiores a 10 unidades",
  "Claro que sí, podemos modificar la dirección de entrega. Necesitaría tu número de pedido"
];

// Generar mensajes aleatorios
export const generateMockMessages = (count: number, isInbound = true, source: MessageSource, senderId: string, senderName: string): Message[] => {
  const messages: Message[] = [];
  const messagePool = isInbound ? inboundMessages : outboundMessages;
  
  for (let i = 0; i < count; i++) {
    messages.push({
      id: generateId(),
      content: messagePool[Math.floor(Math.random() * messagePool.length)],
      timestamp: randomDate(),
      source,
      senderId,
      senderName,
      isInbound,
      read: !isInbound || Math.random() > 0.3,
      sentiment: isInbound ? {
        sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
        confidence: Math.random() * 0.5 + 0.5, // 0.5 - 1.0
        keywords: ["producto", "entrega", "servicio"]
      } : undefined
    });
  }

  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

// Generar conversaciones aleatorias
export const generateMockConversations = (contacts: Contact[]): Conversation[] => {
  return contacts.map(contact => {
    const platform = contact.platforms[Math.floor(Math.random() * contact.platforms.length)];
    const inboundCount = Math.floor(Math.random() * 5) + 1;
    const outboundCount = Math.floor(Math.random() * 5);
    
    const inboundMsgs = generateMockMessages(inboundCount, true, platform, contact.id, contact.name);
    const outboundMsgs = generateMockMessages(outboundCount, false, platform, 'system', 'Empatica AI');
    
    const allMessages = [...inboundMsgs, ...outboundMsgs].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );
    
    const unreadCount = allMessages.filter(m => m.isInbound && !m.read).length;
    
    return {
      id: generateId(),
      contact,
      messages: allMessages,
      lastActivity: allMessages.length ? allMessages[allMessages.length - 1].timestamp : new Date(),
      platform,
      unreadCount
    };
  });
};

// Exportar datos completos para usar en la aplicación
export const mockContacts = generateMockContacts(10);
export const mockConversations = generateMockConversations(mockContacts);
