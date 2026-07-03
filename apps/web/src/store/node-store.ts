import { create } from 'zustand';
import { fetchUserDeployments } from '../lib/api';

export interface Node {
  id: string;
  name: string;
  network: string;
  status: 'active' | 'pending' | 'error' | string; // string allows for intermediate statuses
  avatar: string;
}

interface NodeState {
  nodes: Node[];
  addNode: (node: Node) => void;
  updateNodeStatus: (nodeId: string, status: string) => void;
  setNodes: (nodes: Node[]) => void;
  fetchNodes: (userId: string) => Promise<void>;
}

export const useNodeStore = create<NodeState>((set) => ({
  nodes: [],
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  updateNodeStatus: (nodeId, status) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, status } : node
      ),
    })),
  setNodes: (nodes) => set({ nodes }),
  fetchNodes: async (userId: string) => {
    try {
      const deployments = await fetchUserDeployments(userId);
      // Map the DeploymentStatus from backend to frontend Node interface
      const nodes: Node[] = deployments.map((dep: any) => ({
        id: dep.id,
        name: `${dep.blockchainType} Node`, // Assuming a simple naming convention
        network: dep.blockchainType,
        status: dep.status,
        avatar: `/avatars/${dep.blockchainType.toLowerCase()}.svg`, // Assuming avatars exist
      }));
      set({ nodes });
    } catch (error) {
      console.error("Failed to fetch nodes:", error);
      // Optionally set an error state here
    }
  },
}));
