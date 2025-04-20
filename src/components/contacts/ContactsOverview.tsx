
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactList } from "./ContactList";
import { ContactImportExport } from "./ContactImportExport";
import { BroadcastCampaigns } from "./BroadcastCampaigns";
import { FiUsers, FiMail, FiClock } from "lucide-react";

export const ContactsOverview = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FiUsers />
            Todos los Contactos
          </TabsTrigger>
          <TabsTrigger value="frequent" className="flex items-center gap-2">
            <FiClock />
            Clientes Frecuentes
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <FiMail />
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
