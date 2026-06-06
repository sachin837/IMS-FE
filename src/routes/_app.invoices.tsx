import { createFileRoute } from "@tanstack/react-router";
import { MasterPlaceholder } from "@/components/master-placeholder";

export const Route = createFileRoute("/_app/invoices")({
  component: () => <MasterPlaceholder title="Invoices" description="GST invoices and payment status." />,
});
