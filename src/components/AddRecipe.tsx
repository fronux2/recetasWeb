import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState<boolean>(false); // Estado para el loading
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

    setLoading(true); // Inicia el loading
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
      setLoading(false); // Finaliza el loading
      navigate('/recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ingredientes:</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Instrucciones:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Categoría:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Imagen de portada:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Agregando receta...' : 'Agregar Receta'}
      </button>
    </form>
  );
};

export default AddRecipeForm;
