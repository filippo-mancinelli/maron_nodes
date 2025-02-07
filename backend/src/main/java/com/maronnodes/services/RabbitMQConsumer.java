package com.maronnodes.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQConsumer {

    @RabbitListener(queues = "deployment_queue")
    public void receiveMessage(String message) {
        System.out.println("Received message: " + message);
        // Process the message -> deploy a node
    }
}
