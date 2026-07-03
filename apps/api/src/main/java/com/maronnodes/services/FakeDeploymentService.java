package com.maronnodes.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class FakeDeploymentService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // DTO for the WebSocket message
    public record DeploymentStatusUpdate(String id, String name, String network, String status) {}

    public void deployFakeNode(String userId, String blockchainType) {
        // Generate a unique ID for the new node
        String nodeId = UUID.randomUUID().toString();
        String nodeName = blockchainType + " Node";

        // Immediately send a "pending" status to the user's topic
        DeploymentStatusUpdate initialStatus = new DeploymentStatusUpdate(nodeId, nodeName, blockchainType, "pending");
        messagingTemplate.convertAndSend("/queue/deployments/" + userId, initialStatus);

        // Start the async simulation
        simulateDeployment(userId, nodeId, nodeName, blockchainType);
    }

    @Async
    public void simulateDeployment(String userId, String nodeId, String nodeName, String blockchainType) {
        String topic = "/queue/deployments/" + userId;
        try {
            // Stage 1: Provisioning
            TimeUnit.SECONDS.sleep(15);
            DeploymentStatusUpdate provisioningStatus = new DeploymentStatusUpdate(nodeId, nodeName, blockchainType, "Provisioning");
            messagingTemplate.convertAndSend(topic, provisioningStatus);

            // Stage 2: Installing
            TimeUnit.SECONDS.sleep(15);
            DeploymentStatusUpdate installingStatus = new DeploymentStatusUpdate(nodeId, nodeName, blockchainType, "Installing");
            messagingTemplate.convertAndSend(topic, installingStatus);

            // Stage 3: Syncing
            TimeUnit.SECONDS.sleep(20);
            DeploymentStatusUpdate syncingStatus = new DeploymentStatusUpdate(nodeId, nodeName, blockchainType, "Syncing");
            messagingTemplate.convertAndSend(topic, syncingStatus);

            // Stage 4: Active
            TimeUnit.SECONDS.sleep(10);
            DeploymentStatusUpdate activeStatus = new DeploymentStatusUpdate(nodeId, nodeName, blockchainType, "active");
            messagingTemplate.convertAndSend(topic, activeStatus);

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            // Optionally send an error status
            DeploymentStatusUpdate errorStatus = new DeploymentStatusUpdate(nodeId, nodeName, blockchainType, "error");
            messagingTemplate.convertAndSend(topic, errorStatus);
        }
    }
}
