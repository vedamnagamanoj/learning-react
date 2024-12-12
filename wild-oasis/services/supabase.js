import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://eengcpzbigweoqfqlaep.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbmdjcHpiaWd3ZW9xZnFsYWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5ODE0MTYsImV4cCI6MjA0OTU1NzQxNn0.3KCs5USXPooVZCZapF8wTj53NWGwUUZwJYdc0ZXkaFs`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
