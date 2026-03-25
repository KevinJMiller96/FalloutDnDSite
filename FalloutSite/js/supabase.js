
const SUPABASE_URL = "https://uhuhsfmkgktnchazuoey.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVodWhzZm1rZ2t0bmNoYXp1b2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0Nzg4NTMsImV4cCI6MjA4ODA1NDg1M30.l6J6fod4UAYVvJ5-lVRJJDyrPBc82OjstxQKEhSU-3I"


// create global client
window.supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);