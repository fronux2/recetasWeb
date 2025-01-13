import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseCliente';
import { Recipe } from '../types/models';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('No se pudo cargar la receta.');
        console.error(error);
      } else {
        setRecipe(data);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Cargando detalles de la receta...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <p className="text-gray-700 mt-4">{recipe?.description}</p>
      <h2 className="text-2xl font-semibold mt-6">Ingredientes:</h2>
      <ul className="list-disc ml-6 mt-2 text-gray-600">
        
      </ul>
    </div>
  );
};

export default RecipeDetailPage;
