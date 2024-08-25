import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://vyhyujbzlazepajvqtof.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5aHl1amJ6bGF6ZXBhanZxdG9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzkxNjUwMCwiZXhwIjoyMDM5NDkyNTAwfQ.K-Z5DS2VcWbhowSmJMn-zkDhN309Xl8_0i5fAImkIV0"
);

export default supabase;
