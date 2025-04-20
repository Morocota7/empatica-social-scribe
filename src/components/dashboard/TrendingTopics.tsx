
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiBarChart2 } from "react-icons/fi"

const TrendingTopics = () => {
  return (
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
  )
}

export default TrendingTopics
