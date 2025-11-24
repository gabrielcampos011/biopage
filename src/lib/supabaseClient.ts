import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gnronuosrhtluwtprgln.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imducm9udW9zcmh0bHV3dHByZ2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDEzOTgsImV4cCI6MjA3OTUxNzM5OH0.I47K5htIdBMs9iAnd54LQ6sRWoiC0UmpOAu4V-YTPRM";


if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
