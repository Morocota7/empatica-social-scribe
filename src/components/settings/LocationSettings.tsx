
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Flag } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const LocationSettings = () => {
  const [country, setCountry] = useState("es");
  const [timezone, setTimezone] = useState("Europe/Madrid");
  const [trackLocation, setTrackLocation] = useState(false);
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Configuración de ubicación</h3>
      <p className="text-sm text-gray-500">
        Configura la ubicación principal y zona horaria para optimizar las respuestas y análisis.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Flag className="h-5 w-5 text-gray-500 mt-1" />
          <div className="flex-1">
            <Label htmlFor="country" className="text-sm font-medium mb-2 block">
              País
            </Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full" id="country">
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">España</SelectItem>
                <SelectItem value="mx">México</SelectItem>
                <SelectItem value="ar">Argentina</SelectItem>
                <SelectItem value="co">Colombia</SelectItem>
                <SelectItem value="cl">Chile</SelectItem>
                <SelectItem value="pe">Perú</SelectItem>
                <SelectItem value="us">Estados Unidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <MapPin className="h-5 w-5 text-gray-500 mt-1" />
          <div className="flex-1">
            <Label htmlFor="timezone" className="text-sm font-medium mb-2 block">
              Zona horaria
            </Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-full" id="timezone">
                <SelectValue placeholder="Selecciona zona horaria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Europe/Madrid">Europe/Madrid (UTC+1/+2)</SelectItem>
                <SelectItem value="America/Mexico_City">America/Mexico City (UTC-6)</SelectItem>
                <SelectItem value="America/Argentina/Buenos_Aires">America/Buenos Aires (UTC-3)</SelectItem>
                <SelectItem value="America/Bogota">America/Bogotá (UTC-5)</SelectItem>
                <SelectItem value="America/Santiago">America/Santiago (UTC-4/-3)</SelectItem>
                <SelectItem value="America/Lima">America/Lima (UTC-5)</SelectItem>
                <SelectItem value="America/New_York">America/New York (UTC-5/-4)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <MapPin className="h-5 w-5 text-gray-500 mt-1" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="track-location" className="text-sm font-medium">
                Seguimiento de ubicación para analíticas
              </Label>
              <Switch 
                id="track-location" 
                checked={trackLocation} 
                onCheckedChange={setTrackLocation} 
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Permitir el seguimiento de ubicación para mejorar las analíticas y personalizar las respuestas según la ubicación de tus clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSettings;
