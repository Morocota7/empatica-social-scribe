
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"
import { MessageSource } from "@/types"

// Datos simulados para comparación entre plataformas
const platformData = [
  { 
    fecha: "Ene", 
    instagram: 1200, 
    facebook: 980, 
    whatsapp: 740,
    crecimiento_instagram: "+5%",
    crecimiento_facebook: "+3%",
    crecimiento_whatsapp: "+7%"
  },
  { 
    fecha: "Feb", 
    instagram: 1350, 
    facebook: 1050, 
    whatsapp: 820,
    crecimiento_instagram: "+12%",
    crecimiento_facebook: "+7%",
    crecimiento_whatsapp: "+11%"
  },
  { 
    fecha: "Mar", 
    instagram: 1480, 
    facebook: 1120, 
    whatsapp: 910,
    crecimiento_instagram: "+10%",
    crecimiento_facebook: "+7%",
    crecimiento_whatsapp: "+11%"
  },
  { 
    fecha: "Abr", 
    instagram: 1650, 
    facebook: 1230, 
    whatsapp: 980,
    crecimiento_instagram: "+11%",
    crecimiento_facebook: "+10%",
    crecimiento_whatsapp: "+8%"
  },
  { 
    fecha: "May", 
    instagram: 1820, 
    facebook: 1340, 
    whatsapp: 1050,
    crecimiento_instagram: "+10%",
    crecimiento_facebook: "+9%",
    crecimiento_whatsapp: "+7%"
  },
]

// Datos simulados para posts con mejor rendimiento
const topPosts = [
  { 
    id: "post_1", 
    plataforma: "instagram" as MessageSource, 
    titulo: "Promoción verano 2025", 
    interacciones: 3480, 
    engagement: "24%", 
    fecha: "15/05/2025" 
  },
  { 
    id: "post_2", 
    plataforma: "facebook" as MessageSource, 
    titulo: "Descuento especial clientes", 
    interacciones: 2760, 
    engagement: "18%", 
    fecha: "02/05/2025" 
  },
  { 
    id: "post_3", 
    plataforma: "instagram" as MessageSource, 
    titulo: "Lanzamiento nueva colección", 
    interacciones: 2340, 
    engagement: "21%", 
    fecha: "25/04/2025" 
  },
]

const PlatformComparison = () => {
  const [metric, setMetric] = useState("interactions")
  const [timeRange, setTimeRange] = useState("6m")

  return (
    <Card className="bg-white">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Comparación entre Plataformas</CardTitle>
          <div className="flex gap-2">
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Métrica" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interactions">Interacciones</SelectItem>
                <SelectItem value="growth">Crecimiento</SelectItem>
                <SelectItem value="conversion">Conversión</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">3 meses</SelectItem>
                <SelectItem value="6m">6 meses</SelectItem>
                <SelectItem value="12m">12 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={platformData}>
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip 
                contentStyle={{ borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}
              />
              <Legend />
              <Line type="monotone" dataKey="instagram" stroke="#E1306C" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} />
              <Line type="monotone" dataKey="whatsapp" stroke="#25D366" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Publicaciones con Mayor Rendimiento</h3>
          <div className="space-y-3">
            {topPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    post.plataforma === 'instagram' ? 'bg-[#E1306C]' : 
                    post.plataforma === 'facebook' ? 'bg-[#1877F2]' : 
                    'bg-[#25D366]'
                  }`}>
                    {post.plataforma === 'instagram' ? 'IG' : 
                     post.plataforma === 'facebook' ? 'FB' : 
                     'WA'}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{post.titulo}</div>
                    <div className="text-xs text-gray-500">{post.fecha}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{post.interacciones.toLocaleString()}</div>
                  <div className="text-xs text-green-500">Engagement: {post.engagement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PlatformComparison
