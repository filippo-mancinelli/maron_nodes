"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNodeStore } from "@/store/node-store";
import { DeployNodeDialog } from "@/components/deploy-node-dialog";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Server,
  Activity,
  MoreHorizontal,
  ExternalLink,
  Terminal,
  Square,
  Play,
  RotateCcw,
  Trash2,
  Cpu,
  HardDrive,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  syncing: {
    label: "Syncing",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  error: {
    label: "Error",
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  stopped: {
    label: "Stopped",
    className: "bg-muted text-muted-foreground",
  },
};

function NodeCard({ node }: { node: any }) {
  const status =
    statusConfig[node.status as keyof typeof statusConfig] ||
    statusConfig.pending;

  return (
    <Card className="group hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={node.avatar} alt={`${node.network} logo`} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                {node.network.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{node.name}</CardTitle>
              <CardDescription className="capitalize">
                {node.network}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Terminal className="mr-2 h-4 w-4" />
                View Logs
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {node.status === "active" ? (
                <DropdownMenuItem>
                  <Square className="mr-2 h-4 w-4" />
                  Stop Node
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Play className="mr-2 h-4 w-4" />
                  Start Node
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <RotateCcw className="mr-2 h-4 w-4" />
                Restart Node
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Node
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge variant="outline" className={status.className}>
            {status.label}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Cpu className="h-3 w-3" />
              <span>CPU</span>
            </div>
            <p className="text-sm font-medium mt-1">45%</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <HardDrive className="h-3 w-3" />
              <span>Disk</span>
            </div>
            <p className="text-sm font-medium mt-1">120GB</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Uptime</span>
            </div>
            <p className="text-sm font-medium mt-1">99.9%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function NodesPage() {
  const fetchNodes = useNodeStore((state) => state.fetchNodes);
  const nodes = useNodeStore((state) => state.nodes);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchNodes("user123");
  }, [fetchNodes]);

  const filteredNodes = nodes.filter((node) => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.network.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || node.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="mn-label">Infrastructure</span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">My Nodes</h1>
          <p className="text-muted-foreground">
            Manage and monitor your deployed blockchain nodes
          </p>
        </div>
        <DeployNodeDialog />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="syncing">Syncing</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="stopped">Stopped</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1 rounded-sm border border-dashed p-1">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredNodes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <Server className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No nodes found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm text-center">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Deploy your first blockchain node to get started"}
            </p>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNodes.map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredNodes.map((node) => {
                const status =
                  statusConfig[node.status as keyof typeof statusConfig] ||
                  statusConfig.pending;
                return (
                  <div
                    key={node.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={node.avatar}
                          alt={`${node.network} logo`}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {node.network.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{node.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {node.network}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-muted-foreground" />
                          <span>45%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span>120GB</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span>99.9%</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Terminal className="mr-2 h-4 w-4" />
                            View Logs
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Node
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
