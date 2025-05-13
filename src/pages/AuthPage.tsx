
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/useAuth';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-empatica-primary">
              <span className="text-empatica-accent">E</span>mpatica
            </h1>
          </div>
        </div>
      </header>

      {/* Auth Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-gray-100">
            {isLoginForm ? (
              <LoginForm onToggleForm={toggleForm} />
            ) : (
              <RegisterForm onToggleForm={toggleForm} />
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500 mb-4">
                Conecta tus cuentas sociales después de iniciar sesión
              </p>
              <div className="flex justify-center gap-8">
                <div className="p-2 rounded-full bg-[#E1306C]/10 text-[#E1306C]">
                  <FaInstagram size={24} />
                </div>
                <div className="p-2 rounded-full bg-[#1877F2]/10 text-[#1877F2]">
                  <FaFacebook size={24} />
                </div>
                <div className="p-2 rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <FaWhatsapp size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Empatica AI. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
