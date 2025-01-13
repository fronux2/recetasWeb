// src/components/Logout.tsx

import React from 'react';
import { logout } from '../services/authService';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout();
      // Redirigir al usuario a la página de login u otra página
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default Logout;
