import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ToneSettings as ToneSettingsType, MessageSource } from "@/types";
import { mockToneSettings } from "@/utils/mock-data";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const ToneSettings = () => {
  const [settings, setSettings] = useState<ToneSettingsType[]>(mockToneSettings);
  const [activeTab, setActiveTab] = useState<MessageSource>("instagram");

  const getPlatformName = (platform: MessageSource): string => {
    switch (platform) {
      case "instagram":
        return "Instagram";
      case "facebook":
        return "Facebook";
      case "whatsapp":
        return "WhatsApp";
      case "direct":
        return "Chat Directo";
      default:
        return platform;
    }
  };

  const getPlatformIcon = (platform: MessageSource) => {
    switch (platform) {
      case "instagram":
        return <FaInstagram className="text-[#E1306C]" />;
      case "facebook":
        return <FaFacebook className="text-[#1877F2]" />;
      case "whatsapp":
        return <FaWhatsapp className="text-[#25D366]" />;
      case "direct":
        return <FiSettings />;
      default:
        return null;
    }
  };

  const handleSettingChange = (platform: MessageSource, key: keyof ToneSettingsType, value: number) => {
    setSettings(
      settings.map((setting) =>
        setting.platform === platform ? { ...setting, [key]: value } : setting
      )
    );
  };

  const activeSetting = settings.find((s) => s.platform === activeTab);

  if (!activeSetting) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configuración de Tonos</h1>
      <p className="text-gray-500">
        Personaliza el tono de las respuestas automáticas para cada plataforma. Estos ajustes ayudarán
        a la IA a generar respuestas con el estilo y tono adecuados.
      </p>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Tono de comunicación por plataforma</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as MessageSource)}>
            <TabsList className="grid grid-cols-4 mb-6">
              {settings.map((setting) => (
                <TabsTrigger
                  key={setting.platform}
                  value={setting.platform}
                  className="flex items-center gap-2"
                >
                  {getPlatformIcon(setting.platform)}
                  {getPlatformName(setting.platform)}
                </TabsTrigger>
              ))}
            </TabsList>

            {settings.map((setting) => (
              <TabsContent key={setting.platform} value={setting.platform} className="space-y-6">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Formalidad</label>
                      <span className="text-sm">{setting.formality}/10</span>
                    </div>
                    <Slider
                      value={[setting.formality]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => 
                        handleSettingChange(setting.platform, "formality", value[0])
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Casual</span>
                      <span>Formal</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Empatía</label>
                      <span className="text-sm">{setting.empathy}/10</span>
                    </div>
                    <Slider
                      value={[setting.empathy]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => 
                        handleSettingChange(setting.platform, "empathy", value[0])
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Neutral</span>
                      <span>Muy empático</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Creatividad</label>
                      <span className="text-sm">{setting.creativity}/10</span>
                    </div>
                    <Slider
                      value={[setting.creativity]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => 
                        handleSettingChange(setting.platform, "creativity", value[0])
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Conservador</span>
                      <span>Creativo</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Concisión</label>
                      <span className="text-sm">{setting.conciseness}/10</span>
                    </div>
                    <Slider
                      value={[setting.conciseness]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => 
                        handleSettingChange(setting.platform, "conciseness", value[0])
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Detallado</span>
                      <span>Conciso</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Humor</label>
                      <span className="text-sm">{setting.humor}/10</span>
                    </div>
                    <Slider
                      value={[setting.humor]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => 
                        handleSettingChange(setting.platform, "humor", value[0])
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Serio</span>
                      <span>Divertido</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Velocidad de respuesta</label>
                      <span className="text-sm">{setting.responseSpeed}/10</span>
                    </div>
                    <Slider
                      value={[setting.responseSpeed]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => 
                        handleSettingChange(setting.platform, "responseSpeed", value[0])
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Pausado</span>
                      <span>Inmediato</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Nivel académico</label>
                      <span className="text-sm">{setting.academicLevel}/10</span>
                    </div>
                    <Slider
                      value={[setting.academicLevel]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => 
                        handleSettingChange(setting.platform, "academicLevel", value[0])
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Básico</span>
                      <span>Avanzado</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline">Restablecer valores predeterminados</Button>
                  <Button>Guardar configuración</Button>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <h3 className="text-sm font-medium mb-2">Ejemplo de respuesta con esta configuración:</h3>
                  <p className="text-sm text-gray-600 italic">
                    {setting.formality > 7 
                      ? "Estimado cliente, agradecemos su mensaje y le confirmo que estamos procesando su solicitud." 
                      : setting.formality > 4 
                      ? "Hola, gracias por tu mensaje. Estamos trabajando en tu solicitud." 
                      : "¡Hola! Gracias por escribirnos. Ya estamos con tu pedido ;)"}
                    
                    {setting.empathy > 7 
                      ? " Entendemos perfectamente cómo te sientes y haremos todo lo posible para ayudarte." 
                      : setting.empathy > 4 
                      ? " Comprendemos tu situación y queremos ayudarte." 
                      : ""}
                    
                    {setting.humor > 7 
                      ? " ¡No te preocupes, somos expertos en resolver estos misterios!" 
                      : ""}
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToneSettings;
