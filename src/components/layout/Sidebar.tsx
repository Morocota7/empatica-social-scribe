
import { Button } from "@/components/ui/button";
import { MessageSource } from "@/types";
import { mockSocialAccounts } from "@/utils/mock-data";
import { FiHome, FiMessageSquare, FiSettings, FiPieChart, FiUsers } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link to="/">
          <h2 className="text-2xl font-bold text-empatica-primary flex items-center gap-2">
            <span className="text-empatica-accent">H</span>umanizer
          </h2>
          <p className="text-sm text-gray-500">Asistente empático para redes sociales</p>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Button 
          variant={currentPath === "/dashboard" ? "default" : "ghost"} 
          className="w-full justify-start gap-2"
          asChild
        >
          <Link to="/dashboard">
            <FiHome />
            <span>Dashboard</span>
          </Link>
        </Button>
        <Button 
          variant={currentPath === "/conversations" ? "default" : "ghost"} 
          className="w-full justify-start gap-2"
          asChild
        >
          <Link to="/conversations">
            <FiMessageSquare />
            <span>Conversaciones</span>
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2"
        >
          <FiUsers />
          <span>Contactos</span>
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2"
        >
          <FiPieChart />
          <span>Análisis</span>
        </Button>
        <Button 
          variant={currentPath === "/settings" ? "default" : "ghost"} 
          className="w-full justify-start gap-2"
          asChild
        >
          <Link to="/settings">
            <FiSettings />
            <span>Configuración</span>
          </Link>
        </Button>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Cuentas conectadas</p>
        <div className="space-y-2">
          {mockSocialAccounts.map((account) => (
            <div key={account.platform} className="flex items-center gap-2">
              {account.platform === "instagram" && (
                <FaInstagram className="text-[#E1306C]" />
              )}
              {account.platform === "facebook" && (
                <FaFacebook className="text-[#1877F2]" />
              )}
              {account.platform === "whatsapp" && (
                <FaWhatsapp className="text-[#25D366]" />
              )}
              <span className="text-sm">{account.username}</span>
              <span className={`h-2 w-2 rounded-full ${account.connected ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
