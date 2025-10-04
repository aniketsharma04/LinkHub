'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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

  const loadLinks = useCallback(async () => {
    try {
      const { links } = await api.getLinks();
      setLinks(links);
    } catch (error) {
      console.error('Failed to load links:', error);
    }
  }, []);

  const checkUser = useCallback(async () => {
    try {
      const { user } = await api.getCurrentUser();
      if (user) {
        setProfile(user);
        await loadLinks();
      }
    } catch (error) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router, loadLinks]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  // Cleanup debounced timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debouncedUpdateRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  const handleLogout = async () => {
    try {
      await api.logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/');
    }
  };

  const addLink = async () => {
    if (!profile) return;

    try {
      const { link } = await api.createLink({
        title: 'New Link',
        url: 'https://example.com',
        position: links.length,
        is_active: true,
        icon: '',
      });

      setLinks([...links, link]);
      setMessage('Link added successfully! Update the title and URL.');
      setTimeout(() => setMessage(''), 5000);
    } catch (error: any) {
      console.error('Failed to add link:', error);
      const errorMessage = error?.message || 'Failed to add link. Please try again.';
      setMessage(errorMessage);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const updateLink = async (id: string, updates: Partial<LinkType>) => {
    // Optimistic update for better UX
    const previousLinks = [...links];
    setLinks(links.map(link => link.id === id ? { ...link, ...updates } : link));
    
    try {
      await api.updateLink(id, updates);
    } catch (error) {
      console.error('Failed to update link:', error);
      // Revert on error
      setLinks(previousLinks);
      setMessage('Failed to update link. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Debounced version for text inputs
  const debouncedUpdateRef = useRef<{[key: string]: NodeJS.Timeout}>({});
  
  const debouncedUpdateLink = useCallback((id: string, field: string, value: string) => {
    // Clear existing timeout for this field
    if (debouncedUpdateRef.current[`${id}-${field}`]) {
      clearTimeout(debouncedUpdateRef.current[`${id}-${field}`]);
    }
    
    // Immediate optimistic update
    setLinks(links => links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
    
    // Debounced API call
    debouncedUpdateRef.current[`${id}-${field}`] = setTimeout(async () => {
      try {
        await api.updateLink(id, { [field]: value });
      } catch (error) {
        console.error('Failed to update link:', error);
        setMessage('Failed to save changes. Please try again.');
        setTimeout(() => setMessage(''), 3000);
      }
    }, 500);
  }, []);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent mx-auto"></div>
          <div className="text-lg font-medium text-gray-700">Loading your dashboard...</div>
          <div className="text-sm text-gray-500">Please wait while we fetch your profile and links</div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link2 className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                LinkHub
              </span>
              <div className="hidden md:flex items-center ml-6 px-3 py-1 bg-emerald-50 rounded-full">
                <span className="text-sm text-emerald-700 font-medium">Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/${profile.username}`, '_blank')}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {message && (
          <Alert className="mb-8 bg-emerald-50 text-emerald-900 border-emerald-200 shadow-sm">
            <AlertDescription className="font-medium">{message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Settings className="h-5 w-5 mr-3 text-emerald-600" />
                Profile Settings
              </CardTitle>
              <CardDescription className="text-gray-600">
                Customize how your profile appears to visitors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Your LinkHub URL</Label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Input 
                      value={`linkhub.com/${profile.username}`} 
                      disabled 
                      className="bg-gray-50 border-gray-200 text-gray-600 pr-10"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(`/${profile.username}`, '_blank')}
                    className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                    title="Preview your profile"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="display_name" className="text-sm font-medium text-gray-700">Display Name</Label>
                <Input
                  id="display_name"
                  value={profile.display_name}
                  onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                  placeholder="Your Name"
                  className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell people about yourself..."
                  rows={3}
                  className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                />
                <p className="text-xs text-gray-500">{profile.bio.length}/500 characters</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="theme_color" className="text-sm font-medium text-gray-700">Theme Color</Label>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Input
                      id="theme_color"
                      type="color"
                      value={profile.theme_color}
                      onChange={(e) => setProfile({ ...profile, theme_color: e.target.value })}
                      className="w-20 h-10 border-gray-200 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-mono text-gray-600 bg-gray-50 px-3 py-2 rounded border">{profile.theme_color}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={saveProfile}
                  disabled={saving}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Profile'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <Link2 className="h-5 w-5 mr-3 text-emerald-600" />
                    Your Links
                  </CardTitle>
                  <CardDescription className="text-gray-600">Add and manage your links</CardDescription>
                </div>
                <Button 
                  onClick={addLink} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {links.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <Link2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 font-medium mb-2">No links yet</p>
                  <p className="text-sm text-gray-500 mb-6">Click &ldquo;Add Link&rdquo; to create your first link!</p>
                  <Button 
                    onClick={addLink} 
                    variant="outline" 
                    className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Link
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {links.map((link, index) => (
                    <div key={link.id} className="group relative p-5 border-2 border-gray-100 rounded-xl bg-white hover:border-emerald-200 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-col items-center space-y-2">
                          <div title="Drag to reorder">
                            <GripVertical className="h-5 w-5 text-gray-400 cursor-move group-hover:text-gray-600 transition-colors" />
                          </div>
                          <span className="text-xs text-gray-400 font-medium">{index + 1}</span>
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Title</Label>
                              <Input
                                value={link.title || ''}
                                onChange={(e) => debouncedUpdateLink(link.id, 'title', e.target.value)}
                                placeholder="Link Title"
                                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                autoComplete="off"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">URL</Label>
                              <Input
                                value={link.url || ''}
                                onChange={(e) => debouncedUpdateLink(link.id, 'url', e.target.value)}
                                placeholder="https://example.com"
                                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                                autoComplete="off"
                                type="url"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={link.is_active}
                                  onCheckedChange={(checked) => updateLink(link.id, { is_active: checked })}
                                  className="data-[state=checked]:bg-emerald-600"
                                />
                                <Label className="text-sm font-medium">
                                  <span className={link.is_active ? 'text-emerald-700' : 'text-gray-500'}>
                                    {link.is_active ? 'Active' : 'Inactive'}
                                  </span>
                                </Label>
                              </div>
                              {link.url && link.url !== 'https://example.com' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(link.url, '_blank')}
                                  className="text-gray-500 hover:text-emerald-600 px-2"
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Preview
                                </Button>
                              )}
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteLink(link.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
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