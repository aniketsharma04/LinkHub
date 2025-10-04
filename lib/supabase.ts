// MongoDB types for LinkHub
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

export type User = {
  id: string;
  email: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  theme_color: string;
};
