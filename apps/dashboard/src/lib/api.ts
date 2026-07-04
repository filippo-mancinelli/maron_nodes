// Realistic mock deployments used when demo mode is on (default) or when the
// real Spring API is unreachable. Shaped to match what the real endpoint
// returns so node-store's mapping (dep.id, dep.blockchainType, dep.status)
// produces valid Nodes without any special-casing.
const MOCK_DEPLOYMENTS = [
  { id: 'demo-eth-01', blockchainType: 'ethereum', status: 'active' },
  { id: 'demo-poly-01', blockchainType: 'polygon', status: 'active' },
  { id: 'demo-avax-01', blockchainType: 'avalanche', status: 'active' },
  { id: 'demo-celo-01', blockchainType: 'celo', status: 'pending' },
  { id: 'demo-eth-02', blockchainType: 'ethereum', status: 'error' },
  { id: 'demo-poly-02', blockchainType: 'polygon', status: 'active' },
];

function isDemoMode() {
  return process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';
}

export async function fetchUserDeployments(userId: string) {
  if (isDemoMode()) {
    return MOCK_DEPLOYMENTS;
  }

  try {
    const response = await fetch(`/api/v1/deployments/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching deployments: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch user deployments, falling back to demo data:", error);
    return MOCK_DEPLOYMENTS;
  }
}
