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
  }
}

# Fetch SSH keys from HCP Vault
data "hcp_vault_secrets_app" "ansible_ssh_keys" {
  app_name = "maronnodes"  # Replace with your HCP Vault app name
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

# Output server IP for Ansible
output "server_ip" {
  value = hcloud_server.polygon_node.ipv4_address
}

# After the server is created succesfully, start the Ansible playbook inside of it.
resource "null_resource" "ansible_provisioner" {
  depends_on = [hcloud_server.polygon_node]

  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = <<-EOT
      echo "${local.ansible_ssh_priv}" > ansible_ssh_key &&
      chmod 600 ansible_ssh_key &&
      ansible-playbook \
        -i '${hcloud_server.polygon_node.ipv4_address},' \
        -u ansible \
        --private-key ansible_ssh_key \
        --extra-vars "polygon_data_dir=/data polygon_docker_image=your_image polygon_network=your_network polygon_rpc_port=your_port" \
        your_playbook.yml
    EOT
  }

  # Clean up the SSH key after completion
  provisioner "local-exec" {
    when    = destroy
    command = "rm -f ansible_ssh_key"
  }
}

output "inventory" {
  value = <<-EOT
    [polygon_nodes]
    ${hcloud_server.polygon_node.ipv4_address}
  EOT
}