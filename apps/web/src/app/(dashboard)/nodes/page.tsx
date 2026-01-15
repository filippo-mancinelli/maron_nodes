import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NodesPage() {
  return (
    <div className="flex-1 space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Nodes</h2>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Manage Your Nodes</CardTitle>
            <CardDescription>
              Here you can view, manage, and deploy new nodes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>A more detailed view of nodes will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
