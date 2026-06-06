import { createFileRoute } from "@tanstack/react-router";
import { ItemForm } from "@/components/items/item-form";

export const Route = createFileRoute("/_workspace/items/new")({
  head: () => ({ meta: [{ title: "New Item · MarbleHQ" }] }),
  component: NewItemPage,
});

function NewItemPage() {
  return <ItemForm />;
}
