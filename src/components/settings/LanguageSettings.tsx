
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Globe, Languages } from "lucide-react";
import LocationSettings from "./LocationSettings";

const LanguageSettings = () => {
  const [primaryLanguage, setPrimaryLanguage] = useState("es");
  const [detectLanguage, setDetectLanguage] = useState(true);
  const [secondaryLanguages, setSecondaryLanguages] = useState<string[]>(["en"]);
  
  const handleAddSecondaryLanguage = (lang: string) => {
    if (!secondaryLanguages.includes(lang)) {
      setSecondaryLanguages([...secondaryLanguages, lang]);
    }
  };

  const handleRemoveSecondaryLanguage = (lang: string) => {
    setSecondaryLanguages(secondaryLanguages.filter(l => l !== lang));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Configuración de idioma</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-6">
            Configura el idioma principal y los idiomas secundarios para la detección y respuesta automática.
          </p>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Globe className="h-5 w-5 text-gray-500 mt-1" />
                <div className="flex-1">
                  <Label htmlFor="primary-language" className="text-sm font-medium mb-2 block">
                    Idioma principal
                  </Label>
                  <Select value={primaryLanguage} onValueChange={setPrimaryLanguage}>
                    <SelectTrigger className="w-full" id="primary-language">
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">Inglés</SelectItem>
                      <SelectItem value="fr">Francés</SelectItem>
                      <SelectItem value="pt">Portugués</SelectItem>
                      <SelectItem value="de">Alemán</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Este será el idioma predeterminado para todas las comunicaciones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Languages className="h-5 w-5 text-gray-500 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="detect-language" className="text-sm font-medium">
                      Detección automática de idioma
                    </Label>
                    <Switch 
                      id="detect-language" 
                      checked={detectLanguage} 
                      onCheckedChange={setDetectLanguage} 
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Activar esta opción permitirá detectar automáticamente el idioma de los mensajes entrantes
                    y responder en el mismo idioma.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Languages className="h-5 w-5 text-gray-500 mt-1" />
                <div className="flex-1">
                  <Label className="text-sm font-medium mb-2 block">
                    Idiomas secundarios soportados
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {secondaryLanguages.map(lang => (
                      <div key={lang} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                        <span>{getLanguageName(lang)}</span>
                        <button 
                          className="text-gray-500 hover:text-gray-700 ml-1" 
                          onClick={() => handleRemoveSecondaryLanguage(lang)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <Select 
                    onValueChange={(value) => {
                      handleAddSecondaryLanguage(value);
                    }}
                    value=""
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Añadir idioma secundario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">Inglés</SelectItem>
                      <SelectItem value="fr">Francés</SelectItem>
                      <SelectItem value="pt">Portugués</SelectItem>
                      <SelectItem value="de">Alemán</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Los idiomas secundarios se utilizarán para responder si se detecta que el mensaje entrante está en uno de ellos.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <LocationSettings />
            </div>

            <div className="flex justify-end mt-6">
              <Button>Guardar configuración</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getLanguageName = (code: string): string => {
  const languages: Record<string, string> = {
    es: "Español",
    en: "Inglés",
    fr: "Francés",
    pt: "Portugués",
    de: "Alemán",
    it: "Italiano"
  };
  return languages[code] || code;
};

export default LanguageSettings;
