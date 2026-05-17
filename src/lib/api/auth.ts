/**
 * AUTHENTICATION SERVICE
 * Handles auth operations and token management
 */

import { apiClient } from './client';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  async login(payload: LoginPayload): Promise<AuthResponse | null> {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    if (response.success && response.data) {
      this.setTokens(response.data.token, response.data.refreshToken);
      return response.data;
    }
    return null;
  }

  async signup(payload: SignupPayload): Promise<AuthResponse | null> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', payload);
    if (response.success && response.data) {
      this.setTokens(response.data.token, response.data.refreshToken);
      return response.data;
    }
    return null;
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout', {});
    this.clearTokens();
  }

  async getCurrentUser(): Promise<User | null> {
    const response = await apiClient.get<User>('/auth/me');
    return response.success && response.data ? response.data : null;
  }

  async refreshTokens(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    const response = await apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });

    if (response.success && response.data) {
      this.setTokens(response.data.token, response.data.refreshToken);
      return true;
    }

    this.clearTokens();
    return false;
  }

  setTokens(token: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.refreshTokenKey);
    }
    return null;
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.refreshTokenKey);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
