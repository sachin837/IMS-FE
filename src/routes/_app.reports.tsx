import { createFileRoute } from "@tanstack/react-router";
import { MasterPlaceholder } from "@/components/master-placeholder";

export const Route = createFileRoute("/_app/reports")({
  component: () => <MasterPlaceholder title="Reports" description="Stock movement, valuation and sales reports." />,
});
