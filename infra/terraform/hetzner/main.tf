terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.42.0"
    }
  }
}

variable "hcloud_token" {
  sensitive = true
}

provider "hcloud" {
  token = var.hcloud_token
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
  image       = "ubuntu-22.04"
  server_type = "cx11"  # 2 vCPU, 2GB RAM (sufficient for Polygon testnet)
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