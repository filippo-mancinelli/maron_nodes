# maron_nodes
Infrastructure for automating the creation of servers on the cloud running blockchain validator nodes.

# Prerequisites

## Backend
- resources/application.properties

## Infrastructure
- Terraform CLI
- Hetzner Api Key
- .env

### Terraform CLI - Ubuntu
Update and install necessary packages
```
sudo apt update && sudo apt install -y gnupg software-properties-common
```

Add HashiCorp's official GPG key
```
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
```

Add the HashiCorp repository
```
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/- hashicorp.list
```

Install Terraform
```
sudo apt update && sudo apt install terraform -y
```

Verify installation
```
terraform -version
``` 
### Hetzner Api Key
refer to [Hetzner docs](https://docs.hetzner.cloud/#overview) for instructions on how to create an API key.

### .env
Create a .env file in the root directory of the project with the following contents:
```
HETZNER_API_KEY=<your api key>
```

# Usage

## Create a new node
To create a new node...
