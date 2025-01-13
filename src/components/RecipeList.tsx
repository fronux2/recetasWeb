import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '../services/supabaseService';
import { Recipe } from '../types/models';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err) {
        setError('Error al cargar las recetas.');
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, []);

  const handleViewDetails = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  if (loading) return <p>Cargando recetas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold">Lista de Recetas</h2>
      <ul className="divide-y divide-gray-300 mt-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="py-4 px-3 hover:bg-gray-200 transition flex justify-between items-center">
            <div>
              <h3 className="font-medium text-lg">{recipe.name}</h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
            <button
              onClick={() => handleViewDetails(recipe.id)}
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
            >
              Ver Detalles
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
