import React from 'react';
import RecipeList from '../components/RecipeList';
import { useNavigate } from 'react-router-dom';
const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <RecipeList />
    </div>
  );
};

export default RecipePage;