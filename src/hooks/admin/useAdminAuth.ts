
// hooks/admin/useAdminAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  permissions: string[];
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null
  });
  
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Simulate API call - replace with actual authentication check
      const token = localStorage.getItem('admin_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Mock user data - replace with actual API call
      const user: User = {
        id: '1',
        email: 'admin@charity.org',
        name: 'Admin User',
        role: 'admin',
        avatar: '/images/admin-avatar.jpg',
        permissions: [
          'read:events',
          'write:events',
          'delete:events',
          'read:causes',
          'write:causes',
          'read:users',
          'write:users',
          'read:donations',
          'write:donations',
          'read:settings',
          'write:settings'
        ]
      };

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      });
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Simulate login API call
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      // Store token
      localStorage.setItem('admin_token', data.token);
      
      // Update auth state
      setAuthState({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null
      });

      // Redirect to admin dashboard
      router.push('/admin');
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, error: errorMessage };
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      // Clear token
      localStorage.removeItem('admin_token');
      
      // Reset auth state
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null
      });

      // Redirect to login
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [router]);

  const hasPermission = useCallback((permission: string) => {
    return authState.user?.permissions.includes(permission) || false;
  }, [authState.user]);

  const hasRole = useCallback((role: string) => {
    return authState.user?.role === role;
  }, [authState.user]);

  return {
    ...authState,
    login,
    logout,
    hasPermission,
    hasRole,
    checkAuthStatus
  };
}