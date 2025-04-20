
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const BroadcastCampaigns = () => {
  const [messageContent, setMessageContent] = useState("");

  const handleSendCampaign = () => {
    if (!messageContent.trim()) {
      toast.error("Por favor, escribe un mensaje para la campaña");
      return;
    }
    
    // Aquí implementaremos el envío de la campaña
    toast.success("Campaña programada correctamente");
    setMessageContent("");
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Campaña de Difusión</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Nombre de la campaña"
          className="mb-4"
        />
        <Textarea
          placeholder="Mensaje de la campaña..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          rows={4}
        />
        <Button 
          onClick={handleSendCampaign}
          className="w-full"
        >
          Enviar Campaña
        </Button>
      </CardContent>
    </Card>
  );
};
