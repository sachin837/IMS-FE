import { createFileRoute } from "@tanstack/react-router";
import { MasterPlaceholder } from "@/components/master-placeholder";

export const Route = createFileRoute("/_app/customers")({
  head: () => ({ meta: [{ title: "Customers · MarbleHQ" }] }),
  component: () => <MasterPlaceholder title="Customers" description="Builders, architects, retailers and walk-in clients." />,
});
