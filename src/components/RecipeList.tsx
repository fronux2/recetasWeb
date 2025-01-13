// src/components/RecipeList.tsx
import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/supabaseService';
import { Recipe } from '../types/models';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
      console.log(data)
    };
    getRecipes();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold">Lista de Recetas</h2>
      <ul className="mt-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="mb-2 p-2 border-b">
            {recipe.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
