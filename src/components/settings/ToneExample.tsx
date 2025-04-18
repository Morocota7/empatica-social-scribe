
import { ToneSettings } from "@/types";

interface ToneExampleProps {
  setting: ToneSettings;
}

export const ToneExample = ({ setting }: ToneExampleProps) => {
  return (
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
  );
};
