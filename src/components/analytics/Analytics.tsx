
import GeoAnalytics from "./GeoAnalytics"
import PlatformComparison from "./PlatformComparison"
import TrendsChart from "./TrendsChart"

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Análisis</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GeoAnalytics />
        <PlatformComparison />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendsChart />
      </div>
    </div>
  )
}

export default Analytics
