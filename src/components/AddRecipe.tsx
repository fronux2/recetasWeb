import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  TextareaAutosize,
} from '@mui/material';
import { supabase } from '../supabase/supabaseCliente';
import { useNavigate } from 'react-router-dom';
import { uploadRecipeImage } from '../utils/uploadImage';

const AddRecipeForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndCategories = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) {
        console.error('Error al obtener categorías:', error.message);
      } else {
        setCategories(data);
      }
    };

    fetchUserAndCategories();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Debes loguearte para agregar recetas');
      return;
    }

    if (!imageFile) {
      console.error('Por favor selecciona una imagen');
      return;
    }

    setLoading(true);
    const sanitizedTitle = title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    try {
      const imageUrl = await uploadRecipeImage(imageFile, sanitizedTitle);

      if (!imageUrl) {
        throw new Error('Error al subir la imagen');
      }
      const { error } = await supabase.from('recipes').insert([
        {
          title,
          description,
          ingredients,
          instructions,
          category_id: category,
          image_url: imageUrl,
          user_id: user.id,
        },
      ]);

      if (error) {
        throw new Error(`Error al agregar receta: ${error.message}`);
      }
      navigate('/recipe');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Agregar Receta
        </Typography>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
          minRows={3}
        />
        <TextField
          label="Ingredientes"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
          minRows={3}
        />
        <TextField
          label="Instrucciones"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
          minRows={3}
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel>Categoría</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>Selecciona una categoría</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2, color:'text.primary'  }}
        >
          Seleccionar Imagen
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
          />
        </Button>
        {imageFile && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Archivo seleccionado: {imageFile.name}
          </Typography>
        )}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Agregar Receta'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddRecipeForm;
