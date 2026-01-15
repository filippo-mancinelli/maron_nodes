export async function fetchUserDeployments(userId: string) {
  try {
    const response = await fetch(`/api/v1/deployments/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching deployments: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch user deployments:", error);
    throw error;
  }
}
