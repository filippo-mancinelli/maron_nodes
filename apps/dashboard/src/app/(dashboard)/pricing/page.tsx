"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Server, Building2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for getting started with blockchain nodes",
    price: "9.99",
    icon: Zap,
    features: [
      "Up to 2 nodes",
      "Basic monitoring",
      "Email support",
      "99% uptime SLA",
      "Auto-updates",
      "EU & US regions",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    description: "For professionals running multiple nodes",
    price: "29.99",
    icon: Server,
    features: [
      "Up to 10 nodes",
      "Advanced monitoring",
      "Priority support",
      "99.9% uptime SLA",
      "Auto-scaling",
      "All regions",
      "API access",
      "Custom alerts",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale operations with custom needs",
    price: "Custom",
    icon: Building2,
    features: [
      "Unlimited nodes",
      "Custom monitoring",
      "Dedicated support",
      "99.99% uptime SLA",
      "Custom integrations",
      "Private infrastructure",
      "SLA guarantees",
      "Custom contracts",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <span className="mn-label">Pricing</span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose the plan that fits your needs. All plans include a 7-day free trial.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-solid border-primary shadow-[6px_6px_0_hsl(var(--mn-wine)/0.18)]"
                  : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`h-10 w-10 rounded-sm flex items-center justify-center ${
                      plan.popular
                        ? "bg-primary"
                        : "border border-dashed border-input bg-primary/10"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        plan.popular ? "text-primary-foreground" : "text-primary"
                      }`}
                    />
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  {plan.price === "Custom" ? (
                    <span className="text-3xl font-bold">Custom</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardHeader className="text-center">
          <CardTitle>Need a Custom Solution?</CardTitle>
          <CardDescription>
            Contact our sales team for custom pricing, dedicated infrastructure, and enterprise features.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
