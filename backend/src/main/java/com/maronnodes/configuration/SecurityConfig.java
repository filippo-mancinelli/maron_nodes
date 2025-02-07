package com.maronnodes.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/mq/**").permitAll() // Allow all requests to /mq/*
                .anyRequest().authenticated() // Require authentication for all other requests
            )
            .csrf(csrf -> csrf.disable()); // Disable CSRF (enable in production)

        return http.build();
    }
}