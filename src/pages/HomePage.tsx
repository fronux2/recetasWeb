import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseCliente'
import Logout from '../components/Logout';
const HomePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
      const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Desuscribir correctamente
    return () => {
      authListener.subscription.unsubscribe(); // Aquí es donde corregimos
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenido a la página principal</h1>
      {user ? (
        <div>
          <h2>Bienvenido {user.email}</h2>
          <button onClick={() => navigate('/add-recipe')}>Agregar Receta</button>
          <button onClick={() => navigate('/recipe')}>Ver Recetas</button>
          <Logout />
        </div>
      ) : (
        <div>
          <h2>Bienvenido a la aplicación</h2>
          <button onClick={() => navigate('/register')}>Registrarse</button>
          <button onClick={() => navigate('/login')}>Iniciar sesión</button>
        </div>
      )}
      
    </div>
  );
};

export default HomePage;
