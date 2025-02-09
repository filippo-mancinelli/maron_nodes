package com.maronnodes.controllers;

import com.maronnodes.models.DeploymentStatus;
import com.maronnodes.repository.DeploymentRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class DeploymentStatusController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private DeploymentRepository repository;

    @RabbitListener(queues = "deployment_status")
    public void handleStatusUpdate(String status) {
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