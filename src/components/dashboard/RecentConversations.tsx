
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"

const RecentConversations = () => {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-medium">Conversaciones recientes</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  {["MG", "JL", "AP", "CR", "LS"][index]}
                </div>
                <div>
                  <div className="font-medium text-sm flex items-center gap-1">
                    {["María García", "Juan López", "Ana Pérez", "Carlos Rodríguez", "Laura Sánchez"][index]}
                    {[<FaInstagram key="i" className="text-[#E1306C] text-xs" />, 
                      <FaFacebook key="f" className="text-[#1877F2] text-xs" />, 
                      <FaWhatsapp key="w" className="text-[#25D366] text-xs" />, 
                      <FaInstagram key="i2" className="text-[#E1306C] text-xs" />, 
                      <FaFacebook key="f2" className="text-[#1877F2] text-xs" />
                    ][index]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {["¿Tienen disponibilidad?", "Gracias por la ayuda", "Necesito cambiar mi pedido", "¿Cuándo llega mi envío?", "Quiero hacer una consulta"][index]}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {["12m", "1h", "3h", "5h", "8h"][index]}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentConversations
