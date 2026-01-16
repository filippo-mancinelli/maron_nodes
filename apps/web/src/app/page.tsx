import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  Shield,
  TrendingUp,
  Globe,
  CheckCircle2,
  ArrowRight,
  Server,
  Cpu,
  Network,
} from "lucide-react";

const networks = [
  "Ethereum",
  "Polygon",
  "Avalanche",
  "Arbitrum",
  "Optimism",
  "Base",
  "Solana",
  "Celo",
  "Fantom",
  "BNB Chain",
  "Cosmos",
  "Near",
];

const features = [
  {
    icon: Zap,
    title: "One-Click Deploy",
    description:
      "Deploy your first node in under 2 minutes with our intuitive interface. No DevOps knowledge required.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption, DDoS protection, and automated security updates keep your nodes safe.",
  },
  {
    icon: TrendingUp,
    title: "Auto-Scaling",
    description:
      "Automatically scale resources based on network demands. Never worry about capacity again.",
  },
  {
    icon: Globe,
    title: "Multi-Region",
    description:
      "Deploy across EU, US, and Asia data centers for maximum reliability and low latency.",
  },
  {
    icon: Cpu,
    title: "Real-time Monitoring",
    description:
      "Track performance, uptime, and rewards with live dashboards and instant alerts.",
  },
  {
    icon: Network,
    title: "40+ Networks",
    description:
      "Support for Ethereum, Polygon, Avalanche, Arbitrum, and 36 more blockchain networks.",
  },
];

const stats = [
  { value: "25,000+", label: "Nodes Deployed" },
  { value: "40+", label: "Blockchains" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "15k+", label: "Happy Users" },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "9.99",
    features: ["Up to 2 nodes", "Basic monitoring", "Email support", "99% uptime SLA"],
  },
  {
    name: "Pro",
    price: "29.99",
    popular: true,
    features: [
      "Up to 10 nodes",
      "Advanced monitoring",
      "Priority support",
      "99.9% uptime SLA",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited nodes",
      "Custom monitoring",
      "Dedicated support",
      "99.99% uptime SLA",
      "Custom integrations",
    ],
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold">Maron Nodes</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#networks"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Networks
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="gradient-primary hover:opacity-90" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
          </div>
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm">
                <Zap className="mr-2 h-4 w-4 text-primary" />
                <span>Deploy blockchain nodes in seconds</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Run Blockchain Nodes
                <span className="gradient-text"> Without the Hassle</span>
              </h1>
              <p className="mb-10 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
                Deploy, manage, and scale validator nodes across 40+ blockchain
                networks. No DevOps experience required. Starting at just $9.99/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary hover:opacity-90 h-12 px-8" asChild>
                  <Link href="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>7-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-card/50 py-12">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to run nodes
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Focus on your blockchain journey while we handle the infrastructure
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border-border/50 bg-card/50">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="networks" className="py-24 bg-card/30">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Supported Networks
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Deploy nodes on 40+ blockchain networks with one click
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {networks.map((network) => (
                <div
                  key={network}
                  className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {network.slice(0, 2).toUpperCase()}
                  </div>
                  {network}
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-full border border-dashed bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground">
                +28 more
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that fits your needs. All plans include a 7-day free trial.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${
                    plan.popular ? "border-primary shadow-lg glow" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full gradient-primary px-3 py-1 text-xs font-medium text-white">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      {plan.price === "Custom" ? (
                        <span className="text-4xl font-bold">Custom</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold">${plan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular ? "gradient-primary hover:opacity-90" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/register">
                        {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-card/30">
          <div className="container">
            <Card className="gradient-primary text-white border-0">
              <CardContent className="text-center py-16 px-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to start running nodes?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Join thousands of validators already using Maron Nodes to power their blockchain infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-12 px-8"
                    asChild
                  >
                    <Link href="/register">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/docs">View Documentation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-card/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">Maron Nodes</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                Deploy and manage blockchain validator nodes with ease. Support for 40+ networks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#networks" className="hover:text-foreground">
                    Networks
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Maron Nodes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
