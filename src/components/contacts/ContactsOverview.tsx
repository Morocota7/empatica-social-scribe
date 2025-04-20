
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactList } from "./ContactList";
import { ContactImportExport } from "./ContactImportExport";
import { BroadcastCampaigns } from "./BroadcastCampaigns";
import { Users, Mail, Clock } from "lucide-react";

export const ContactsOverview = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users />
            Todos los Contactos
          </TabsTrigger>
          <TabsTrigger value="frequent" className="flex items-center gap-2">
            <Clock />
            Clientes Frecuentes
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Mail />
            Seguimiento Pendiente
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="all" className="space-y-4">
        <ContactImportExport />
        <ContactList filter="all" />
      </TabsContent>

      <TabsContent value="frequent" className="space-y-4">
        <ContactList filter="frequent" />
      </TabsContent>

      <TabsContent value="pending" className="space-y-4">
        <ContactList filter="pending" />
        <BroadcastCampaigns />
      </TabsContent>
    </Tabs>
  );
};
