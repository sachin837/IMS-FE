import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { items } from "@/lib/marble-data";
import { ItemGrid } from "@/components/items/item-grid";
import { ItemDetail } from "@/components/items/item-detail";
import { ColumnSettingsDrawer } from "@/components/items/column-settings-drawer";
import { DEFAULT_COLUMNS, type ColDef } from "@/components/items/columns";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/items")({
  head: () => ({ meta: [{ title: "Items · MarbleHQ" }] }),
  component: ItemsPage,
});

function ItemsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [columns, setColumns] = useState<ColDef[]>(DEFAULT_COLUMNS);
  const [colsOpen, setColsOpen] = useState(false);
  const selected = items.find((i) => i.id === selectedId) ?? null;
  const split = !!selected;

  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      {/* Slim contextual strip — replaces the bulky heading */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-background/60 px-6 py-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold uppercase tracking-wider text-copper">Items</span>
          <span className="text-muted-foreground">· Slabs, tiles & pieces</span>
        </div>
        <div className="hidden items-center gap-5 text-xs md:flex">
          <Kpi label="SKUs" value="1,284" />
          <Kpi label="Slabs" value="3,412" />
          <Kpi label="Value" value="₹4.8 Cr" accent />
        </div>
      </div>

      {/* Split workspace */}
      <div className="flex h-[calc(100%-2.5rem)] min-h-0 w-full">
        <div
          className={cn(
            "min-h-0 border-r border-border bg-card transition-all duration-300 ease-out",
            split ? "w-[42%] min-w-[360px]" : "w-full"
          )}
        >
          <ItemGrid
            items={items}
            selectedId={selectedId}
            onSelect={setSelectedId}
            compact={split}
            columns={columns}
            onOpenColumnSettings={() => setColsOpen(true)}
          />
        </div>

        {split && selected && (
          <div className="min-h-0 flex-1 animate-in slide-in-from-right-4 fade-in duration-300">
            <ItemDetail item={selected} onClose={() => setSelectedId(null)} />
          </div>
        )}
      </div>

      <ColumnSettingsDrawer
        open={colsOpen}
        onOpenChange={setColsOpen}
        columns={columns}
        onChange={setColumns}
      />
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className={cn("font-display text-sm font-semibold tabular-nums", accent && "text-copper")}>{value}</span>
    </div>
  );
}
