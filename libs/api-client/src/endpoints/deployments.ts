import { apiClient } from '../client';
import type { DeploymentStatus, ApiResponse } from '@maron/shared-types';

export const deploymentsApi = {
  getStatus: (nodeId: string) =>
    apiClient.get<ApiResponse<DeploymentStatus>>(
      `/api/deployments/${nodeId}/status`
    ),

  deploy: (nodeId: string) =>
    apiClient.post<ApiResponse<DeploymentStatus>>(`/api/deployments/${nodeId}/deploy`),

  getAllStatuses: () =>
    apiClient.get<ApiResponse<DeploymentStatus[]>>('/api/deployments/statuses'),
};
