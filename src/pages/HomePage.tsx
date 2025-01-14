import React from 'react';
import Hero from '../components/Hero';
import MiniCarousel from '../components/MiniCarousel';
import MiniCarousel2 from '../components/MiniCarousel2';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const HomePage: React.FC = () => {
  const navigate = useNavigate();
//'url(/src/imgs/ingre.webp)'
  return (
    <div>
      <Hero />
      <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
        <Typography variant="h4">
          Recetas del día.
        </Typography>        
      </Container>
      <MiniCarousel/>
      <Container>
        <Typography  sx={{ marginTop: '50px', marginBottom: '50px' }} variant="h4">
          Almuerzo
        </Typography>        
      </Container>
      <MiniCarousel2/>
      <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
        <Typography variant="h4">
          Postres
        </Typography>        
      </Container>
      <MiniCarousel2/>
      <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
        <Typography variant="h4">
          Bebidas
        </Typography>        
      </Container>    
      <MiniCarousel2/>
    
      <Box sx={{ textAlign: 'center', margin: '40px 0' }}>
      <Button
        variant="contained"
        size="large"
        sx={{                   
          padding: '12px 24px',
          fontSize: '18px'
        }}
        onClick={() => {
          navigate('/recipe');
        }}
      >
        Mirar Más Recetas
      </Button>
    </Box>
      
      
    </div>
  );
};

export default HomePage;
