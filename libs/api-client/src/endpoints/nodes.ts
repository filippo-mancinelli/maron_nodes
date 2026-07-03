import { apiClient } from '../client';
import type { Node, ApiResponse } from '@maron/shared-types';

export const nodesApi = {
  getAll: () => apiClient.get<ApiResponse<Node[]>>('/api/nodes'),

  getById: (id: string) => apiClient.get<ApiResponse<Node>>(`/api/nodes/${id}`),

  create: (data: Partial<Node>) =>
    apiClient.post<ApiResponse<Node>>('/api/nodes', data),

  update: (id: string, data: Partial<Node>) =>
    apiClient.put<ApiResponse<Node>>(`/api/nodes/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/api/nodes/${id}`),
};
