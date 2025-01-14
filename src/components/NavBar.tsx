import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseCliente';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
const NavBar: React.FC = () => {
  const navigate = useNavigate();
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

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Título o Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Recipe App
        </Typography>

        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/add-recipe" color="inherit">
            Agregar Receta.
          </Button>
          <Button component={Link} to="/recipe" color="inherit">
            Recetas
          </Button>
          {user ? (
              <div>                
                <Logout />
              </div>
            ) : (
              <div>
                <Button variant="contained" onClick={() => navigate('/register')}>Registrarse</Button>
                <Button variant="contained" onClick={() => navigate('/login')}>Iniciar sesión</Button>
              </div>
            )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
