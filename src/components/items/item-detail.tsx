import {
  X, Pencil, Save, ShoppingCart, FileText, ArrowRightLeft, Copy, Printer,
  MoreHorizontal, MapPin, Calendar, User, Package, Ruler, Layers,
  Boxes, Hash, Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { history, documents, type MarbleItem } from "@/lib/marble-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<MarbleItem["status"], string> = {
  "In Stock": "bg-success/15 text-success border-success/20",
  "Low Stock": "bg-warning/15 text-[oklch(0.45_0.14_75)] border-warning/30",
  "Reserved": "bg-primary/10 text-primary border-primary/20",
  "Out of Stock": "bg-destructive/10 text-destructive border-destructive/20",
};

const typeStyles: Record<string, string> = {
  Purchase: "bg-success/10 text-success",
  Sale: "bg-primary/10 text-primary",
  Transfer: "bg-accent text-accent-foreground",
  Adjustment: "bg-warning/15 text-[oklch(0.45_0.14_75)]",
};

const trackingLabel: Record<MarbleItem["trackingType"], string> = {
  SLAB_TRACKED: "Slab Tracked",
  BOX_CONVERSION: "Box / Tile",
  PIECE_BASED: "Piece Based",
};

export function ItemDetail({ item, onClose }: { item: MarbleItem; onClose: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      {/* Compact header — name + sku + status, action cluster aligned right with X */}
      <div className="border-b border-border bg-card px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate font-display text-base font-semibold leading-tight">{item.name}</h2>
              <span className="text-[11px] tabular-nums text-muted-foreground">{item.sku}</span>
              <Badge variant="outline" className={cn("h-5 border text-[10px]", statusStyles[item.status])}>
                {item.status}
              </Badge>
            </div>
          </div>

          {/* Action cluster: Edit, Save, …, X */}
          <div className="flex shrink-0 items-center gap-1">
            <Button size="sm" className="h-8 gap-1 px-2.5 text-xs transition-all hover:shadow-sm hover:-translate-y-px">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1 px-2.5 text-xs transition-all hover:border-copper/40 hover:bg-copper/5">
              <Save className="h-3.5 w-3.5" /> Save
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><Copy className="mr-2 h-4 w-4" /> Duplicate</DropdownMenuItem>
                <DropdownMenuItem><Printer className="mr-2 h-4 w-4" /> Print label</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md border border-transparent text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
              onClick={onClose}
              aria-label="Close detail"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick actions — tight, single row */}
        <div className="mt-2 flex flex-wrap items-center gap-1">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Quick</span>
          <QuickBtn icon={ShoppingCart}>Order</QuickBtn>
          <QuickBtn icon={FileText}>Quote</QuickBtn>
          <QuickBtn icon={ArrowRightLeft}>Transfer</QuickBtn>
          <QuickBtn icon={Boxes}>Adjust</QuickBtn>
          <QuickBtn icon={Printer}>Label</QuickBtn>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="flex min-h-0 flex-1 flex-col">
        <TabsList className="m-3 mb-0 h-9 w-fit gap-1 border border-border bg-muted/40 p-1">
          <ThemedTab value="overview">Overview</ThemedTab>
          <ThemedTab value="history">History</ThemedTab>
          <ThemedTab value="documents">Documents</ThemedTab>
          <ThemedTab value="pricing">Pricing</ThemedTab>
        </TabsList>

        <div className="min-h-0 flex-1 overflow-auto">
          <TabsContent value="overview" className="m-0 space-y-4 p-4">
            {/* Tracking type ribbon */}
            <div className="flex items-center justify-between rounded-md border border-copper/20 bg-copper/5 px-3 py-2">
              <div className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-copper" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-copper">
                  {trackingLabel[item.trackingType]}
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">Updated {item.updatedAt}</span>
            </div>

            <Section title="Stock summary">
              <StockSummary item={item} />
            </Section>

            <Section title="Specifications">
              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
                <Field icon={Layers} label="Category" value={item.category} />
                <Field icon={Package} label="Finish" value={item.finish} />
                <Field icon={Ruler} label="Size" value={`${item.size} · ${item.thickness}`} />
                <Field icon={MapPin} label="Origin" value={item.origin} />
                <Field icon={MapPin} label="Warehouse" value={item.warehouse} />
                <Field icon={Calendar} label="Last updated" value={item.updatedAt} />
              </dl>
            </Section>
          </TabsContent>

          <TabsContent value="history" className="m-0 p-4">
            <ol className="relative space-y-4 border-l border-border pl-5">
              {history.map((h) => (
                <li key={h.id} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-copper" />
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={cn("h-5 border-0 text-[10.5px]", typeStyles[h.type])}>{h.type}</Badge>
                    <span className="text-sm font-medium">{h.ref}</span>
                    <span className="text-sm tabular-nums text-muted-foreground">{h.qty}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{h.date}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <User className="mr-1 inline h-3 w-3" /> {h.user} · {h.note}
                  </p>
                </li>
              ))}
            </ol>
          </TabsContent>

          <TabsContent value="documents" className="m-0 p-4">
            <ul className="divide-y divide-border rounded-md border border-border bg-card">
              {documents.map((d) => (
                <li key={d.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-copper/10 text-copper">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.size} · uploaded {d.date}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">View</Button>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="pricing" className="m-0 p-4">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr><th className="py-2 text-left font-medium">Tier</th><th className="py-2 text-right font-medium">Rate</th><th className="py-2 text-right font-medium">Min qty</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { t: "Retail", r: item.rate, q: "1 unit" },
                  { t: "Trade", r: Math.round(item.rate * 0.92), q: "500 units" },
                  { t: "Builder", r: Math.round(item.rate * 0.85), q: "2,000 units" },
                ].map((p) => (
                  <tr key={p.t}>
                    <td className="py-2.5">{p.t}</td>
                    <td className="py-2.5 text-right tabular-nums font-medium">₹{p.r.toLocaleString()}</td>
                    <td className="py-2.5 text-right tabular-nums text-muted-foreground">{p.q}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function StockSummary({ item }: { item: MarbleItem }) {
  if (item.trackingType === "SLAB_TRACKED") {
    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Stat icon={Layers} label="Slabs available" value={item.slabs.toLocaleString()} />
        <Stat icon={Ruler} label="Total area" value={`${item.area.toLocaleString()} sq.ft`} />
        <Stat icon={Hash} label="Rate" value={`₹${item.rate.toLocaleString()}/sq.ft`} />
        <Stat icon={Boxes} label="Inventory value" value={`₹${(item.area * item.rate).toLocaleString()}`} highlight />
      </div>
    );
  }
  if (item.trackingType === "BOX_CONVERSION") {
    const boxes = Math.max(1, Math.round(item.slabs / 4));
    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Stat icon={Boxes} label="Boxes available" value={boxes.toLocaleString()} />
        <Stat icon={Package} label="Total pieces" value={item.slabs.toLocaleString()} />
        <Stat icon={Ruler} label="Coverage" value={`${item.area.toLocaleString()} sq.ft`} />
        <Stat icon={Hash} label="Rate / sq.ft" value={`₹${item.rate.toLocaleString()}`} highlight />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      <Stat icon={Package} label="Pieces on hand" value={item.slabs.toLocaleString()} />
      <Stat icon={Hash} label="Rate / piece" value={`₹${item.rate.toLocaleString()}`} />
      <Stat icon={Boxes} label="Stock value" value={`₹${(item.slabs * item.rate).toLocaleString()}`} highlight />
    </div>
  );
}

function QuickBtn({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="h-7 gap-1 px-2 text-[11px] font-medium transition-all hover:border-copper/40 hover:bg-copper/10 hover:text-copper hover:-translate-y-px"
    >
      <Icon className="h-3 w-3" /> {children}
    </Button>
  );
}

function ThemedTab({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <TabsTrigger
      value={value}
      className="h-7 rounded-md px-3 text-xs font-medium transition-all data-[state=active]:bg-copper data-[state=active]:text-copper-foreground data-[state=active]:shadow-sm"
    >
      {children}
    </TabsTrigger>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </section>
  );
}

function Stat({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-2.5", highlight && "border-copper/30 bg-copper/5")}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className={cn("mt-0.5 font-display text-base font-semibold tabular-nums", highlight && "text-copper")}>{value}</div>
    </div>
  );
}

function Field({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div>
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="text-sm font-medium">{value}</dd>
      </div>
    </div>
  );
}
