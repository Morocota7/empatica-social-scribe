
const PermissionsInfo = () => {
  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
      <h3 className="text-sm font-medium mb-2">Sobre los permisos:</h3>
      <p className="text-sm text-gray-600">
        Humanizer solicita permisos para leer y enviar mensajes en tu nombre.
        Nunca publicará contenido sin tu autorización explícita. Puedes revocar estos
        permisos en cualquier momento.
      </p>
    </div>
  );
};

export default PermissionsInfo;
