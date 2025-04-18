
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ConversationList from "@/components/conversations/ConversationList";
import ChatView from "@/components/conversations/ChatView";
import { Conversation } from "@/types";

const ConversationsPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
        <div className="lg:col-span-1 h-full">
          <ConversationList 
            onSelectConversation={setSelectedConversation}
            selectedConversationId={selectedConversation?.id}
          />
        </div>
        <div className="lg:col-span-2 h-full">
          <ChatView conversation={selectedConversation} />
        </div>
      </div>
    </AppLayout>
  );
};

export default ConversationsPage;
