import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Exportamos un cliente dummy si no hay claves para evitar que la app crashee al cargar el componente
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: () => ({ order: () => ({ data: [] }) }),
            upsert: () => ({ error: null }),
            insert: () => ({ error: null })
        })
    };
