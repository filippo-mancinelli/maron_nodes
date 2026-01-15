package com.maronnodes.models;

import java.time.Instant;

public class DeploymentStatus {
    private String deploymentId;
    private String userId;
    private String blockchainType;
    private Status status;
    private Instant timestamp;
    private String serverIp;
    private String errorMessage;

    public enum Status {
        PROCESSING, SUCCESS, FAILED
    }

    public DeploymentStatus() {}

    public DeploymentStatus(String deploymentId, String userId, String blockchainType, Status status, Instant timestamp, String serverIp, String errorMessage) {
        this.deploymentId = deploymentId;
        this.userId = userId;
        this.blockchainType = blockchainType;
        this.status = status;
        this.timestamp = timestamp;
        this.serverIp = serverIp;
        this.errorMessage = errorMessage;
    }

    public String getDeploymentId() {
        return deploymentId;
    }

    public void setDeploymentId(String deploymentId) {
        this.deploymentId = deploymentId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getBlockchainType() {
        return blockchainType;
    }

    public void setBlockchainType(String blockchainType) {
        this.blockchainType = blockchainType;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getServerIp() {
        return serverIp;
    }

    public void setServerIp(String serverIp) {
        this.serverIp = serverIp;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}