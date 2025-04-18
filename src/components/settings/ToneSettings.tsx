
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ToneSettings as ToneSettingsType, MessageSource } from "@/types";
import { mockToneSettings } from "@/utils/mock-data";
import { ToneSlider } from "./ToneSlider";
import { ToneExample } from "./ToneExample";
import { PlatformTabs } from "./PlatformTabs";

const ToneSettings = () => {
  const [settings, setSettings] = useState<ToneSettingsType[]>(mockToneSettings);
  const [activeTab, setActiveTab] = useState<MessageSource>("instagram");

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
            <PlatformTabs settings={settings} />

            {settings.map((setting) => (
              <TabsContent key={setting.platform} value={setting.platform} className="space-y-6">
                <div className="space-y-8">
                  <ToneSlider
                    label="Formalidad"
                    value={setting.formality}
                    onChange={(value) => handleSettingChange(setting.platform, "formality", value)}
                    minLabel="Casual"
                    maxLabel="Formal"
                  />

                  <ToneSlider
                    label="Empatía"
                    value={setting.empathy}
                    onChange={(value) => handleSettingChange(setting.platform, "empathy", value)}
                    minLabel="Neutral"
                    maxLabel="Muy empático"
                  />

                  <ToneSlider
                    label="Creatividad"
                    value={setting.creativity}
                    onChange={(value) => handleSettingChange(setting.platform, "creativity", value)}
                    minLabel="Conservador"
                    maxLabel="Creativo"
                  />

                  <ToneSlider
                    label="Concisión"
                    value={setting.conciseness}
                    onChange={(value) => handleSettingChange(setting.platform, "conciseness", value)}
                    minLabel="Detallado"
                    maxLabel="Conciso"
                  />

                  <ToneSlider
                    label="Humor"
                    value={setting.humor}
                    onChange={(value) => handleSettingChange(setting.platform, "humor", value)}
                    minLabel="Serio"
                    maxLabel="Divertido"
                  />

                  <ToneSlider
                    label="Velocidad de respuesta"
                    value={setting.responseSpeed}
                    onChange={(value) => handleSettingChange(setting.platform, "responseSpeed", value)}
                    minLabel="Pausado"
                    maxLabel="Inmediato"
                  />

                  <ToneSlider
                    label="Nivel académico"
                    value={setting.academicLevel}
                    onChange={(value) => handleSettingChange(setting.platform, "academicLevel", value)}
                    minLabel="Básico"
                    maxLabel="Avanzado"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline">Restablecer valores predeterminados</Button>
                  <Button>Guardar configuración</Button>
                </div>

                <ToneExample setting={setting} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToneSettings;
