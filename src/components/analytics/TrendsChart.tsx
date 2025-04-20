
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

const trendData = [
  { name: "Ene", productos: 35, publicaciones: 28 },
  { name: "Feb", productos: 42, publicaciones: 32 },
  { name: "Mar", productos: 58, publicaciones: 45 },
  { name: "Abr", productos: 45, publicaciones: 38 },
  { name: "May", productos: 62, publicaciones: 52 },
]

const TrendsChart = () => {
  const handleDownloadPDF = () => {
    console.log("Descargando informe PDF...")
  }

  return (
    <Card className="bg-white">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Tendencias</CardTitle>
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
                dataKey="productos" 
                name="Productos" 
                fill="#9b87f5" 
              />
              <Bar 
                dataKey="publicaciones" 
                name="Publicaciones" 
                fill="#7E69AB" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default TrendsChart
