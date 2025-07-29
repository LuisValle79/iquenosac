import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqouqtdgxsksueyskdow.supabase.co'; // <-- Pon aquí tu URL real de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxb3VxdGRneHNrc3VleXNrZG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MjgxNTcsImV4cCI6MjA2OTIwNDE1N30.7s3i-7gJw-MiI0473eR_3gVX5TrskpJ1ivZKglfeMk0'; // <-- Pon aquí tu clave anon real

export const supabase = createClient(supabaseUrl, supabaseKey);