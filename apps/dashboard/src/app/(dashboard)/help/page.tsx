"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Book,
  MessageCircle,
  Mail,
  ExternalLink,
  Search,
  FileText,
  Video,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

const resources = [
  {
    title: "Documentation",
    description: "Comprehensive guides and API references",
    icon: Book,
    href: "/docs",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs",
    icon: Video,
    href: "/tutorials",
  },
  {
    title: "FAQ",
    description: "Answers to common questions",
    icon: HelpCircle,
    href: "/faq",
  },
  {
    title: "Changelog",
    description: "Latest updates and improvements",
    icon: FileText,
    href: "/changelog",
  },
];

const faqs = [
  {
    question: "How do I deploy my first node?",
    answer:
      "Click the 'Deploy Node' button in the sidebar, select your blockchain network and server location, then click Deploy. Your node will be ready in minutes.",
  },
  {
    question: "What blockchains do you support?",
    answer:
      "We support over 40 blockchain networks including Ethereum, Polygon, Avalanche, Arbitrum, Optimism, Base, Solana, and many more.",
  },
  {
    question: "How is billing calculated?",
    answer:
      "Billing is based on your selected plan and the number of active nodes. All plans include a 7-day free trial with no credit card required.",
  },
  {
    question: "What happens if my node goes offline?",
    answer:
      "Our monitoring system will automatically detect issues and attempt to restart your node. You'll receive instant notifications via email or webhook.",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="mn-label">Support</span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Get the help you need to make the most of Maron Nodes
        </p>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for help articles..."
          className="pl-9 h-12"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Link key={resource.title} href={resource.href}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
              <h3 className="font-medium mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Chat with our support team</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get instant help from our support team. Available Monday to Friday, 9am - 6pm CET.
            </p>
            <Button>
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Send us a message</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Email us at support@maronnodes.com and we&apos;ll get back to you within 24 hours.
            </p>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
