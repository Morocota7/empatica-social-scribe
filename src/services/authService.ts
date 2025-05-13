
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Store user data in localStorage for persistence
const AUTH_STORAGE_KEY = 'empatica_auth_state';

// Initial state for authentication
let authState: AuthState = {
  user: null,
  isAuthenticated: false
};

// Load auth state from localStorage if available
const loadAuthState = (): void => {
  try {
    const storedState = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedState) {
      authState = JSON.parse(storedState);
    }
  } catch (error) {
    console.error('Error loading auth state from storage:', error);
    // Clear potentially corrupted state
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

// Save auth state to localStorage
const saveAuthState = (): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  } catch (error) {
    console.error('Error saving auth state to storage:', error);
  }
};

// Initialize by loading from storage
loadAuthState();

// Method to register a new user
export const register = async (data: RegisterData): Promise<boolean> => {
  try {
    // In a real app, this would call an API endpoint
    // For demo, we'll simulate successful registration
    
    // Check if user already exists
    const existingUsers = getStoredUsers();
    const existing = existingUsers.find(u => u.email === data.email);
    if (existing) {
      toast.error('Este correo electrónico ya está registrado');
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name
    };
    
    // Store user in "database" (localStorage)
    storeUser(newUser, data.password);
    
    // Auto login after registration
    authState = {
      user: newUser,
      isAuthenticated: true
    };
    saveAuthState();
    
    toast.success('Registro exitoso');
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    toast.error('Error durante el registro');
    return false;
  }
};

// Method to log in a user
export const login = async (credentials: AuthCredentials): Promise<boolean> => {
  try {
    // In a real app, this would call an API endpoint
    // For demo, we'll check against stored users
    
    const users = getStoredUsers();
    const user = users.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );
    
    if (!user) {
      toast.error('Credenciales incorrectas');
      return false;
    }
    
    // Set authenticated state
    authState = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      },
      isAuthenticated: true
    };
    saveAuthState();
    
    toast.success('Inicio de sesión exitoso');
    return true;
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Error durante el inicio de sesión');
    return false;
  }
};

// Method to log out the current user
export const logout = (): void => {
  authState = {
    user: null,
    isAuthenticated: false
  };
  saveAuthState();
  toast.info('Se ha cerrado la sesión');
};

// Get current auth state
export const getAuthState = (): AuthState => {
  return { ...authState };
};

// Get the current user
export const getCurrentUser = (): User | null => {
  return authState.user;
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  return authState.isAuthenticated && authState.user !== null;
};

// Utility functions for demo user storage
interface StoredUser extends User {
  password: string;
}

const USERS_STORAGE_KEY = 'empatica_users';

const getStoredUsers = (): StoredUser[] => {
  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  } catch {
    return [];
  }
};

const storeUser = (user: User, password: string): void => {
  try {
    const users = getStoredUsers();
    users.push({ ...user, password });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error storing user:', error);
  }
};
