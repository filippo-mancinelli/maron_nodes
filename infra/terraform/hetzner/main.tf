terraform {
  cloud {
    organization = "maronnodes"
    workspaces {
      name = "HetznerRuns"
    }
  }
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.42.0"
    }
    hcp = {
      source  = "hashicorp/hcp"
      version = "0.91.0"
    }
    http = {
      source  = "hashicorp/http"
      version = "3.4.5"
    }
  }
}

# Fetch SSH keys from HCP Vault
data "hcp_vault_secrets_app" "ansible_ssh_keys" {
  app_name = "maronnodes"
}

# Parse the SSH keys from the fetched secrets
locals {
  ansible_ssh_priv = data.hcp_vault_secrets_app.ansible_ssh_keys.secrets["ansible_ssh_priv"]
  ansible_ssh_pub  = data.hcp_vault_secrets_app.ansible_ssh_keys.secrets["ansible_ssh_pub"]
}

variable "hcloud_token" {
  type        = string
  description = "Hetzner Cloud API token"
  sensitive   = true
}

variable "hcp_client_id" {
  type        = string
  description = "HCP Client ID"
  sensitive   = true
}

variable "hcp_client_secret" {
  type        = string
  description = "HCP Client Secret"
  sensitive   = true
}

variable "github_token" {
  type        = string
  description = "GitHub personal access token"
  sensitive   = true
}

provider "hcloud" {
  token = var.hcloud_token
}

provider "hcp" {
  client_id     = var.hcp_client_id
  client_secret = var.hcp_client_secret
}

# Upload the public key to Hetzner Cloud
resource "hcloud_ssh_key" "ansible" {
  name       = "ansible-ssh-key"
  public_key = local.ansible_ssh_pub
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
          - ${local.ansible_ssh_pub}
  EOT
}

# Output server IP
output "server_ip" {
  value = hcloud_server.polygon_node.ipv4_address
}

output "node_connection" {
  value = {
    ip         = hcloud_server.polygon_node.ipv4_address
    ssh_user   = "ansible"
    ssh_key    = local.ansible_ssh_priv
    blockchain = "polygon"
  }
  sensitive = true
}

# Trigger Ansible Setup via GitHub Actions workflow
data "http" "trigger_ansible" {
  depends_on = [hcloud_server.polygon_node]

  url    = "https://api.github.com/repos/filippo-mancinelli/maron_nodes/actions/workflows/ansible-polygon.yml/dispatches"
  method = "POST"

  request_headers = {
    Accept        = "application/json"
    Authorization = "Bearer ${var.github_token}"
    Content-Type  = "application/json"
  }

  request_body = jsonencode({
    ref = "dev",
    inputs = {
      server_ip  = hcloud_server.polygon_node.ipv4_address
      ssh_user   = "ansible"
      blockchain = "polygon"
      branch     = "dev"
    }
  })
}