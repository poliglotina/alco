import { createClient } from '@supabase/supabase-js';

// Читаем переменные из .env
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY;

// Создаём клиент
export const supabase = createClient(supabaseUrl, supabaseKey);
