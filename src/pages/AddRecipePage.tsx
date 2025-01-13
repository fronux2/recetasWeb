import React from 'react';
import AddRecipeForm from '../components/AddRecipe';
import { useNavigate } from 'react-router-dom';
const AddRecipePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>
      <h1>Agregar Receta</h1>
      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;
