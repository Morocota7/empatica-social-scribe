
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { MessageSource } from "@/types";

interface SentimentData {
  name: string;
  value: number;
  color: string;
}

interface SentimentChartProps {
  title?: string;
}

export const SentimentChart = ({ title = "Análisis de Sentimiento" }: SentimentChartProps) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [platform, setPlatform] = useState<MessageSource | "all">("all");

  // Datos simulados - En una aplicación real, estos datos vendrían de una API
  const sentimentData: SentimentData[] = [
    { name: "Positivos", value: 65, color: "#68D391" },  // verde
    { name: "Neutrales", value: 25, color: "#F6AD55" },  // naranja
    { name: "Negativos", value: 10, color: "#FC8181" },  // rojo
  ];

  return (
    <Card className="bg-white">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className="flex gap-2">
            <Select value={platform} onValueChange={(value) => setPlatform(value as MessageSource | "all")}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 horas</SelectItem>
                <SelectItem value="7d">7 días</SelectItem>
                <SelectItem value="30d">30 días</SelectItem>
                <SelectItem value="90d">90 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, "Porcentaje"]}
                contentStyle={{ borderRadius: "0.375rem", border: "1px solid #e2e8f0" }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-xs font-medium">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {sentimentData.map((item) => (
            <div key={item.name} className="text-center">
              <div 
                className="text-lg font-bold" 
                style={{ color: item.color }}
              >
                {item.value}%
              </div>
              <div className="text-xs text-gray-500">{item.name}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentChart;
