package com.maronnodes.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {
    @Bean
    public Queue deploymentQueue() {
        return new Queue("deployment_queue", true);
    }

    @Bean
    public DirectExchange deploymentExchange() {
        return new DirectExchange("deployment_exchange");
    }

    @Bean
    public Binding binding(Queue deploymentQueue, DirectExchange deploymentExchange) {
        return BindingBuilder.bind(deploymentQueue)
                .to(deploymentExchange)
                .with("deployment_routing_key");
    }
}
