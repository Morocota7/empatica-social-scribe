import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FiMessageCircle, FiBarChart2, FiSettings } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-empatica-primary">
              <span className="text-empatica-accent">E</span>mpatica
            </h1>
          </div>
          <div>
            <Button asChild>
              <Link to="/dashboard">Iniciar sesión</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-empatica-light to-white py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-empatica-dark">
              Chatbot empático para tus redes sociales
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Gestiona mensajes privados y comentarios en Instagram, Facebook y WhatsApp con un asistente impulsado por IA que entiende y responde con empatía a tus clientes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-empatica-primary hover:bg-empatica-primary/90">
                <Link to="/dashboard">Comenzar ahora</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/conversations">Ver demostración</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-empatica-accent/20 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-empatica-secondary/20 animate-pulse"></div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 z-10 relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-empatica-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    E
                  </div>
                  <div>
                    <h3 className="font-bold">Empatica AI</h3>
                    <p className="text-sm text-gray-500">Tu asistente empático</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 max-w-[80%]">
                    <p className="text-sm">Hola, ¿cómo puedo ayudarte hoy?</p>
                  </div>
                  
                  <div className="bg-empatica-primary text-white rounded-xl rounded-tr-none p-3 max-w-[80%] ml-auto">
                    <p className="text-sm">Necesito responder a varios mensajes de Instagram</p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 max-w-[80%]">
                    <p className="text-sm">Puedo ayudarte con eso. Tenemos 5 mensajes nuevos en Instagram que requieren respuesta. ¿Quieres que responda automáticamente con un tono empático?</p>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-around">
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
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Características principales</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-empatica-primary/10 rounded-lg flex items-center justify-center text-empatica-primary mb-4">
                <FiMessageCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestión unificada</h3>
              <p className="text-gray-600">
                Todas tus conversaciones de Instagram, Facebook y WhatsApp en un solo lugar, organizadas y fáciles de gestionar.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-empatica-secondary/10 rounded-lg flex items-center justify-center text-empatica-secondary mb-4">
                <FiBarChart2 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análisis de sentimientos</h3>
              <p className="text-gray-600">
                Detecta automáticamente el tono emocional de cada mensaje para priorizar y responder adecuadamente.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-empatica-accent/10 rounded-lg flex items-center justify-center text-empatica-accent mb-4">
                <FiSettings size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalización de tonos</h3>
              <p className="text-gray-600">
                Configura el tono y estilo de las respuestas para cada plataforma, adaptándose a tu marca y audiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-empatica-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para mejorar la comunicación con tus clientes?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Empatica te ayuda a mantener conversaciones auténticas y empáticas, incluso cuando no puedes responder personalmente.
          </p>
          <Button asChild size="lg" className="bg-empatica-primary hover:bg-empatica-primary/90">
            <Link to="/dashboard">Comenzar ahora</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-empatica-primary">
                <span className="text-empatica-accent">E</span>mpatica
              </h2>
              <p className="text-sm text-gray-500">Asistente empático para redes sociales</p>
            </div>
            
            <div className="flex gap-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-empatica-primary">Dashboard</Link>
              <Link to="/conversations" className="text-gray-600 hover:text-empatica-primary">Conversaciones</Link>
              <Link to="/settings" className="text-gray-600 hover:text-empatica-primary">Configuración</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Empatica AI. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
