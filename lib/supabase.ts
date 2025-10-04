import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  theme_color: string;
  created_at: string;
  updated_at: string;
};

export type Link = {
  id: string;
  profile_id: string;
  title: string;
  url: string;
  position: number;
  is_active: boolean;
  icon: string;
  created_at: string;
};
