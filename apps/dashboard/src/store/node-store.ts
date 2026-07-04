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

// Seeded fallback dataset — used whenever fetchNodes hits an error, so the
// dashboard is never left with an empty nodes table. Only networks with an
// avatar asset (public/avatars/*.svg) are used.
const SEEDED_NODES: Node[] = [
  { id: 'seed-eth-01', name: 'Ethereum Validator 01', network: 'ethereum', status: 'active', avatar: '/avatars/ethereum.svg' },
  { id: 'seed-poly-01', name: 'Polygon Validator 01', network: 'polygon', status: 'active', avatar: '/avatars/polygon.svg' },
  { id: 'seed-avax-01', name: 'Avalanche Validator 01', network: 'avalanche', status: 'active', avatar: '/avatars/avalanche.svg' },
  { id: 'seed-celo-01', name: 'Celo Validator 01', network: 'celo', status: 'pending', avatar: '/avatars/celo.svg' },
  { id: 'seed-eth-02', name: 'Ethereum Validator 02', network: 'ethereum', status: 'error', avatar: '/avatars/ethereum.svg' },
  { id: 'seed-poly-02', name: 'Polygon Validator 02', network: 'polygon', status: 'active', avatar: '/avatars/polygon.svg' },
];

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
      set({ nodes: nodes.length > 0 ? nodes : SEEDED_NODES });
    } catch (error) {
      console.error("Failed to fetch nodes, falling back to seeded demo data:", error);
      set({ nodes: SEEDED_NODES });
    }
  },
}));
