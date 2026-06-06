import { createFileRoute } from "@tanstack/react-router";
import { MasterPlaceholder } from "@/components/master-placeholder";

export const Route = createFileRoute("/_app/units")({
  head: () => ({ meta: [{ title: "Units · MarbleHQ" }] }),
  component: () => <MasterPlaceholder title="Units of Measurement" description="Sq.ft, sq.m, slabs, blocks and conversion factors." />,
});
