# Maron Nodes - Blockchain Node-as-a-Service Platform

🚀 Deploy and manage blockchain validator nodes across 40+ networks in seconds.

## 📖 Overview

Maron Nodes is a modern SaaS platform that automates the deployment and management of blockchain validator nodes across multiple cloud providers. Built as a monorepo with Next.js frontend and Spring Boot backend, it provides a seamless experience for running blockchain infrastructure without DevOps complexity.

### Key Features

- **One-Click Deployment**: Deploy blockchain nodes in under 2 minutes
- **Multi-Cloud Support**: Hetzner, Contabo, and Akamai integration
- **40+ Blockchains**: Support for Polygon, Ethereum, Avalanche, and more
- **Real-Time Monitoring**: Live dashboards with WebSocket updates
- **Auto-Scaling**: Dynamic resource allocation based on demand
- **Enterprise Security**: Bank-grade encryption and DDoS protection

## 🏗️ Architecture

```
┌─────────────────────────┐
│   Next.js Frontend      │  (Port 3000)
│   (React, TailwindCSS) │
├─────────────────────────┤
│   Spring Boot API       │  (Port 8080)
│   (REST + WebSocket)    │
├─────────────────────────┤
│   RabbitMQ + PostgreSQL │
│   (Message Queue + DB)  │
├─────────────────────────┤
│   Terraform + Ansible   │
│   (Infrastructure)      │
├─────────────────────────┤
│   Multi-Cloud Providers │
│   (Hetzner/Contabo/Aka) │
└─────────────────────────┘
```

## 📁 Monorepo Structure

```
maron_nodes/
├── apps/
│   ├── web/                # Next.js 15 frontend
│   └── api/                # Spring Boot backend
├── packages/
│   ├── ui/                 # Shared UI components
│   ├── types/              # Shared TypeScript types
│   └── config/             # Shared configurations
├── infra/
│   ├── terraform/          # Infrastructure as Code
│   └── ansible/            # Configuration management
├── docs/                   # Documentation
└── scripts/                # Utility scripts
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ with **pnpm** 9+
- **Java** 21+
- **Maven** 3.9+
- **Docker** & Docker Compose (for local DB/RabbitMQ)
- **Terraform** CLI (for infrastructure)
- **Ansible** (for node configuration)

### Installation

```bash
# Clone the repository
git clone https://github.com/filippo-mancinelli/maron_nodes.git
cd maron_nodes

# Install frontend dependencies
pnpm install

# Start local services (PostgreSQL + RabbitMQ)
pnpm docker:up
```

### Development

**Terminal 1 - Frontend:**
```bash
pnpm dev
# Frontend runs on http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
pnpm dev:api
# Backend runs on http://localhost:8080
```

**Terminal 3 - Infrastructure (Optional):**
```bash
cd infra/terraform/hetzner
terraform init
terraform plan
```

## 🔧 Configuration

### Frontend Environment Variables

Create `apps/web/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend Configuration

Create `apps/api/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/maronnodes
spring.datasource.username=myuser
spring.datasource.password=secret
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
```

### Infrastructure Secrets

Create HCP Vault secrets or use `terraform.auto.tfvars`:

```hcl
hcloud_token = "your-hetzner-token"
hcp_client_id = "your-hcp-client-id"
hcp_client_secret = "your-hcp-secret"
```

## 📚 Documentation

- [Full SaaS Analysis & Roadmap](./ANALISI_SAAS.md)
- [Profit Margins Analysis](./PROFIT_MARGINS_ANALYSIS.md)
- [Monorepo Structure Guide](./MONOREPO_STRUCTURE.md)
- [Frontend README](./apps/web/README.md)

## 🎯 Deployment Workflow

### Via REST API (SaaS Mode)

```bash
# 1. User requests node deployment via frontend
POST /api/deployments
{
  "userId": "user123",
  "blockchain": "polygon",
  "cloudProvider": "hetzner"
}

# 2. Backend publishes to RabbitMQ
# 3. Consumer triggers Terraform provisioning
# 4. Terraform creates server & triggers GitHub Actions
# 5. Ansible configures blockchain node
# 6. WebSocket sends real-time status updates
# 7. User receives node details (IP, RPC endpoint)
```

### Via Terraform CLI (Manual)

```bash
cd infra/terraform/hetzner
terraform init
terraform plan
terraform apply
```

## 💰 Business Model

| Plan | Price/Month | Nodes | Target |
|------|-------------|-------|--------|
| **Starter** | €9.99 | 1 node | Beginners |
| **Pro** | €49.99 | 5 nodes | Validators |
| **Enterprise** | €199.99 | 20 nodes | Organizations |

**Break-even**: 48-50 clients (~€2,000 MRR)

See [PROFIT_MARGINS_ANALYSIS.md](./PROFIT_MARGINS_ANALYSIS.md) for detailed financial projections.

## 🧪 Testing

```bash
# Frontend
pnpm lint
pnpm typecheck
pnpm test

# Backend
cd apps/api
mvn test
```

## 🚢 Deployment

### Frontend (Vercel)

```bash
vercel --prod
```

### Backend (Docker)

```bash
cd apps/api
docker build -t maron-nodes-api .
docker run -p 8080:8080 maron-nodes-api
```

### Infrastructure

```bash
cd infra/terraform/hetzner
terraform apply -auto-approve
```

## 📊 Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript 5.7
- TailwindCSS 4
- shadcn/ui (Radix UI)
- TanStack Query
- Zustand
- NextAuth v5

### Backend
- Spring Boot 3.4.2
- Java 21
- PostgreSQL 16
- RabbitMQ
- Spring Security
- WebSocket

### Infrastructure
- Terraform (IaC)
- Ansible (Config Management)
- Hetzner Cloud
- Contabo
- Akamai (Linode)
- HCP Vault (Secrets)
- GitHub Actions (CI/CD)

## 🗺️ Roadmap

### Phase 1: MVP (Months 1-2) ✅ IN PROGRESS
- [x] Monorepo setup
- [x] Landing page
- [x] UI component library
- [ ] Authentication (JWT)
- [ ] Dashboard
- [ ] One-click deployment flow
- [ ] Stripe integration

### Phase 2: Growth (Months 3-4)
- [ ] 10+ blockchain networks
- [ ] Admin panel
- [ ] Advanced monitoring (Prometheus/Grafana)
- [ ] Backup automation
- [ ] Email notifications

### Phase 3: Scale (Months 5-6)
- [ ] Enterprise features
- [ ] API for developers
- [ ] Multi-region support
- [ ] Kubernetes deployment

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Easy-Node.xyz](https://easy-node.xyz/) - Inspiration for the SaaS model
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Vercel](https://vercel.com/) - Frontend hosting
- [Hetzner](https://www.hetzner.com/) - Affordable cloud infrastructure

## 📞 Contact

- **Website**: [maronnodes.com](https://maronnodes.com) (coming soon)
- **Email**: contact@maronnodes.com
- **Twitter**: [@maronnodes](https://twitter.com/maronnodes)
- **Discord**: [Join our community](https://discord.gg/maronnodes)

---

Built with ❤️ by the Maron Nodes team

**Status**: 🚧 Work in Progress - v0.1.0-alpha
