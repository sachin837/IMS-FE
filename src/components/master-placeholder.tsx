import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function MasterPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="h-full overflow-auto p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Construction className="h-5 w-5" />
          </div>
          <h3 className="font-medium">Master coming up next</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            This master will use the same split grid + detail pattern as the Items master.
            Open <strong>Items</strong> from the sidebar to preview the interaction.
          </p>
          <Button variant="outline" size="sm" className="mt-2">Configure fields</Button>
        </Card>
      </div>
    </div>
  );
}
