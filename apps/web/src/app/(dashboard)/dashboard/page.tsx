"use client";

import { useEffect } from "react";
import { DeployNodeDialog } from "@/components/deploy-node-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NodesTable } from "@/components/nodes-table";
import { useNodeStore } from "@/store/node-store";

export default function DashboardPage() {
  const fetchNodes = useNodeStore((state) => state.fetchNodes);

  useEffect(() => {
    // Hardcoded userId for now, similar to WebSocket in DashboardLayout
    fetchNodes("user123");
  }, [fetchNodes]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DeployNodeDialog />
        </div>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Nodes</CardTitle>
            <CardDescription>
              An overview of your deployed blockchain nodes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NodesTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
