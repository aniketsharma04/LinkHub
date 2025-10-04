'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, Plus, GripVertical, Trash2, Eye, LogOut, Settings, ExternalLink } from 'lucide-react';
import { Profile, Link as LinkType, User } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { user } = await api.getCurrentUser();
      if (user) {
        setProfile(user);
        await loadLinks();
      }
    } catch (error) {
      // User not authenticated, redirect to login
      router.push('/login');
      return;
    }
    setLoading(false);
  };

  const loadLinks = async () => {
    try {
      const { links } = await api.getLinks();
      setLinks(links);
    } catch (error) {
      console.error('Failed to load links:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect anyway
      router.push('/');
    }
  };

  const addLink = async () => {
    if (!profile) return;

    try {
      console.log('Attempting to add link...');
      const { link } = await api.createLink({
        title: 'New Link',
        url: 'https://',
        position: links.length,
        is_active: true,
        icon: '',
      });

      console.log('Link created successfully:', link);
      setLinks([...links, link]);
      setMessage('Link added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to add link:', error);
      setMessage('Failed to add link. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const updateLink = async (id: string, updates: Partial<LinkType>) => {
    try {
      await api.updateLink(id, updates);
      setLinks(links.map(link => link.id === id ? { ...link, ...updates } : link));
    } catch (error) {
      console.error('Failed to update link:', error);
    }
  };

  const deleteLink = async (id: string) => {
    try {
      await api.deleteLink(id);
      setLinks(links.filter(link => link.id !== id));
    } catch (error) {
      console.error('Failed to delete link:', error);
    }
  };

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);

    try {
      await api.updateProfile({
        display_name: profile.display_name,
        bio: profile.bio,
        theme_color: profile.theme_color,
      });
      
      setMessage('Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setMessage('Failed to save profile');
      setTimeout(() => setMessage(''), 3000);
    }
    
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link2 className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                LinkHub
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => window.open(`/${profile.username}`, '_blank')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {message && (
          <Alert className="mb-6 bg-emerald-50 text-emerald-900 border-emerald-200">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Customize how your profile appears to visitors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Your LinkHub URL</Label>
                <div className="flex items-center space-x-2">
                  <Input value={`linkhub.com/${profile.username}`} disabled />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(`/${profile.username}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  value={profile.display_name}
                  onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell people about yourself..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme_color">Theme Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="theme_color"
                    type="color"
                    value={profile.theme_color}
                    onChange={(e) => setProfile({ ...profile, theme_color: e.target.value })}
                    className="w-20 h-10"
                  />
                  <span className="text-sm text-gray-600">{profile.theme_color}</span>
                </div>
              </div>

              <Button
                onClick={saveProfile}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Links</CardTitle>
                  <CardDescription>Add and manage your links</CardDescription>
                </div>
                <Button onClick={addLink} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {links.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Link2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No links yet. Click "Add Link" to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {links.map((link) => (
                    <div key={link.id} className="flex items-start space-x-2 p-4 border rounded-lg bg-white">
                      <GripVertical className="h-5 w-5 text-gray-400 mt-2 cursor-move" />
                      <div className="flex-1 space-y-3">
                        <div className="space-y-2">
                          <Input
                            value={link.title}
                            onChange={(e) => updateLink(link.id, { title: e.target.value })}
                            placeholder="Link Title"
                          />
                          <Input
                            value={link.url}
                            onChange={(e) => updateLink(link.id, { url: e.target.value })}
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={link.is_active}
                              onCheckedChange={(checked) => updateLink(link.id, { is_active: checked })}
                            />
                            <Label className="text-sm">{link.is_active ? 'Active' : 'Inactive'}</Label>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteLink(link.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
