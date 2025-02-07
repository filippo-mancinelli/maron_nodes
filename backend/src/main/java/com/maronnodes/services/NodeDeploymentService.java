package com.maronnodes.services;

import java.util.Map;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NodeDeploymentService {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void deployNode(String blockchainType) {
        rabbitTemplate.convertAndSend(
            "deployment_exchange", // Exchange name
            "deployment_routing_key", // Routing key
            Map.of("blockchain_type", blockchainType)
        );
    }
}