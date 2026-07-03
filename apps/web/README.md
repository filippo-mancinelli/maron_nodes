# Maron Nodes - Web Frontend

Modern Next.js 15 frontend for the Maron Nodes blockchain node deployment platform.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: TailwindCSS 4
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Auth**: NextAuth v5
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion

## 📋 Prerequisites

- Node.js 20+
- pnpm 9+

## 🛠️ Installation

```bash
# From monorepo root
pnpm install

# Or from this directory
cd apps/web
pnpm install
```

## 🏃 Development

```bash
# From monorepo root
pnpm dev

# Or from this directory
cd apps/web
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8080)
- `NEXT_PUBLIC_WS_URL` - WebSocket URL for real-time updates
- `NEXTAUTH_URL` - Your application URL
- `NEXTAUTH_SECRET` - Secret for NextAuth (generate with `openssl rand -base64 32`)

Optional (for payment integration):
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret

## 📦 Build

```bash
# From monorepo root
pnpm build

# Or from this directory
cd apps/web
pnpm build
```

## 🧪 Testing

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory (routes)
│   ├── (auth)/            # Auth layout group
│   ├── (dashboard)/       # Dashboard layout group
│   ├── (marketing)/       # Marketing layout group
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   └── marketing/        # Marketing components
├── lib/                   # Utilities & helpers
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores
└── types/                 # TypeScript types
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/), a collection of re-usable components built with Radix UI and Tailwind CSS.

Components are located in `src/components/ui/` and can be customized as needed.

## 🔗 API Integration

The frontend communicates with the Spring Boot backend API (see `/apps/api`).

API client configuration is in `src/lib/api.ts`.

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Connect your GitHub repo to Vercel
# Or use Vercel CLI
vercel
```

### Docker

```bash
# Build
docker build -t maron-nodes-web .

# Run
docker run -p 3000:3000 maron-nodes-web
```

### Static Export (Optional)

```bash
# Add to next.config.mjs:
# output: 'export'

pnpm build
# Output will be in ./out directory
```

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm clean` - Clean build artifacts

## 🎯 Features Implemented

- ✅ Modern landing page with pricing
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Component library setup
- ✅ API client configuration
- ✅ Toast notifications
- ✅ TypeScript strict mode

## 🚧 TODO

- [ ] Authentication pages (login, register, forgot password)
- [ ] Dashboard layout and pages
- [ ] Node deployment flow
- [ ] Billing & subscription management
- [ ] User settings page
- [ ] Real-time WebSocket integration
- [ ] Stripe payment integration
- [ ] E2E tests with Playwright
- [ ] Analytics integration

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TanStack Query Documentation](https://tanstack.com/query)

## 🤝 Contributing

See the main README in the monorepo root for contribution guidelines.

## 📄 License

MIT
