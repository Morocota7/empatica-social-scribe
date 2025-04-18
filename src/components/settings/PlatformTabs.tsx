
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSource, ToneSettings } from "@/types";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

interface PlatformTabsProps {
  settings: ToneSettings[];
}

export const PlatformTabs = ({ settings }: PlatformTabsProps) => {
  const getPlatformName = (platform: MessageSource): string => {
    switch (platform) {
      case "instagram":
        return "Instagram";
      case "facebook":
        return "Facebook";
      case "whatsapp":
        return "WhatsApp";
      case "direct":
        return "Chat Directo";
      default:
        return platform;
    }
  };

  const getPlatformIcon = (platform: MessageSource) => {
    switch (platform) {
      case "instagram":
        return <FaInstagram className="text-[#E1306C]" />;
      case "facebook":
        return <FaFacebook className="text-[#1877F2]" />;
      case "whatsapp":
        return <FaWhatsapp className="text-[#25D366]" />;
      case "direct":
        return <FiSettings />;
      default:
        return null;
    }
  };

  return (
    <TabsList className="grid grid-cols-4 mb-6">
      {settings.map((setting) => (
        <TabsTrigger
          key={setting.platform}
          value={setting.platform}
          className="flex items-center gap-2"
        >
          {getPlatformIcon(setting.platform)}
          {getPlatformName(setting.platform)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
