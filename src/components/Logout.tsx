// src/components/Logout.tsx

import React from 'react';
import { logout } from '../services/authService';
import Button from '@mui/material/Button';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout();
      // Redirigir al usuario a la página de login u otra página
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return <Button variant="contained" onClick={handleLogout}>Cerrar sesión</Button>;
};

export default Logout;
