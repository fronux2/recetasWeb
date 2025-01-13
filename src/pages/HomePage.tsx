import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
const HomePage: React.FC = () => {
//'url(/src/imgs/ingre.webp)'
  return (
    <div>
      <Box
  sx={{
    backgroundImage: 'url(/src/imgs/ingre.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: '200px 0',
    position: 'relative',
  }}
>
  {/* Fondo oscuro translúcido */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro con opacidad
    }}
  />
  <Container sx={{ position: 'relative', zIndex: 1 }}>
      <Typography variant="h3" gutterBottom>
        ¡Bienvenido a Mi Recetario!
      </Typography>
      <Typography variant="h6" paragraph>
        Explora nuestras deliciosas recetas y empieza a cocinar platos increíbles.
      </Typography>
      <Button component={Link} to="/recipes" variant="contained" color="secondary">
        Ver Recetas
      </Button>
    </Container>
  </Box>

      
    </div>
  );
};

export default HomePage;
