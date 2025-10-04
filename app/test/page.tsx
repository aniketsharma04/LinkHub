'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';

export default function TestPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [username, setUsername] = useState('testuser');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testRegister = async () => {
    setLoading(true);
    try {
      const result = await api.register(email, password, username);
      setResult(JSON.stringify(result, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const result = await api.login(email, password);
      setResult(JSON.stringify(result, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const testGetUser = async () => {
    setLoading(true);
    try {
      const result = await api.getCurrentUser();
      setResult(JSON.stringify(result, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const testHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/health');
      const result = await response.json();
      setResult(JSON.stringify(result, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">LinkHub MongoDB Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={testHealth} 
              disabled={loading}
              className="w-full"
            >
              Test MongoDB Connection
            </Button>
            <Button 
              onClick={testRegister} 
              disabled={loading}
              className="w-full"
            >
              Test Register
            </Button>
            <Button 
              onClick={testLogin} 
              disabled={loading}
              className="w-full"
            >
              Test Login
            </Button>
            <Button 
              onClick={testGetUser} 
              disabled={loading}
              className="w-full"
            >
              Test Get Current User
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
            {result || 'No results yet...'}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}