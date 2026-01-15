import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Zap,
  Shield,
  TrendingUp,
  Globe,
  CheckCircle2,
  ArrowRight,
  Server,
  Cpu,
  Network
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Maron Nodes</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#networks" className="text-sm font-medium hover:text-primary transition-colors">
              Networks
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Docs
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm">
              <Zap className="mr-2 h-4 w-4 text-primary" />
              <span>Deploy blockchain nodes in seconds</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Run Blockchain Nodes
              <span className="text-primary"> Without the Hassle</span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              Deploy, manage, and scale validator nodes across 40+ blockchain networks.
              No DevOps experience required. Starting at just €9.99/month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" asChild>
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground">
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
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/30 py-12">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary">25,000+</div>
                <div className="text-sm text-muted-foreground mt-1">Nodes Deployed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">40+</div>
                <div className="text-sm text-muted-foreground mt-1">Blockchains</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground mt-1">Uptime SLA</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">15k+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Users</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to run nodes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Focus on your blockchain journey while we handle the infrastructure
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>One-Click Deploy</CardTitle>
                <CardDescription>
                  Deploy your first node in under 2 minutes with our intuitive interface
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Bank-grade encryption, DDoS protection, and automated security updates
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Auto-Scaling</CardTitle>
                <CardDescription>
                  Automatically scale resources based on network demands
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multi-Cloud</CardTitle>
                <CardDescription>
                  Deploy across Hetzner, Contabo, and Akamai for maximum reliability
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Cpu className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Track performance, uptime, and rewards with live dashboards
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Network className="h-10 w-10 text-primary mb-2" />
                <CardTitle>40+ Networks</CardTitle>
                <CardDescription>
                  Support for Ethereum, Polygon, Avalanche, and 37 more blockchains
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center space-y-4 py-12">
              <CardTitle className="text-3xl sm:text-4xl">
                Ready to start running nodes?
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                Join thousands of validators already using Maron Nodes
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="xl" variant="secondary" asChild>
                  <Link href="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#networks" className="hover:text-foreground">Networks</Link></li>
                <li><Link href="/docs" className="hover:text-foreground">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs" className="hover:text-foreground">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-foreground">API</Link></li>
                <li><Link href="/status" className="hover:text-foreground">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2026 Maron Nodes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
