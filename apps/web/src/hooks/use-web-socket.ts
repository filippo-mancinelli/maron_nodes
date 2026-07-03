"use client";

import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useNodeStore, Node } from '@/store/node-store';

const WS_URL = 'http://localhost:8080/ws'; // The backend WebSocket endpoint

interface DeploymentStatusUpdate {
  id: string;
  name: string;
  network: string;
  status: string;
}

export const useWebSocket = (userId: string | null) => {
  const addNode = useNodeStore((state) => state.addNode);
  const updateNodeStatus = useNodeStore((state) => state.updateNodeStatus);
  const nodes = useNodeStore((state) => state.nodes);

  useEffect(() => {
    if (!userId) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to WebSocket');

        stompClient.subscribe(`/queue/deployments/${userId}`, (message) => {
          const update = JSON.parse(message.body) as DeploymentStatusUpdate;

          const nodeExists = nodes.some((node) => node.id === update.id);

          if (nodeExists) {
            updateNodeStatus(update.id, update.status);
          } else {
            const newNode: Node = {
              ...update,
              avatar: `/avatars/${update.network.toLowerCase()}.svg`,
            };
            addNode(newNode);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      console.log('Disconnected from WebSocket');
    };
  }, [userId, addNode, updateNodeStatus, nodes]);
};
