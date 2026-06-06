import { createFileRoute } from "@tanstack/react-router";
import { MasterPlaceholder } from "@/components/master-placeholder";

export const Route = createFileRoute("/_app/colors")({
  head: () => ({ meta: [{ title: "Colors & Finishes · MarbleHQ" }] }),
  component: () => <MasterPlaceholder title="Colors & Finishes" description="Color shades, vein patterns and surface finishes." />,
});
