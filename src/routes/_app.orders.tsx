import { createFileRoute } from "@tanstack/react-router";
import { MasterPlaceholder } from "@/components/master-placeholder";

export const Route = createFileRoute("/_app/orders")({
  component: () => <MasterPlaceholder title="Sales Orders" description="Open, confirmed and dispatched orders." />,
});
