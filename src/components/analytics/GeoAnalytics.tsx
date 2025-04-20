import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { MapPin, Users, Calendar, Clock } from "lucide-react"

// Datos simulados para análisis geográfico
const locationData = [
  { city: "Madrid", country: "España", interactions: 1240, growth: "+12%" },
  { city: "Barcelona", country: "España", interactions: 980, growth: "+8%" },
  { city: "Ciudad de México", country: "México", interactions: 860, growth: "+15%" },
  { city: "Bogotá", country: "Colombia", interactions: 720, growth: "+10%" },
  { city: "Lima", country: "Perú", interactions: 640, growth: "+5%" },
]

// Datos simulados para análisis demográfico
const demographicData = [
  { age: "18-24", percentage: 28 },
  { age: "25-34", percentage: 42 },
  { age: "35-44", percentage: 18 },
  { age: "45-54", percentage: 8 },
  { age: "55+", percentage: 4 },
]

// Datos simulados para análisis de horarios
const timeData = [
  { hour: "06:00", interactions: 120 },
  { hour: "09:00", interactions: 340 },
  { hour: "12:00", interactions: 280 },
  { hour: "15:00", interactions: 410 },
  { hour: "18:00", interactions: 520 },
  { hour: "21:00", interactions: 380 },
  { hour: "00:00", interactions: 180 },
]

const GeoAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30d")
  const [dataView, setDataView] = useState("geo")

  return (
    <Card className="bg-white">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">
            {dataView === "geo" && 
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Análisis Geográfico
              </div>
            }
            {dataView === "demo" && 
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Análisis Demográfico
              </div>
            }
            {dataView === "time" && 
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horarios de Mayor Actividad
              </div>
            }
          </CardTitle>
          <div className="flex gap-2">
            <Select value={dataView} onValueChange={setDataView}>
              <SelectTrigger className="w-[150px] h-8 text-xs">
                <SelectValue placeholder="Tipo de análisis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="geo">Ubicaciones</SelectItem>
                <SelectItem value="demo">Demografía</SelectItem>
                <SelectItem value="time">Horarios</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 días</SelectItem>
                <SelectItem value="30d">30 días</SelectItem>
                <SelectItem value="90d">90 días</SelectItem>
                <SelectItem value="12m">12 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {dataView === "geo" && (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>País</TableHead>
                  <TableHead className="text-right">Interacciones</TableHead>
                  <TableHead className="text-right">Crecimiento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locationData.map((location, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{location.city}</TableCell>
                    <TableCell>{location.country}</TableCell>
                    <TableCell className="text-right">{location.interactions.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-500">{location.growth}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {dataView === "demo" && (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demographicData}>
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}%`, "Usuarios"]}
                  contentStyle={{ borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="percentage" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center text-sm mt-2 text-gray-500">
              Edad promedio de usuarios: 31 años
            </div>
          </div>
        )}

        {dataView === "time" && (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="interactions" fill="#7E69AB" />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center text-sm mt-2 text-gray-500">
              Horario con mayor actividad: 18:00 - 19:00
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GeoAnalytics
