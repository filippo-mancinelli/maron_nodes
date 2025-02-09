package com.maronnodes.services;

import java.time.Instant;
import java.util.Map;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NodeDeploymentService {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void deployNode(String userId, String blockchainType) {
        Map<String,String> message = Map.of(
                "user_id", userId,
                "blockchain_type", blockchainType,
                "timestamp", Instant.now().toString()
        );

        rabbitTemplate.convertAndSend(
                "deployment_queue",
                message
        );
    }
}