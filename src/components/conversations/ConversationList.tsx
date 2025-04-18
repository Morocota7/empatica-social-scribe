
import { useEffect, useState } from "react";
import { Conversation, MessageSource } from "@/types";
import { mockConversations } from "@/utils/mock-data";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiFilter } from "react-icons/fi";

interface ConversationListProps {
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

export const ConversationList = ({
  onSelectConversation,
  selectedConversationId,
}: ConversationListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<MessageSource | "all">("all");

  useEffect(() => {
    // Load conversations from mock data or API
    setConversations(mockConversations);
  }, []);

  const filteredConversations = conversations
    .filter((conv) => 
      filter === "all" || conv.platform === filter
    )
    .filter((conv) => 
      conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.messages.some(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());

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

  const formatLastActivity = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));

    if (diffDays > 0) {
      return `Hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours > 0) {
      return `Hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
    } else if (diffMinutes > 0) {
      return `Hace ${diffMinutes} min`;
    } else {
      return "Ahora mismo";
    }
  };

  return (
    <div className="h-full flex flex-col border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Conversaciones</h2>
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar conversaciones..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="flex-1"
          >
            Todos
          </Button>
          <Button
            variant={filter === "instagram" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("instagram")}
            className="flex-1 gap-1"
          >
            <FaInstagram /> IG
          </Button>
          <Button
            variant={filter === "facebook" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("facebook")}
            className="flex-1 gap-1"
          >
            <FaFacebook /> FB
          </Button>
          <Button
            variant={filter === "whatsapp" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("whatsapp")}
            className="flex-1 gap-1"
          >
            <FaWhatsapp /> WA
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No hay conversaciones que coincidan con tu búsqueda
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedConversationId === conversation.id ? "bg-empatica-light" : ""
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={conversation.contact.avatar} 
                    alt={conversation.contact.name}
                  />
                  <AvatarFallback>
                    {conversation.contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium text-sm flex items-center gap-1.5 truncate pr-2">
                      {conversation.contact.name}
                      {getPlatformIcon(conversation.platform)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatLastActivity(conversation.lastActivity)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {conversation.messages.length > 0
                      ? conversation.messages[conversation.messages.length - 1].content
                      : "Nueva conversación"}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center">
                      {conversation.contact.sentiment && (
                        <div 
                          className={`h-2 w-2 rounded-full mr-1 ${
                            conversation.contact.sentiment === "positive" 
                              ? "bg-green-500" 
                              : conversation.contact.sentiment === "negative" 
                              ? "bg-red-500" 
                              : "bg-amber-500"
                          }`}
                        />
                      )}
                      <span className="text-xs text-gray-500">
                        {conversation.messages.length} mensajes
                      </span>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="secondary" className="bg-empatica-accent text-white">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
