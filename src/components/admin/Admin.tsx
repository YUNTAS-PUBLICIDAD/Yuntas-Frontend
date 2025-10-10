// Ubicación: src/pages/admin/Admin.tsx

import React, { useState, useEffect } from 'react';
// 1. Importa tu nuevo componente BlogList
import BlogList from '../dashboard/BlogList'; // ¡Ojo! Verifica que esta ruta sea correcta según tu estructura.

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      window.location.replace("/login");
      return;
    }
    
    setIsAuthenticated(true);
  }, []);

  // Mientras verifica la autenticación
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p>Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // 2. Una vez autenticado, renderiza el componente BlogList.
  // Puedes envolverlo en un layout si lo necesitas.
  return (
    <main className="w-full">
      <BlogList />
    </main>
  );
};

export default Admin;