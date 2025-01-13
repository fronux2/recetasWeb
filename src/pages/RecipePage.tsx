import React from 'react';
import RecipeList from '../components/RecipeList';
import { useNavigate } from 'react-router-dom';
const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Receta</h1>
      <RecipeList />
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
};

export default RecipePage;