terraform {
  cloud {
    organization = "maronnodes"

    workspaces {
      name = "HCPVaultSecretsLab"
    }
  }
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.42.0"
    }
    hcp = {
      source = "hashicorp/hcp"
      version = "0.91.0"
    }
  }
}

data "hcp_vault_secrets_app" "web_application" {
  app_name = "maronnodes"
}

variable "hcloud_token" {
  sensitive = true
}

variable "vault_token" {
  sensitive = true
}

variable "hcp_client_id" {
  sensitive = true
}

variable "hcp_client_secret" {
  sensitive = true
}

variable "hcp_project_id" {
  sensitive = false
}

provider "hcloud" {
  token = var.hcloud_token
}

provider "hcp" {
  client_id     = var.hcp_client_id
  client_secret = var.hcp_client_secret
}

# Generate SSH key for Ansible
resource "tls_private_key" "ansible_ssh" {
  algorithm = "ED25519"
}

resource "hcloud_ssh_key" "ansible" {
  name       = "ansible-ssh-key"
  public_key = tls_private_key.ansible_ssh.public_key_openssh
}

# Create server with Docker pre-installed via cloud-init
resource "hcloud_server" "polygon_node" {
  name        = "polygon-node-${formatdate("YYYYMMDDhhmmss", timestamp())}"
  image       = "ubuntu-24.04"
  server_type = "cx22"
  location    = "nbg1"
  ssh_keys    = [hcloud_ssh_key.ansible.id]

  user_data = <<-EOT
    #cloud-config
    package_update: true
    packages:
      - docker.io
      - docker-compose
    users:
      - name: ansible
        groups: docker
        sudo: ALL=(ALL) NOPASSWD:ALL
        ssh-authorized-keys:
          - ${tls_private_key.ansible_ssh.public_key_openssh}
  EOT
}

# Output server IP for Ansible
output "server_ip" {
  value = hcloud_server.polygon_node.ipv4_address
}

output "secrets" {
  value = data.hcp_vault_secrets_app.web_application.secrets
  sensitive = true
}
