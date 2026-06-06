import { createFileRoute } from "@tanstack/react-router";
import { MasterPlaceholder } from "@/components/master-placeholder";

export const Route = createFileRoute("/_app/warehouses")({
  head: () => ({ meta: [{ title: "Warehouses · MarbleHQ" }] }),
  component: () => <MasterPlaceholder title="Warehouses" description="Yards, branches and storage locations." />,
});
