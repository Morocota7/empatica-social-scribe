
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "./StatCard";
import SentimentChart from "./SentimentChart";
import { FiMessageSquare, FiUsers, FiClock, FiMessageCircle, FiBarChart2 } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Datos simulados para el gráfico de actividad diaria
  const activityData = [
    { day: "Lun", instagram: 12, facebook: 8, whatsapp: 15 },
    { day: "Mar", instagram: 15, facebook: 10, whatsapp: 12 },
    { day: "Mié", instagram: 8, facebook: 13, whatsapp: 17 },
    { day: "Jue", instagram: 10, facebook: 15, whatsapp: 14 },
    { day: "Vie", instagram: 20, facebook: 12, whatsapp: 19 },
    { day: "Sáb", instagram: 15, facebook: 8, whatsapp: 10 },
    { day: "Dom", instagram: 5, facebook: 6, whatsapp: 8 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total mensajes"
          value="342"
          description="Últimos 7 días"
          icon={<FiMessageSquare size={18} />}
          trend="up"
          trendValue="+24% vs semana anterior"
          color="primary"
        />
        <StatCard
          title="Contactos activos"
          value="87"
          description="En todas las plataformas"
          icon={<FiUsers size={18} />}
          trend="up"
          trendValue="+12% vs semana anterior"
          color="secondary"
        />
        <StatCard
          title="Tiempo de respuesta"
          value="14 min"
          description="Promedio"
          icon={<FiClock size={18} />}
          trend="down"
          trendValue="-25% vs semana anterior"
          color="success"
        />
        <StatCard
          title="Tasa de respuesta"
          value="98%"
          description="Mensajes respondidos"
          icon={<FiMessageCircle size={18} />}
          trend="neutral"
          trendValue="Sin cambios"
          color="accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SentimentChart />
        
        <Card className="bg-white">
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-medium">Actividad por plataforma</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}
                  />
                  <Bar 
                    dataKey="instagram" 
                    name="Instagram" 
                    stackId="a" 
                    fill="#E1306C" 
                  />
                  <Bar 
                    dataKey="facebook" 
                    name="Facebook" 
                    stackId="a" 
                    fill="#1877F2" 
                  />
                  <Bar 
                    dataKey="whatsapp" 
                    name="WhatsApp" 
                    stackId="a" 
                    fill="#25D366" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#E1306C] rounded-full mr-2"></div>
                <span className="text-xs">Instagram</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#1877F2] rounded-full mr-2"></div>
                <span className="text-xs">Facebook</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#25D366] rounded-full mr-2"></div>
                <span className="text-xs">WhatsApp</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        
        <Card className="bg-white">
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-medium">Temas populares</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {[
                { topic: "Consultas de producto", count: 86, sentiment: "positive" },
                { topic: "Tiempos de entrega", count: 64, sentiment: "neutral" },
                { topic: "Proceso de devolución", count: 42, sentiment: "negative" },
                { topic: "Atención al cliente", count: 38, sentiment: "positive" },
                { topic: "Precios y promociones", count: 27, sentiment: "neutral" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-2 h-2 rounded-full ${
                        item.sentiment === "positive" 
                          ? "bg-green-500" 
                          : item.sentiment === "negative" 
                          ? "bg-red-500" 
                          : "bg-amber-500"
                      }`}
                    ></div>
                    <span className="text-sm">{item.topic}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{item.count}</span>
                    <FiBarChart2 className="text-gray-400" size={14} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
