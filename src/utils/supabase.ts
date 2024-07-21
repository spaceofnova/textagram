import { createClient } from "@supabase/supabase-js";

const client = createClient(
  "https://ikidhlolasuqhtzohpby.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlraWRobG9sYXN1cWh0em9ocGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0OTI4MjYsImV4cCI6MjAzNzA2ODgyNn0.NhzXUJ1TVoODi6ozVVsgE70AnFnwGsOlxD5s5JDhYt8"
);

const supabase = () => client;

export default supabase;
