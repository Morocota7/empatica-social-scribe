
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { handleAuthCallback } from '@/services/socialAuth';
import { setAccessToken } from '@/services/socialApi';
import { MessageSource } from '@/types';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Get the authorization code and state from the URL
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const platform = (params.platform as MessageSource) || searchParams.get('state') as MessageSource;
        
        if (!code) {
          throw new Error('No authorization code received');
        }
        
        if (!platform || !['instagram', 'facebook', 'whatsapp'].includes(platform)) {
          throw new Error('Invalid state parameter');
        }
        
        // Process the authentication callback
        const response = await handleAuthCallback(platform, code);
        
        if (!response.success || !response.accessToken) {
          throw new Error(response.error || 'Authentication failed');
        }
        
        // Store the access token
        setAccessToken(platform, response.accessToken);
        
        // Store additional auth info in localStorage (in a real app, use a more secure method)
        const expiresAt = response.expiresIn 
          ? new Date(Date.now() + response.expiresIn * 1000).toISOString()
          : null;
        
        const authData = JSON.stringify({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresAt
        });
        
        // Store both in general storage and user-specific storage if user is logged in
        localStorage.setItem(`${platform}_auth`, authData);
        
        if (user) {
          localStorage.setItem(`${user.id}_${platform}_auth`, authData);
        }
        
        toast.success(`Successfully connected to ${platform}`);
        
        // Close this window if it's a popup
        if (window.opener) {
          window.opener.postMessage({ 
            type: 'AUTH_SUCCESS', 
            platform: platform 
          }, window.location.origin);
          window.close();
        } else {
          // Otherwise navigate back to settings
          navigate('/settings');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setError(error instanceof Error ? error.message : 'Authentication failed');
        toast.error('Authentication failed');
      } finally {
        setLoading(false);
      }
    };
    
    processAuth();
  }, [location, navigate, params, user]);

  // If this is a popup window, we don't need much UI
  if (window.opener) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {loading ? (
          <p>Processing authentication...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>Authentication successful! You can close this window.</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Humanizer Authentication</h1>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Processing authentication...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p>Authentication Error: {error}</p>
            <button 
              onClick={() => navigate('/settings')}
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Return to Settings
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="rounded-full h-12 w-12 bg-green-100 text-green-500 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium">Authentication Successful!</p>
            <button 
              onClick={() => navigate('/settings')}
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Return to Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
