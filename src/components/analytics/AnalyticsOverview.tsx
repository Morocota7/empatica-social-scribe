
import GeoAnalytics from "./GeoAnalytics"
import PlatformComparison from "./PlatformComparison"

const AnalyticsOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <GeoAnalytics />
      <PlatformComparison />
    </div>
  )
}

export default AnalyticsOverview
