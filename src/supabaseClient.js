import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Exportamos un cliente dummy si no hay claves para evitar que la app crashee al cargar el componente
const createMockClient = () => {
    const mockResponse = { data: [], error: null, count: 0 };
    const mockBuilder = {};
    Object.assign(mockBuilder, {
        select: () => mockBuilder,
        insert: () => Promise.resolve(mockResponse),
        upsert: () => Promise.resolve(mockResponse),
        update: () => Promise.resolve(mockResponse),
        delete: () => Promise.resolve(mockResponse),
        eq: () => mockBuilder,
        gte: () => mockBuilder,
        lte: () => mockBuilder,
        order: () => Promise.resolve(mockResponse),
        then: (resolve) => Promise.resolve(mockResponse).then(resolve)
    });
    return { from: () => mockBuilder };
};

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createMockClient();
