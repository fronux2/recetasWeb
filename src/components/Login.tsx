import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from '@mui/material';
import { login } from '../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        navigate('/');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Error al iniciar sesión.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Iniciar sesión
        </Typography>
        <Stack spacing={3}>
          <TextField
            id="emailLogin"
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            id="passwordLogin"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar sesión
          </Button>
        </Stack>
        {errorMessage && (
          <Box mt={2}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Login;
