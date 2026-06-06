import { createFileRoute } from "@tanstack/react-router";
import { MasterPlaceholder } from "@/components/master-placeholder";

export const Route = createFileRoute("/_app/categories")({
  head: () => ({ meta: [{ title: "Categories · MarbleHQ" }] }),
  component: () => <MasterPlaceholder title="Categories" description="Marble, granite, quartz, onyx and sub-categories." />,
});
