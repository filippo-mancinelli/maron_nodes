"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNodeStore } from "@/store/node-store";
import {
  MoreHorizontal,
  Play,
  Square,
  RotateCcw,
  Trash2,
  ExternalLink,
  Terminal,
} from "lucide-react";

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  syncing: {
    label: "Syncing",
    variant: "secondary" as const,
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  error: {
    label: "Error",
    variant: "destructive" as const,
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  stopped: {
    label: "Stopped",
    variant: "outline" as const,
    className: "bg-muted text-muted-foreground",
  },
};

export function NodesTable() {
  const nodes = useNodeStore((state) => state.nodes);

  if (nodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
          <Terminal className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No nodes deployed</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Deploy your first blockchain node to get started with Maron Nodes.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Node</TableHead>
          <TableHead>Network</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {nodes.map((node) => {
          const status =
            statusConfig[node.status as keyof typeof statusConfig] ||
            statusConfig.pending;
          return (
            <TableRow key={node.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 rounded-sm">
                    <AvatarImage src={node.avatar} alt={`${node.network} logo`} />
                    <AvatarFallback className="rounded-sm bg-primary/10 text-primary text-xs font-medium">
                      {node.network.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{node.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {node.id.slice(0, 8)}…
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm capitalize">{node.network}</span>
              </TableCell>
              <TableCell>
                <Badge variant={status.variant} className={status.className}>
                  {status.label}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
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
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
