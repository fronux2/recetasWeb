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
        .select(`*, categories(name)`)
        .eq('id', id)
        .single();
      console.log(data);
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
      <p>{recipe?.ingredients}</p>
      <h2 className="text-2xl font-semibold mt-6">Instrucciones:</h2>
      <p>{recipe?.instructions}</p>
      <h2 className="text-2xl font-semibold mt-6">Categoría:</h2>
      <p>{recipe?.categories?.name}</p>
      <h2 className="text-2xl font-semibold mt-6">Imagen:</h2>
      <img src={recipe?.image_url} alt="Imagen de la receta" className="w-full" />
      <h2 className="text-2xl font-semibold mt-6">Etiquetas:</h2>
      <ul className="list-disc ml-6 mt-2 text-gray-600">
        
      </ul>
    </div>
  );
};

export default RecipeDetailPage;
