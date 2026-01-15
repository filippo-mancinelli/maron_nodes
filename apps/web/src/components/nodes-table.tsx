"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { useNodeStore } from "@/store/node-store";
  
  export function NodesTable() {
    const nodes = useNodeStore((state) => state.nodes);

    return (
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Node</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {nodes.map((node) => (
                <TableRow key={node.id}>
                <TableCell>
                    <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={node.avatar} alt={`${node.network} logo`} />
                        <AvatarFallback>{node.network.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">{node.name}</p>
                        <p className="text-sm text-muted-foreground">{node.network}</p>
                    </div>
                    </div>
                </TableCell>
                <TableCell>
                    <Badge variant={node.status === "active" ? "outline" : "secondary"}>
                    {node.status}
                    </Badge>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    )
  }
  