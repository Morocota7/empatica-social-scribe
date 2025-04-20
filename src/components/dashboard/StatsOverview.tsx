
import { FiMessageSquare, FiUsers, FiClock, FiMessageCircle } from "react-icons/fi"
import StatCard from "./StatCard"

const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total mensajes"
        value="342"
        description="Últimos 7 días"
        icon={<FiMessageSquare size={18} />}
        trend="up"
        trendValue="+24% vs semana anterior"
        color="primary"
      />
      <StatCard
        title="Contactos activos"
        value="87"
        description="En todas las plataformas"
        icon={<FiUsers size={18} />}
        trend="up"
        trendValue="+12% vs semana anterior"
        color="secondary"
      />
      <StatCard
        title="Tiempo de respuesta"
        value="14 min"
        description="Promedio"
        icon={<FiClock size={18} />}
        trend="down"
        trendValue="-25% vs semana anterior"
        color="success"
      />
      <StatCard
        title="Tasa de respuesta"
        value="98%"
        description="Mensajes respondidos"
        icon={<FiMessageCircle size={18} />}
        trend="neutral"
        trendValue="Sin cambios"
        color="accent"
      />
    </div>
  )
}

export default StatsOverview
