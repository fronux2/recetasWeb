// src/types/env.d.ts
declare interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    // Agrega más variables de entorno si es necesario
  }
  
declare interface ImportMeta {
readonly env: ImportMetaEnv;
}
  