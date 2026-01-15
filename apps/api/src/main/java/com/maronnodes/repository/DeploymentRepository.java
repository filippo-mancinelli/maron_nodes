package com.maronnodes.repository;

import com.maronnodes.models.DeploymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeploymentRepository extends JpaRepository<DeploymentStatus, String> {
    List<DeploymentStatus> findByUserId(String userId);
}