import { useState, useCallback, useEffect } from 'react';
import { authService, User } from '@lib/api/auth';

/**
 * USE AUTH HOOK
 * Manages authentication state and operations
 */

interface UseAuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<UseAuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = await authService.getCurrentUser();
          if (user) {
            setState({
              user,
              isLoading: false,
              isAuthenticated: true,
              error: null,
            });
          } else {
            setState({
              user: null,
              isLoading: false,
              isAuthenticated: false,
              error: 'Failed to fetch user',
            });
          }
        } else {
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      } catch (err) {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: err instanceof Error ? err.message : 'Auth error',
        });
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await authService.login({ email, password });
        if (response?.user) {
          setState({
            user: response.user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
          return true;
        }
        throw new Error('Login failed');
      } catch (err) {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: err instanceof Error ? err.message : 'Login error',
        });
        return false;
      }
    },
    []
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await authService.signup({ name, email, password });
        if (response?.user) {
          setState({
            user: response.user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
          return true;
        }
        throw new Error('Signup failed');
      } catch (err) {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: err instanceof Error ? err.message : 'Signup error',
        });
        return false;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (err) {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: err instanceof Error ? err.message : 'Logout error',
      });
    }
  }, []);

  return {
    ...state,
    login,
    signup,
    logout,
  };
};
