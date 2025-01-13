import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Aseguramos que las variables de entorno sean de tipo string
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Exportamos el cliente tipado de Supabase
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
