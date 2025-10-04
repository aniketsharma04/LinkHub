// API client for MongoDB backend
import { Profile, Link, User } from './supabase';

class APIClient {
  private baseURL = '/api';

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        credentials: 'include', // This is crucial for sending cookies
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        // Extract more specific error messages
        const errorMessage = data.error || data.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      // Re-throw with more context if needed
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // Auth methods
  async register(email: string, password: string, username: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<{ user: User }> {
    return this.request('/auth/me');
  }

  // Profile methods
  async getProfile(): Promise<{ profile: Profile }> {
    return this.request('/profile');
  }

  async updateProfile(updates: Partial<Profile>) {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async getPublicProfile(username: string): Promise<{ profile: Profile; links: Link[] }> {
    return this.request(`/public/${username}`);
  }

  // Links methods
  async getLinks(): Promise<{ links: Link[] }> {
    return this.request('/links');
  }

  async createLink(link: Omit<Link, 'id' | 'profile_id' | 'created_at'>): Promise<{ link: Link }> {
    return this.request('/links', {
      method: 'POST',
      body: JSON.stringify(link),
    });
  }

  async updateLink(id: string, updates: Partial<Link>) {
    return this.request(`/links/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteLink(id: string) {
    return this.request(`/links/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new APIClient();
export default api;