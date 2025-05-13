
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialAccount, MessageSource } from '@/types';
import { initiateAuth, revokeAccess } from '@/services/socialAuth';
import { getAccessToken, setAccessToken, clearAccessToken } from '@/services/socialApi';
import { toast } from 'sonner';
import { FiRefreshCw } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';

const SocialAccountsSettings = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState<Record<MessageSource, boolean>>({
    instagram: false,
    facebook: false,
    whatsapp: false,
    direct: false
  });

  // Load accounts from localStorage on component mount
  useEffect(() => {
    const loadAccounts = () => {
      if (!user) return;
      
      const platforms: MessageSource[] = ['instagram', 'facebook', 'whatsapp'];
      const loadedAccounts: SocialAccount[] = [];
      
      for (const platform of platforms) {
        const authJson = localStorage.getItem(`${user.id}_${platform}_auth`);
        
        if (authJson) {
          try {
            const auth = JSON.parse(authJson);
            
            // Check if token is expired
            const expired = auth.expiresAt && new Date(auth.expiresAt) < new Date();
            
            if (!expired && auth.accessToken) {
              // Restore the token to the in-memory store
              setAccessToken(platform, auth.accessToken);
              
              loadedAccounts.push({
                platform,
                username: getPlatformDisplayName(platform), // This would come from the API in a real app
                connected: true,
                lastSync: new Date(),
                accessToken: auth.accessToken,
                refreshToken: auth.refreshToken,
                expiresAt: auth.expiresAt ? new Date(auth.expiresAt) : undefined
              });
            } else {
              // Token is expired, clear it
              localStorage.removeItem(`${user.id}_${platform}_auth`);
              loadedAccounts.push({
                platform,
                username: getPlatformDisplayName(platform),
                connected: false
              });
            }
          } catch (error) {
            console.error(`Error parsing ${platform} auth:`, error);
          }
        } else {
          // No auth info found
          loadedAccounts.push({
            platform,
            username: getPlatformDisplayName(platform),
            connected: false
          });
        }
      }
      
      setAccounts(loadedAccounts);
    };
    
    loadAccounts();
    
    // Listen for auth success messages from popup windows
    const handleAuthMessage = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data?.type === 'AUTH_SUCCESS' &&
        event.data?.platform &&
        user
      ) {
        // Store user-specific platform auth
        const platformAuth = localStorage.getItem(`${event.data.platform}_auth`);
        if (platformAuth) {
          localStorage.setItem(`${user.id}_${event.data.platform}_auth`, platformAuth);
        }
        
        // Reload accounts after successful authentication
        loadAccounts();
      }
    };
    
    window.addEventListener('message', handleAuthMessage);
    
    return () => {
      window.removeEventListener('message', handleAuthMessage);
    };
  }, [user]);

  const getPlatformDisplayName = (platform: MessageSource): string => {
    switch (platform) {
      case 'instagram':
        return 'Instagram';
      case 'facebook':
        return 'Facebook';
      case 'whatsapp':
        return 'WhatsApp Business';
      default:
        return platform;
    }
  };

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

  const connectAccount = (platform: MessageSource) => {
    if (!user) {
      toast.error('Debes iniciar sesión para conectar una cuenta');
      return;
    }
    
    setLoading(prev => ({ ...prev, [platform]: true }));
    
    try {
      initiateAuth(platform);
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
      toast.error(`Error conectando con ${platform}`);
      setLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  const disconnectAccount = async (platform: MessageSource) => {
    if (!user) return;
    
    setLoading(prev => ({ ...prev, [platform]: true }));
    
    try {
      const token = getAccessToken(platform);
      
      if (token) {
        await revokeAccess(platform, token);
      }
      
      // Clear token from memory
      clearAccessToken(platform);
      
      // Clear from localStorage
      localStorage.removeItem(`${user.id}_${platform}_auth`);
      localStorage.removeItem(`${platform}_auth`); // Also clear the general one
      
      // Update accounts list
      setAccounts(prev => 
        prev.map(acc => 
          acc.platform === platform 
            ? { ...acc, connected: false, accessToken: undefined, refreshToken: undefined, expiresAt: undefined }
            : acc
        )
      );
      
      toast.success(`Desconectado de ${getPlatformDisplayName(platform)}`);
    } catch (error) {
      console.error(`Error disconnecting from ${platform}:`, error);
      toast.error(`Error al desconectar de ${platform}`);
    } finally {
      setLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Conectar cuentas sociales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-6">
            Conecta tus cuentas de redes sociales para que Humanizer pueda gestionar
            tus mensajes y responder automáticamente.
          </p>
          
          <div className="space-y-4">
            {accounts.map(account => (
              <div key={account.platform} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <div className="flex items-center gap-4">
                  {getPlatformIcon(account.platform)}
                  <div>
                    <p className="font-medium">{getPlatformDisplayName(account.platform)}</p>
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
                    ? disconnectAccount(account.platform) 
                    : connectAccount(account.platform)
                  }
                  disabled={loading[account.platform]}
                >
                  {loading[account.platform] && (
                    <FiRefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {account.connected ? "Desconectar" : "Conectar"}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-sm font-medium mb-2">Sobre los permisos:</h3>
            <p className="text-sm text-gray-600">
              Humanizer solicita permisos para leer y enviar mensajes en tu nombre.
              Nunca publicará contenido sin tu autorización explícita. Puedes revocar estos
              permisos en cualquier momento.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialAccountsSettings;
