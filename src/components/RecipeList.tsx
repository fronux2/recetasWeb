import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/supabaseService';
import MediaCard from './MediaCard';
import {type Recipe} from '../types/models';
import { Grid } from '@mui/material';
const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Cargando recetas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold">Lista de Recetas</h2>
      
        {recipes.map((recipe: Recipe) => (
          <Grid container spacing={2} p={5} key={recipe.id}>
            <Grid item xs={12} sm={6} md={4}>
              <MediaCard title={recipe.title} description={recipe.description} id={recipe.id} url={recipe.image_url} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MediaCard title={recipe.title} description={recipe.description} id={recipe.id} url={recipe.image_url} />
            </Grid>
          </Grid>
          
          
        ))}
    </div>
  );
};

export default RecipeList;
