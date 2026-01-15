package com.maronnodes.controllers;

import com.maronnodes.models.DeploymentStatus;
import com.maronnodes.repository.DeploymentRepository;
import com.maronnodes.services.NodeDeploymentService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DeploymentStatusController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private DeploymentRepository repository;

    @Autowired
    private FakeDeploymentService fakeDeploymentService;

    // DTO for the request body
    public record DeploymentRequest(String userId, String blockchainType) {}

    @PostMapping("/deployments")
    public void triggerDeployment(@RequestBody DeploymentRequest request) {
        // For now, we only use the fake service as requested
        fakeDeploymentService.deployFakeNode(request.userId(), request.blockchainType());
    }

    @RabbitListener(queues = "deployment_status")
    public void handleStatusUpdate(String status) {
        // This will be implemented later to push status to WebSocket
    }

    @GetMapping("/deployments/{id}")
    public DeploymentStatus getDeploymentStatus(@PathVariable String id) {
        return repository.findById(id).orElseThrow(() -> new DeploymentNotFoundException("No deployment found with id " + id));
    }

    @GetMapping("/deployments/user/{userId}")
    public List<DeploymentStatus> getUserDeployments(@PathVariable String userId) {
        return repository.findByUserId(userId);
    }

    private static class DeploymentNotFoundException extends RuntimeException {
        public DeploymentNotFoundException(String message) {
            super(message);
        }
    }
}