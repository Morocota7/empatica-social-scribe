
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSource, SocialAccount } from '@/types';
import { FiRefreshCw } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

interface SocialAccountItemProps {
  account: SocialAccount;
  loading: boolean;
  onConnect: (platform: MessageSource) => void;
  onDisconnect: (platform: MessageSource) => void;
}

const SocialAccountItem = ({ 
  account, 
  loading, 
  onConnect, 
  onDisconnect 
}: SocialAccountItemProps) => {
  const getPlatformIcon = (platform: MessageSource) => {
    switch (platform) {
      case 'instagram':
        return <FaInstagram className="text-[#E1306C] text-xl" />;
      case 'facebook':
        return <FaFacebook className="text-[#1877F2] text-xl" />;
      case 'whatsapp':
        return <FaWhatsapp className="text-[#25D366] text-xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
      <div className="flex items-center gap-4">
        {getPlatformIcon(account.platform)}
        <div>
          <p className="font-medium">{account.username}</p>
          <p className="text-sm text-gray-500">
            {account.connected 
              ? `Conectado como ${account.username}`
              : 'No conectado'}
          </p>
        </div>
      </div>
      
      <Button
        variant={account.connected ? "outline" : "default"}
        onClick={() => account.connected 
          ? onDisconnect(account.platform) 
          : onConnect(account.platform)
        }
        disabled={loading}
      >
        {loading && <FiRefreshCw className="mr-2 h-4 w-4 animate-spin" />}
        {account.connected ? "Desconectar" : "Conectar"}
      </Button>
    </div>
  );
};

export default SocialAccountItem;
