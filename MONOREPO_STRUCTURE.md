# Maron Nodes - Monorepo Structure

## 📁 Directory Structure

```
maron_nodes/
├── apps/
│   ├── web/                    # Frontend Next.js 15 (App Router)
│   │   ├── src/
│   │   │   ├── app/           # Next.js app directory
│   │   │   │   ├── (auth)/    # Auth layout group
│   │   │   │   │   ├── login/
│   │   │   │   │   └── register/
│   │   │   │   ├── (dashboard)/  # Dashboard layout group
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── nodes/
│   │   │   │   │   ├── billing/
│   │   │   │   │   └── settings/
│   │   │   │   ├── (marketing)/  # Marketing layout group
│   │   │   │   │   ├── page.tsx  # Landing page
│   │   │   │   │   ├── pricing/
│   │   │   │   │   └── docs/
│   │   │   │   ├── api/          # API routes
│   │   │   │   ├── layout.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/       # React components
│   │   │   │   ├── ui/          # shadcn/ui components
│   │   │   │   ├── layout/      # Layout components
│   │   │   │   ├── dashboard/   # Dashboard specific
│   │   │   │   └── marketing/   # Marketing specific
│   │   │   ├── lib/             # Utilities
│   │   │   │   ├── api.ts       # API client
│   │   │   │   ├── auth.ts      # Auth helpers
│   │   │   │   └── utils.ts     # General utils
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── store/           # Zustand stores
│   │   │   └── types/           # TypeScript types
│   │   ├── public/              # Static assets
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   └── next.config.mjs
│   │
│   └── api/                    # Backend Spring Boot (moved from /backend)
│       ├── src/
│       ├── pom.xml
│       └── ...
│
├── packages/
│   ├── ui/                     # Shared UI components library
│   │   ├── src/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/                  # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── api.ts         # API response types
│   │   │   ├── models.ts      # Domain models
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                 # Shared configurations
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── tailwind/
│   │
│   └── utils/                  # Shared utilities
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
│
├── infra/                      # Infrastructure (unchanged)
│   ├── terraform/
│   ├── ansible/
│   └── ...
│
├── docs/                       # Documentation
│   ├── api/                   # API documentation
│   ├── deployment/            # Deployment guides
│   └── user-guide/            # User documentation
│
├── scripts/                    # Utility scripts
│   ├── setup.sh
│   ├── dev.sh
│   └── deploy.sh
│
├── .github/                    # GitHub Actions (unchanged)
│   └── workflows/
│
├── package.json               # Root package.json (workspaces)
├── pnpm-workspace.yaml        # PNPM workspaces config
├── pnpm-lock.yaml            # PNPM lockfile
├── turbo.json                # Turborepo config
├── .gitignore
├── .env.example
├── README.md
├── ANALISI_SAAS.md
└── PROFIT_MARGINS_ANALYSIS.md
```

## 🛠️ Tech Stack

### Frontend (`apps/web`)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 4
- **UI Library**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Auth**: NextAuth.js v5
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion

### Backend (`apps/api`)
- **Framework**: Spring Boot 3.4.2
- **Language**: Java 21
- **Database**: PostgreSQL 16
- **Message Queue**: RabbitMQ
- **Cache**: Redis (future)
- **ORM**: Spring Data JPA
- **Security**: Spring Security + JWT

### Infrastructure
- **IaC**: Terraform
- **Config Management**: Ansible
- **Cloud**: Hetzner, Contabo, Akamai
- **Secrets**: HCP Vault
- **CI/CD**: GitHub Actions

### Shared Packages
- **Build System**: pnpm + Turborepo
- **Linting**: ESLint 9 + Prettier
- **Testing**: Vitest + React Testing Library
- **Type Checking**: TypeScript strict mode

## 📦 Package Management

### pnpm Workspaces
Using pnpm for fast, efficient dependency management with workspace support.

**Benefits**:
- Fast installation (symlinked node_modules)
- Efficient disk space usage
- Strict dependency resolution
- Built-in monorepo support

### Turborepo (Optional)
For incremental builds and caching across the monorepo.

## 🔧 Development Workflow

### Commands

```bash
# Install all dependencies
pnpm install

# Run frontend dev server
pnpm --filter web dev

# Run backend
cd apps/api && mvn spring-boot:run

# Build all packages
pnpm build

# Type check all TypeScript
pnpm typecheck

# Lint all code
pnpm lint

# Run tests
pnpm test

# Format code
pnpm format
```

### Scripts (Root `package.json`)

```json
{
  "scripts": {
    "dev": "pnpm --filter web dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "typecheck": "turbo run typecheck",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
    "clean": "turbo run clean && rm -rf node_modules"
  }
}
```

## 🌐 Environment Variables

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend (`.env`)
```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/maronnodes
SPRING_DATASOURCE_USERNAME=myuser
SPRING_DATASOURCE_PASSWORD=secret
SPRING_RABBITMQ_HOST=localhost
SPRING_RABBITMQ_PORT=5672
HCP_VAULT_TOKEN=your-vault-token
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=your-jwt-secret
```

## 🚀 Deployment Strategy

### Frontend (Vercel/Cloudflare Pages)
- Automatic deployments from `main` branch
- Preview deployments for PRs
- Edge functions for API routes
- CDN distribution

### Backend (DigitalOcean/AWS)
- Docker container deployment
- GitHub Actions CI/CD
- Blue-green deployments
- Health checks + auto-scaling

### Infrastructure (Terraform Cloud)
- Remote state management
- Automatic plan on PR
- Apply on merge to main

## 📚 Documentation Structure

### API Documentation
- OpenAPI/Swagger spec at `/api/docs`
- Postman collection
- Code examples

### User Guide
- Getting started
- Node deployment tutorials
- Billing & pricing
- Troubleshooting

### Developer Guide
- Setup instructions
- Architecture overview
- Contributing guidelines
- API reference

## 🔐 Security

### Frontend
- CSP headers
- CSRF protection
- XSS prevention
- Secure authentication flow
- Environment variable validation

### Backend
- JWT authentication
- Rate limiting
- Input validation
- SQL injection prevention
- Secrets in Vault

## 🧪 Testing Strategy

### Frontend
- Unit tests: Vitest
- Component tests: React Testing Library
- E2E tests: Playwright
- Visual regression: Chromatic

### Backend
- Unit tests: JUnit 5
- Integration tests: Spring Test
- API tests: REST Assured

## 📈 Monitoring

### Frontend
- Vercel Analytics
- Sentry error tracking
- Web Vitals monitoring

### Backend
- Datadog APM
- Prometheus metrics
- Grafana dashboards
- Log aggregation (ELK)

---

**Next Steps**: Initialize the monorepo structure! 🚀
