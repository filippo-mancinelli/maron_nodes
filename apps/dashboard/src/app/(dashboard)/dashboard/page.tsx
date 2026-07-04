"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NodesTable } from "@/components/nodes-table";
import { useNodeStore } from "@/store/node-store";
import {
  Server,
  Activity,
  Cpu,
  HardDrive,
  TrendingUp,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: any;
  trend?: { value: string; positive: boolean };
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-sm border border-dashed border-input bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div
            className={`flex items-center gap-1 mt-2 text-xs ${
              trend.positive ? "text-green-500" : "text-red-500"
            }`}
          >
            <TrendingUp className={`h-3 w-3 ${!trend.positive && "rotate-180"}`} />
            <span>{trend.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function NodeStatusOverview({ nodes }: { nodes: any[] }) {
  const activeNodes = nodes.filter((n) => n.status === "active").length;
  const pendingNodes = nodes.filter((n) => n.status === "pending").length;
  const errorNodes = nodes.filter((n) => n.status === "error").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Node Status Overview</CardTitle>
        <CardDescription>Quick view of your node statuses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-sm bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-xs text-muted-foreground">Running normally</p>
            </div>
          </div>
          <span className="text-2xl font-bold">{activeNodes}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-sm bg-yellow-500/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Pending</p>
              <p className="text-xs text-muted-foreground">Deploying or syncing</p>
            </div>
          </div>
          <span className="text-2xl font-bold">{pendingNodes}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-sm bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Error</p>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </div>
          </div>
          <span className="text-2xl font-bold">{errorNodes}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const fetchNodes = useNodeStore((state) => state.fetchNodes);
  const nodes = useNodeStore((state) => state.nodes);

  useEffect(() => {
    fetchNodes("user123");
  }, [fetchNodes]);

  const activeNodes = nodes.filter((n) => n.status === "active").length;

  return (
    <div className="space-y-6">
      <div>
        <span className="mn-label">Overview</span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your infrastructure.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Nodes"
          value={nodes.length.toString()}
          description="Across all networks"
          icon={Server}
        />
        <StatsCard
          title="Active Nodes"
          value={activeNodes.toString()}
          description="Running smoothly"
          icon={Activity}
          trend={{ value: "100% uptime", positive: true }}
        />
        <StatsCard
          title="Avg. CPU Usage"
          value="42%"
          description="Last 24 hours"
          icon={Cpu}
        />
        <StatsCard
          title="Storage Used"
          value="1.2 TB"
          description="Of 5 TB allocated"
          icon={HardDrive}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Nodes</CardTitle>
              <CardDescription>
                Manage and monitor your deployed blockchain nodes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NodesTable />
            </CardContent>
          </Card>
        </div>
        <div>
          <NodeStatusOverview nodes={nodes} />
        </div>
      </div>
    </div>
  );
}
