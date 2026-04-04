import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey= process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseURL, supabaseServiceRoleKey);