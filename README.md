# WIP - maron_nodes
Infrastructure for automating the creation of servers on the cloud running validator nodes.

# Prerequisites

## Backend
- resources/application.properties
- rabbitMQ running
- postgres running

## Infrastructure
- Terraform CLI
- Hetzner Api Key
- .env

### Terraform CLI - Ubuntu
refer to [Terraform docs](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) for instructions on installing the CLI.

### Hetzner Api Key
refer to [Hetzner docs](https://docs.hetzner.cloud/#overview) for instructions on how to create an API key.

### .env
Create a .env file in the root directory of the project with the following contents:
```
HETZNER_API_KEY=<your api key>
```
# Introduction

### Initialize terraform
```
terraform init
```
```
terraform plan
```

# Usage

## Create a new node
To create a new node...
