import { createFileRoute } from "@tanstack/react-router";
import { MasterPlaceholder } from "@/components/master-placeholder";

export const Route = createFileRoute("/_app/suppliers")({
  head: () => ({ meta: [{ title: "Suppliers · MarbleHQ" }] }),
  component: () => <MasterPlaceholder title="Suppliers" description="Quarries, importers and processing partners." />,
});
