import { SlidersHorizontal, Download, Plus, Settings2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { MarbleItem } from "@/lib/marble-data";
import type { ColDef } from "./columns";
import { renderCell } from "./columns";

const statusStyles: Record<MarbleItem["status"], string> = {
  "In Stock": "bg-success/15 text-success border-success/20",
  "Low Stock": "bg-warning/15 text-[oklch(0.45_0.14_75)] border-warning/30",
  "Reserved": "bg-primary/10 text-primary border-primary/20",
  "Out of Stock": "bg-destructive/10 text-destructive border-destructive/20",
};

const trackingStyles: Record<MarbleItem["trackingType"], string> = {
  SLAB_TRACKED: "bg-copper/10 text-copper border-copper/20",
  BOX_CONVERSION: "bg-accent text-accent-foreground border-accent",
  PIECE_BASED: "bg-muted text-foreground border-border",
};

type Props = {
  items: MarbleItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  compact: boolean;
  columns: ColDef[];
  onOpenColumnSettings: () => void;
};

export function ItemGrid({ items, selectedId, onSelect, compact, columns, onOpenColumnSettings }: Props) {
  const [tracking, setTracking] = useState<string>("ALL");
  const [status, setStatus] = useState<string>("ALL");
  const [colFilters, setColFilters] = useState<Record<string, string>>({});

  const activeCols = useMemo(
    () => columns.filter((c) => c.visible && (!compact || c.essential)),
    [columns, compact]
  );

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (tracking !== "ALL" && it.trackingType !== tracking) return false;
      if (status !== "ALL" && it.status !== status) return false;
      for (const [k, v] of Object.entries(colFilters)) {
        if (!v) continue;
        const cell = String(renderCell(it, k as ColDef["key"]) ?? "").toLowerCase();
        if (!cell.includes(v.toLowerCase())) return false;
      }
      return true;
    });
  }, [items, tracking, status, colFilters]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Slim action toolbar — no top search, only filters & actions */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card px-4 py-2.5">
        {!compact && (
          <>
            <Select value={tracking} onValueChange={setTracking}>
              <SelectTrigger className="h-9 w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All types</SelectItem>
                <SelectItem value="SLAB_TRACKED">Slab</SelectItem>
                <SelectItem value="BOX_CONVERSION">Tile / Box</SelectItem>
                <SelectItem value="PIECE_BASED">Piece</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-9 w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All status</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9 gap-1.5 transition-all hover:border-copper/40 hover:bg-copper/5">
              <SlidersHorizontal className="h-3.5 w-3.5" /> More
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1.5 transition-all hover:border-copper/40 hover:bg-copper/5">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 transition-all hover:border-copper/40 hover:bg-copper/5"
            onClick={onOpenColumnSettings}
            title="Column settings"
          >
            <Settings2 className="h-3.5 w-3.5" />
            {!compact && <span>Columns</span>}
          </Button>
          <Button asChild size="sm" className="h-9 gap-1.5 transition-all hover:shadow-md hover:-translate-y-px active:translate-y-0">
            <Link to="/items/new">
              <Plus className="h-3.5 w-3.5" /> New Item
            </Link>
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <colgroup>
            {activeCols.map((c) => (
              <col key={c.key} style={{ width: `${c.width}px` }} />
            ))}
          </colgroup>
          <thead className="sticky top-0 z-10 bg-muted/70 text-[11px] uppercase tracking-wide text-muted-foreground backdrop-blur">
            <tr>
              {activeCols.map((c) => (
                <th key={c.key} className={cn("px-3 pt-2.5 font-medium", c.align === "right" ? "text-right" : "text-left")}>
                  {c.label}
                </th>
              ))}
            </tr>
            {/* Per-column search row */}
            <tr className="border-b border-border bg-muted/40">
              {activeCols.map((c) => (
                <th key={c.key} className="px-2 pb-2 pt-1">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground/70" />
                    <Input
                      value={colFilters[c.key] ?? ""}
                      onChange={(e) => setColFilters((f) => ({ ...f, [c.key]: e.target.value }))}
                      placeholder="Filter…"
                      className="h-7 border-border/60 bg-background pl-6 text-xs placeholder:text-muted-foreground/60 focus-visible:border-copper/40"
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((it) => {
              const active = it.id === selectedId;
              return (
                <tr
                  key={it.id}
                  onClick={() => onSelect(it.id)}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-copper/[0.04]",
                    active && "bg-copper/[0.06] hover:bg-copper/[0.08]"
                  )}
                >
                  {activeCols.map((c) => (
                    <td key={c.key} className={cn("truncate px-3 py-3", c.align === "right" && "text-right tabular-nums")}>
                      {c.key === "name" ? (
                        <div className="flex items-center gap-3">
                          <div
                            className="h-9 w-9 shrink-0 rounded-md border border-border shadow-inner"
                            style={{ background: `linear-gradient(135deg, ${it.color}, color-mix(in oklab, ${it.color} 70%, #888))` }}
                          />
                          <div className="min-w-0">
                            <div className={cn("truncate font-medium", active && "text-copper")}>{it.name}</div>
                            <div className="truncate text-xs text-muted-foreground">{it.sku}</div>
                          </div>
                        </div>
                      ) : c.key === "status" ? (
                        <Badge variant="outline" className={cn("border text-[10.5px] font-medium", statusStyles[it.status])}>
                          {it.status}
                        </Badge>
                      ) : c.key === "trackingType" ? (
                        <Badge variant="outline" className={cn("border text-[10.5px] font-medium", trackingStyles[it.trackingType])}>
                          {renderCell(it, c.key)}
                        </Badge>
                      ) : c.key === "category" || c.key === "origin" || c.key === "size" || c.key === "warehouse" ? (
                        <span className="text-muted-foreground">{renderCell(it, c.key)}</span>
                      ) : (
                        renderCell(it, c.key)
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={activeCols.length} className="px-4 py-16 text-center text-sm text-muted-foreground">
                  No items match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-card px-4 py-2 text-xs text-muted-foreground">
        <span>Showing {filtered.length} of {items.length} items</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 px-2">Prev</Button>
          <span className="px-2">Page 1 / 1</span>
          <Button variant="ghost" size="sm" className="h-7 px-2">Next</Button>
        </div>
      </div>
    </div>
  );
}
