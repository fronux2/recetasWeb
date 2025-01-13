import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddRecipePage from './pages/AddRecipePage';
import LoginPage from './pages/LoginPage';
import RecipePage from './pages/RecipePage';
import Layout from './layouts/Layout';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-recipe" element={<AddRecipePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/recipe" element={<RecipePage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            </Routes>
          </Layout>
        </Router>
      </CssBaseline>
    </ThemeProvider>
    
  );
};

export default App;
