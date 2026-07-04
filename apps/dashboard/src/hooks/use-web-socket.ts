"use client";

import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useNodeStore, Node } from '@/store/node-store';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:8080/ws'; // The backend WebSocket endpoint

// In demo mode there is no backend to connect to. Skip the connection
// entirely so we never spam the console with reconnect errors.
const isDemoMode = () => process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';

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
    if (!userId || isDemoMode()) return;

    let stompClient: Client | null = null;

    try {
      stompClient = new Client({
        webSocketFactory: () => new SockJS(WS_URL),
        reconnectDelay: 5000,
        // Keep STOMP's own debug/error logging quiet — we handle failures below.
        onConnect: () => {
          try {
            stompClient?.subscribe(`/queue/deployments/${userId}`, (message) => {
              try {
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
              } catch {
                // Malformed message — ignore, keep the socket alive.
              }
            });
          } catch {
            // Subscription failed — nothing to degrade further, just skip.
          }
        },
        onStompError: () => {
          // Broker rejected the connection; stop retrying to avoid console spam.
          stompClient?.deactivate().catch(() => {});
        },
        onWebSocketError: () => {
          // No WS endpoint reachable — deactivate quietly instead of looping reconnects.
          stompClient?.deactivate().catch(() => {});
        },
      });

      stompClient.activate();
    } catch {
      // Client construction/activation failed (e.g. no WS support) — no-op.
      stompClient = null;
    }

    return () => {
      stompClient?.deactivate().catch(() => {});
    };
  }, [userId, addNode, updateNodeStatus, nodes]);
};
