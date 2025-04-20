
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { activityData } from "./utils/mockData"

const ActivityByPlatform = () => {
  return (
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
  )
}

export default ActivityByPlatform
