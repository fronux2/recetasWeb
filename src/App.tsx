import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddRecipePage from './pages/AddRecipePage';
import LoginPage from './pages/LoginPage';
import RecipePage from './pages/RecipePage';
import Layout from './layouts/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recipe" element={<RecipePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
