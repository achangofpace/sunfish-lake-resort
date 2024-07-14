import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ctclrfjhrxsebgoysfiu.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0Y2xyZmpocnhzZWJnb3lzZml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1ODc4NjcsImV4cCI6MjAzNjE2Mzg2N30.9PQ7Ljb9d3wdN4MfJkoHFzlFKIyztc9AVS9AVf_5yn8";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
