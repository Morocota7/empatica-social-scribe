
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  User, 
  AuthCredentials, 
  RegisterData, 
  register as authRegister, 
  login as authLogin, 
  logout as authLogout,
  getCurrentUser,
  isAuthenticated as checkAuth
} from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (data: RegisterData) => Promise<boolean>;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state from storage
  useEffect(() => {
    const currentUser = getCurrentUser();
    const authenticated = checkAuth();
    
    setUser(currentUser);
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  const register = async (data: RegisterData): Promise<boolean> => {
    const success = await authRegister(data);
    
    if (success) {
      setUser(getCurrentUser());
      setIsAuthenticated(true);
    }
    
    return success;
  };

  const login = async (credentials: AuthCredentials): Promise<boolean> => {
    const success = await authLogin(credentials);
    
    if (success) {
      setUser(getCurrentUser());
      setIsAuthenticated(true);
    }
    
    return success;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      register,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
