"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const availableNodes = [
  { id: "polygon", name: "Polygon" },
  { id: "celo", name: "Celo" },
  { id: "avalanche", name: "Avalanche" },
  { id: "ethereum", name: "Ethereum" },
];

export function DeployNodeDialog() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleDeploy = async () => {
    if (!selectedNode) return;

    setIsLoading(true);
    try {
      await axios.post("/api/v1/deployments", {
        userId: "user123", // Hardcoded for now
        blockchainType: selectedNode,
      });

      toast({
        title: "Deployment Started",
        description: `Your ${selectedNode} node is being deployed.`,
      });
      setIsOpen(false); // Close the dialog
    } catch (error) {
      toast({
        title: "Deployment Failed",
        description: "Could not start the deployment process.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Deploy Node</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deploy a New Node</DialogTitle>
          <DialogDescription>
            Select a blockchain network to deploy your new node.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="network" className="text-right">
              Network
            </Label>
            <Select onValueChange={setSelectedNode}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a network" />
              </SelectTrigger>
              <SelectContent>
                {availableNodes.map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleDeploy} disabled={!selectedNode || isLoading}>
            {isLoading ? "Deploying..." : "Deploy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
