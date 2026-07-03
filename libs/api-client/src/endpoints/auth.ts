import { apiClient } from '../client';
import type { User, ApiResponse } from '@maron/shared-types';

export const authApi = {
  login: (username: string, password: string) =>
    apiClient.post<ApiResponse<{ user: User; token: string }>>('/api/auth/login', {
      username,
      password,
    }),

  register: (username: string, email: string, password: string) =>
    apiClient.post<ApiResponse<User>>('/api/auth/register', {
      username,
      email,
      password,
    }),

  logout: () => apiClient.post<ApiResponse<void>>('/api/auth/logout'),

  getCurrentUser: () => apiClient.get<ApiResponse<User>>('/api/auth/me'),
};
