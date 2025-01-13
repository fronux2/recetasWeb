import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseCliente'; // Asegúrate de importar tu cliente de Supabase
import { useNavigate } from 'react-router-dom';
import { uploadRecipeImage } from '../utils/uploadImage';
const AddRecipeForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  //const [imageUrl, setImageUrl] = useState('');
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]); // Estado para las categorías
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  // Obtener el usuario autenticado y las categorías
  useEffect(() => {
    const fetchUserAndCategories = async () => {
      // Obtener el usuario
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      // Obtener las categorías desde la base de datos
      const { data, error } = await supabase.from('categories').select('id, name');
      console.log(data)
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

    // Desuscribir correctamente
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

    // Sube la imagen y obtén la URL pública
    const imageUrl = await uploadRecipeImage(imageFile, title);

    if (!imageUrl) {
      console.error('Error al subir la imagen');
      return;
    }

    const { error } = await supabase.from('recipes').insert([{
      title,
      description,
      ingredients,
      instructions,
      category,
      image_url: imageUrl,
      user_id: user.id, // El ID del usuario para asociar la receta con el usuario
    }]);
    navigate('/recipe');
    if (error) {
      console.error('Error al agregar receta:', error.message);
    } else {
      console.log('Receta agregada con éxito');
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
          {/* Cargar las categorías dinámicamente desde la base de datos */}
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Imagen URL:</label>        
        <label>Imagen de portada:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
          required
        />
      </div>
      <button type="submit">Agregar Receta</button>
    </form>
  );
};

export default AddRecipeForm;
