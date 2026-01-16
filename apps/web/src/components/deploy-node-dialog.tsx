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
import { Plus, Loader2 } from "lucide-react";

const availableNodes = [
  { id: "polygon", name: "Polygon", icon: "/icons/polygon.svg" },
  { id: "celo", name: "Celo", icon: "/icons/celo.svg" },
  { id: "avalanche", name: "Avalanche", icon: "/icons/avalanche.svg" },
  { id: "ethereum", name: "Ethereum", icon: "/icons/ethereum.svg" },
  { id: "arbitrum", name: "Arbitrum", icon: "/icons/arbitrum.svg" },
  { id: "optimism", name: "Optimism", icon: "/icons/optimism.svg" },
  { id: "base", name: "Base", icon: "/icons/base.svg" },
  { id: "solana", name: "Solana", icon: "/icons/solana.svg" },
];

const serverLocations = [
  { id: "eu-central", name: "EU Central (Frankfurt)" },
  { id: "eu-west", name: "EU West (Amsterdam)" },
  { id: "us-east", name: "US East (New York)" },
  { id: "us-west", name: "US West (Los Angeles)" },
  { id: "asia-east", name: "Asia East (Singapore)" },
];

export function DeployNodeDialog() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleDeploy = async () => {
    if (!selectedNode) return;

    setIsLoading(true);
    try {
      await axios.post("/api/v1/deployments", {
        userId: "user123",
        blockchainType: selectedNode,
        location: selectedLocation || "eu-central",
      });

      toast({
        title: "Deployment Started",
        description: `Your ${selectedNode} node is being deployed.`,
      });
      setIsOpen(false);
      setSelectedNode(null);
      setSelectedLocation(null);
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
        <Button className="w-full gradient-primary hover:opacity-90 transition-opacity">
          <Plus className="mr-2 h-4 w-4" />
          Deploy Node
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Deploy a New Node</DialogTitle>
          <DialogDescription>
            Select a blockchain network and server location to deploy your node.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="network">Blockchain Network</Label>
            <Select onValueChange={setSelectedNode} value={selectedNode || undefined}>
              <SelectTrigger id="network" className="h-12">
                <SelectValue placeholder="Select a network" />
              </SelectTrigger>
              <SelectContent>
                {availableNodes.map((node) => (
                  <SelectItem key={node.id} value={node.id} className="h-12">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {node.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{node.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Server Location</Label>
            <Select onValueChange={setSelectedLocation} value={selectedLocation || undefined}>
              <SelectTrigger id="location" className="h-12">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {serverLocations.map((location) => (
                  <SelectItem key={location.id} value={location.id} className="h-12">
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeploy}
            disabled={!selectedNode || isLoading}
            className="gradient-primary hover:opacity-90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deploying...
              </>
            ) : (
              "Deploy Node"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
