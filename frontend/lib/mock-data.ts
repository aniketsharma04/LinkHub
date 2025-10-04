// Mock data for demo deployment
export const mockProfile = {
  id: 'demo-user',
  username: 'demo',
  display_name: 'Demo User',
  bio: 'This is a demo LinkHub profile. Sign up to create your own!',
  avatar_url: '',
  theme_color: '#10b981',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const mockLinks = [
  {
    id: '1',
    profile_id: 'demo-user',
    title: 'My Portfolio Website',
    url: 'https://example.com',
    position: 0,
    is_active: true,
    icon: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    profile_id: 'demo-user',
    title: 'GitHub Profile',
    url: 'https://github.com',
    position: 1,
    is_active: true,
    icon: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    profile_id: 'demo-user',
    title: 'LinkedIn',
    url: 'https://linkedin.com',
    position: 2,
    is_active: true,
    icon: '',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    profile_id: 'demo-user',
    title: 'Twitter/X',
    url: 'https://twitter.com',
    position: 3,
    is_active: true,
    icon: '',
    created_at: new Date().toISOString(),
  },
];