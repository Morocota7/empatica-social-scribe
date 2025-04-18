
import { useState, useRef, useEffect } from "react";
import { Conversation, Message, MessageSource, SentimentType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FiSend, FiPaperclip, FiSmile, FiClock, FiCheck, FiCheckCircle } from "react-icons/fi";
import { generateId } from "@/utils/mock-data";

interface ChatViewProps {
  conversation: Conversation | null;
}

export const ChatView = ({ conversation }: ChatViewProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    } else {
      setMessages([]);
    }
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !conversation) return;

    const newMessage: Message = {
      id: generateId(),
      content: message,
      timestamp: new Date(),
      source: conversation.platform,
      senderId: "system",
      senderName: "Empatica AI",
      isInbound: false,
      read: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simular una respuesta automática después de 1-2 segundos
    setTimeout(() => {
      analyzeSentiment(message);
    }, 1000);
  };

  const analyzeSentiment = (text: string) => {
    // Simulación de análisis de sentimiento
    // En una implementación real, esto se haría con una API de NLP
    const keywords = text.toLowerCase().split(" ");
    const positiveWords = ["gracias", "excelente", "bueno", "genial", "encanta"];
    const negativeWords = ["problema", "error", "mal", "queja", "dañado"];
    
    const positiveMatches = keywords.filter(word => positiveWords.includes(word)).length;
    const negativeMatches = keywords.filter(word => negativeWords.includes(word)).length;
    
    let sentiment: SentimentType = "neutral";
    if (positiveMatches > negativeMatches) sentiment = "positive";
    if (negativeMatches > positiveMatches) sentiment = "negative";
    
    console.log(`Análisis de sentimiento: ${sentiment}`);
  };

  const getPlatformIcon = (platform: MessageSource) => {
    switch (platform) {
      case "instagram":
        return <FaInstagram className="text-[#E1306C]" />;
      case "facebook":
        return <FaFacebook className="text-[#1877F2]" />;
      case "whatsapp":
        return <FaWhatsapp className="text-[#25D366]" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4 text-empatica-primary opacity-20">💬</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">Empatica AI</h3>
          <p className="text-gray-500 max-w-md">
            Selecciona una conversación para comenzar a chatear o para ver el historial de mensajes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.contact.avatar} alt={conversation.contact.name} />
            <AvatarFallback>
              {conversation.contact.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{conversation.contact.name}</h3>
              {getPlatformIcon(conversation.platform)}
            </div>
            <p className="text-xs text-gray-500">
              {conversation.contact.platforms.length > 1
                ? `Disponible en ${conversation.contact.platforms.length} plataformas`
                : `Solo en ${conversation.platform}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Ver perfil
          </Button>
          <Button variant="outline" size="sm">
            Análisis
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isInbound ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[70%] ${
                  msg.isInbound
                    ? "bg-white border border-gray-200"
                    : "bg-empatica-primary text-white"
                } rounded-xl px-4 py-2 shadow-sm`}
              >
                <div className="text-sm">{msg.content}</div>
                <div
                  className={`text-xs mt-1 flex items-center justify-end gap-1 ${
                    msg.isInbound ? "text-gray-500" : "text-white/70"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                  {!msg.isInbound && (
                    msg.read ? <FiCheckCircle size={12} /> : <FiCheck size={12} />
                  )}
                </div>
                {msg.isInbound && msg.sentiment && (
                  <div className="mt-1 flex items-center justify-start gap-1 text-xs">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        msg.sentiment.sentiment === "positive"
                          ? "bg-green-500"
                          : msg.sentiment.sentiment === "negative"
                          ? "bg-red-500"
                          : "bg-amber-500"
                      }`}
                    />
                    <span className="text-gray-500 capitalize">
                      {msg.sentiment.sentiment}
                    </span>
                    <span className="text-gray-400">
                      ({Math.round(msg.sentiment.confidence * 100)}%)
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <FiPaperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Escribe un mensaje empático..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="rounded-full"
          />
          <Button variant="outline" size="icon" className="rounded-full">
            <FiSmile className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="rounded-full bg-empatica-primary hover:bg-empatica-primary/90"
          >
            <FiSend className="h-4 w-4 mr-2" />
            Enviar
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>Tono:</span>
            <span className="font-medium">Amable y empático</span>
            <Button variant="link" size="sm" className="text-xs h-auto p-0">
              Personalizar
            </Button>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <FiClock className="h-3 w-3" />
            <span>Respuesta automática activada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
