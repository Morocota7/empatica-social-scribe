
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

const trendData = [
  { name: "Ene", hombres: 45, mujeres: 55 },
  { name: "Feb", hombres: 38, mujeres: 62 },
  { name: "Mar", hombres: 42, mujeres: 58 },
  { name: "Abr", hombres: 40, mujeres: 60 },
  { name: "May", hombres: 35, mujeres: 65 },
]

const TrendsChart = () => {
  const handleDownloadPDF = () => {
    console.log("Descargando informe PDF...")
  }

  return (
    <Card className="bg-white">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Tendencias por Género</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadPDF}
            className="gap-2"
          >
            <FileDown size={16} />
            Descargar Informe
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "0.375rem", 
                  border: "1px solid #e2e8f0" 
                }}
              />
              <Bar 
                dataKey="hombres" 
                name="Hombres" 
                fill="#3b82f6" 
              />
              <Bar 
                dataKey="mujeres" 
                name="Mujeres" 
                fill="#ec4899" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default TrendsChart
