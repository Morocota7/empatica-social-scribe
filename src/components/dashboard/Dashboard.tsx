
import StatsOverview from "./StatsOverview"
import SentimentChart from "./SentimentChart"
import TrendsChart from "./TrendsChart"
import FileUploader from "./FileUploader"
import GeoAnalytics from "./GeoAnalytics"
import PlatformComparison from "./PlatformComparison"
import RecentConversations from "./RecentConversations"
import TrendingTopics from "./TrendingTopics"
import ActivityByPlatform from "./ActivityByPlatform"

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <StatsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SentimentChart />
        <TrendsChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GeoAnalytics />
        <PlatformComparison />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FileUploader />
        <RecentConversations />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendingTopics />
        <ActivityByPlatform />
      </div>
    </div>
  )
}

export default Dashboard
