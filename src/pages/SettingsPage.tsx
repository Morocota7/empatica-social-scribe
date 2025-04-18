
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ToneSettings from "@/components/settings/ToneSettings";
import SocialAccountsSettings from "@/components/settings/SocialAccountsSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiSliders, FiUsers, FiGlobe, FiBell } from "react-icons/fi";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("tone");

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Configuración</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="tone" className="flex items-center gap-2">
              <FiSliders className="h-4 w-4" />
              <span>Tonos</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <FiUsers className="h-4 w-4" />
              <span>Cuentas sociales</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <FiGlobe className="h-4 w-4" />
              <span>Idioma</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <FiBell className="h-4 w-4" />
              <span>Notificaciones</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tone">
            <ToneSettings />
          </TabsContent>
          
          <TabsContent value="accounts">
            <SocialAccountsSettings />
          </TabsContent>
          
          <TabsContent value="language">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Configuración de idioma</h2>
              <p className="text-gray-500 mb-6">
                Configura el idioma principal y los idiomas secundarios para la detección y respuesta automática.
              </p>
              
              <div className="space-y-4">
                {/* Aquí irían los componentes para configurar idiomas */}
                <div className="p-4 text-center">
                  <p className="text-gray-500">
                    Configuración de idiomas (en desarrollo)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
              <p className="text-gray-500 mb-6">
                Configura cómo y cuándo quieres recibir notificaciones sobre nuevos mensajes, análisis y alertas.
              </p>
              
              <div className="space-y-4">
                {/* Aquí irían los componentes para configurar notificaciones */}
                <div className="p-4 text-center">
                  <p className="text-gray-500">
                    Configuración de notificaciones (en desarrollo)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
