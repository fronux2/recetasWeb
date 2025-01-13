import { supabase } from '../supabase/supabaseCliente';

export const uploadRecipeImage = async (file: File, recipeId: string) => {
  try {
    // Crea un nombre único para la imagen
    const fileName = `${recipeId}-${file.name}`;

    // Sube el archivo al bucket
    const { data, error } = await supabase.storage
      .from('recipe-covers')
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    // Obtén la URL pública del archivo subido
    const { data: publicUrlData } = supabase.storage
      .from('recipe-covers')
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl; // Retorna la URL pública
  } catch (error) {
    console.error('Error subiendo la imagen:', error.message);
    return null;
  }
};
