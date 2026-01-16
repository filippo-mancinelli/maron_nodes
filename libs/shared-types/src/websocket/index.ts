export interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: Date;
}

export interface DeploymentStatusMessage extends WebSocketMessage {
  type: 'deployment_status';
  payload: {
    nodeId: string;
    status: 'deploying' | 'deployed' | 'failed';
    message?: string;
  };
}
