export interface Node {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'running' | 'stopped' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface DeploymentStatus {
  id: string;
  nodeId: string;
  status: 'deploying' | 'deployed' | 'failed';
  message?: string;
  timestamp: Date;
}
