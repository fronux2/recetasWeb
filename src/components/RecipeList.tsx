import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/supabaseService';
import MediaCard from './MediaCard';
import { Recipe } from '../types/models';
import { Grid, TextField } from '@mui/material';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]); // Estado para las recetas filtradas
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data); // Inicialmente, todas las recetas se muestran
      } catch (err) {
        setError('Error al cargar las recetas.');
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, []);

  // Filtrar recetas cuando cambia el texto de búsqueda
  useEffect(() => {
    if (!searchQuery) {
      setFilteredRecipes(recipes); // Si no hay texto de búsqueda, mostrar todas las recetas
    } else {
      setFilteredRecipes(
        recipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, recipes]);

  if (loading) return <p>Cargando recetas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Lista de Recetas</h2>
      <TextField
        label="Buscar receta..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
      />
      
      <Grid container spacing={2}>
        {filteredRecipes.map((recipe: Recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <MediaCard title={recipe.title} description={recipe.description} id={recipe.id} url={recipe.image_url} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecipeList;
