import { createClient } from '@supabase/supabase-js'

// These lines grab the keys you put in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This creates the actual "client" that we will use to talk to your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)