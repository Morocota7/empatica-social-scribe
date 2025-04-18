
import { MessageSource, AuthResponse, SocialApiConfig } from '@/types';
import { toast } from 'sonner';

// API configuration for each platform
const apiConfigs: Record<MessageSource, SocialApiConfig | null> = {
  instagram: {
    clientId: 'YOUR_INSTAGRAM_CLIENT_ID', // Replace with actual ID from Meta for Developers
    clientSecret: 'YOUR_INSTAGRAM_CLIENT_SECRET',
    redirectUri: `${window.location.origin}/auth/callback/instagram`,
    scopes: ['user_profile', 'user_media', 'instagram_basic', 'instagram_manage_comments', 'instagram_manage_messages']
  },
  facebook: {
    clientId: 'YOUR_FACEBOOK_CLIENT_ID', // Replace with actual ID from Meta for Developers
    clientSecret: 'YOUR_FACEBOOK_CLIENT_SECRET',
    redirectUri: `${window.location.origin}/auth/callback/facebook`,
    scopes: ['email', 'pages_show_list', 'pages_messaging', 'pages_manage_metadata', 'pages_read_engagement']
  },
  whatsapp: {
    clientId: 'YOUR_FACEBOOK_CLIENT_ID', // WhatsApp uses Facebook Business API
    clientSecret: 'YOUR_FACEBOOK_CLIENT_SECRET',
    redirectUri: `${window.location.origin}/auth/callback/whatsapp`,
    scopes: ['whatsapp_business_management', 'whatsapp_business_messaging']
  },
  direct: null // Direct messaging doesn't need external authentication
};

/**
 * Initiates OAuth flow for a social platform
 */
export const initiateAuth = (platform: MessageSource): void => {
  const config = apiConfigs[platform];
  
  if (!config) {
    toast.error(`Authentication not supported for ${platform}`);
    return;
  }
  
  // For Instagram and Facebook (Meta platforms), we use the same base URL
  const baseUrl = platform === 'whatsapp' 
    ? 'https://www.facebook.com/v17.0/dialog/oauth'
    : 'https://api.instagram.com/oauth/authorize';
  
  const authUrl = new URL(baseUrl);
  authUrl.searchParams.append('client_id', config.clientId);
  authUrl.searchParams.append('redirect_uri', config.redirectUri);
  authUrl.searchParams.append('scope', config.scopes.join(','));
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('state', platform); // Used to verify the callback
  
  // Open the authorization URL in a popup window
  const width = 600;
  const height = 700;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;
  
  window.open(
    authUrl.toString(),
    `Humanizer - ${platform} Auth`,
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

/**
 * Handles OAuth callback and exchanges auth code for access token
 */
export const handleAuthCallback = async (platform: MessageSource, code: string): Promise<AuthResponse> => {
  const config = apiConfigs[platform];
  
  if (!config) {
    return { success: false, error: `Authentication not supported for ${platform}` };
  }
  
  try {
    // For Instagram and Facebook (Meta platforms)
    const tokenUrl = platform === 'whatsapp' || platform === 'facebook'
      ? 'https://graph.facebook.com/v17.0/oauth/access_token'
      : 'https://api.instagram.com/oauth/access_token';
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
        code,
        grant_type: 'authorization_code',
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error_message || 'Failed to exchange code for token');
    }
    
    return {
      success: true,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    };
  } catch (error) {
    console.error(`Error getting ${platform} token:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Refreshes an expired access token
 */
export const refreshAccessToken = async (platform: MessageSource, refreshToken: string): Promise<AuthResponse> => {
  const config = apiConfigs[platform];
  
  if (!config) {
    return { success: false, error: `Authentication not supported for ${platform}` };
  }
  
  try {
    // Only Facebook/Meta platforms support refresh tokens
    if (platform !== 'facebook' && platform !== 'instagram' && platform !== 'whatsapp') {
      return { success: false, error: `Refresh token not supported for ${platform}` };
    }
    
    const response = await fetch('https://graph.facebook.com/v17.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error_message || 'Failed to refresh token');
    }
    
    return {
      success: true,
      accessToken: data.access_token,
      refreshToken: data.refresh_token || refreshToken, // Some platforms don't return a new refresh token
      expiresIn: data.expires_in,
    };
  } catch (error) {
    console.error(`Error refreshing ${platform} token:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Revokes access for a platform (logs out)
 */
export const revokeAccess = async (platform: MessageSource, accessToken: string): Promise<boolean> => {
  const config = apiConfigs[platform];
  
  if (!config) {
    return false;
  }
  
  try {
    // For Meta platforms (Facebook, Instagram, WhatsApp)
    const revokeUrl = 'https://graph.facebook.com/v17.0/me/permissions';
    
    const response = await fetch(revokeUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error(`Error revoking ${platform} access:`, error);
    return false;
  }
};
