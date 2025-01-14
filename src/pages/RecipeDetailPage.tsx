import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseCliente';
import { Button, Box, Typography } from '@mui/material';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams();  // Aquí accedes al id desde la URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select(`*, categories(name)`)
        .eq('id', id)
        .single();
      if (error) {
        setError('No se pudo cargar la receta.');
      } else {
        setRecipe(data);
      }
      setLoading(false);
    };

    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchRecipe();
    fetchUser();
  }, [id]);

  const handleFavorite = async () => {
    if (!user) {
      alert('Necesitas estar logueado para guardar en favoritos');
      return;
    }

    // Agregar o eliminar de favoritos
    const { data, error } = await supabase
      .from('favorites')
      .upsert([{ user_id: user.id, recipe_id: recipe?.id }]);

    if (error) {
      console.error('Error al guardar en favoritos:', error.message);
    } else {
      setIsFavorite(true);
    }
  };

  if (loading) return <Typography>Cargando detalles de la receta...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 4, borderRadius: 2, maxWidth: 'lg', margin: 'auto' }}>
      <Box 
        component="img" 
        src={recipe?.image_url} 
        alt="Imagen de la receta"
        sx={{
          width: '100%',
          maxHeight: 400,
          objectFit: 'contain',
          borderRadius: 2,
          marginBottom: 3,
        }}
      />
      <Typography variant="h4" gutterBottom>
        {recipe?.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {recipe?.description}
      </Typography>
      <Typography variant="h6" paragraph>
        Ingredientes:
      </Typography>
      <Typography variant="body2" paragraph>
        {recipe?.ingredients}
      </Typography>
      <Typography variant="h6" paragraph>
        Instrucciones:
      </Typography>
      <Typography variant="body2" paragraph>
        {recipe?.instructions}
      </Typography>
      <Typography variant="h6" paragraph>
        Categoría:
      </Typography>
      <Typography variant="body2" paragraph>
        {recipe?.categories?.name}
      </Typography>

      {user && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleFavorite}
          disabled={isFavorite}
          sx={{ mt: 3 }}
        >
          {isFavorite ? 'Receta Guardada' : 'Guardar en Favoritos'}
        </Button>
      )}
    </Box>
  );
};

export default RecipeDetailPage;
