"use client";

import { UserNav } from "@/components/user-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LayoutDashboard,
  Server,
  Settings,
  CreditCard,
  HelpCircle,
  Zap,
  Plus
} from "lucide-react";
import { useWebSocket } from "@/hooks/use-web-socket";
import { DeployNodeDialog } from "@/components/deploy-node-dialog";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/nodes", label: "My Nodes", icon: Server },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 px-3">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">Maron Nodes</span>
          </div>
          <div className="flex-1 py-4">
            <Nav />
          </div>
          <div className="border-t p-4">
            <Link
              href="/help"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DesktopSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-card md:flex">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold">Maron Nodes</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between py-4">
        <div className="space-y-4">
          <div className="px-3">
            <DeployNodeDialog />
          </div>
          <Nav />
        </div>
        <div className="px-3">
          <Link
            href="/help"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useWebSocket("user123");

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
          <MobileNav />
          <div className="flex flex-1 items-center gap-4 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">Maron Nodes</span>
          </div>
          <div className="hidden flex-1 md:block" />
          <UserNav />
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
