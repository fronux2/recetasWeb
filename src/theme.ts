import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f5f5dc', // Color crema (hexadecimal para Beige claro)
    },
    secondary: {
      main: '#ffcc80', // Alternativa de tono cálido (naranja claro)
    },
    background: {
      default: '#fffaf0', // Fondo crema claro
      paper: '#fff5e1', // Tarjetas o fondos secundarios
    },
  },
});

export default theme;
