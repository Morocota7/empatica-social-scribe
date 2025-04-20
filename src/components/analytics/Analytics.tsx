
import AnalyticsOverview from "./AnalyticsOverview"
import DetailedAnalytics from "./DetailedAnalytics"

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Análisis</h1>
      <AnalyticsOverview />
      <DetailedAnalytics />
    </div>
  )
}

export default Analytics
