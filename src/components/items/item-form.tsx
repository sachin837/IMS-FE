import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  X, UploadCloud, Save, ScanLine, Info, AlertCircle, ArrowLeft, Loader2, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type Tracking = "PIECE_BASED" | "BOX_CONVERSION" | "SLAB_TRACKED";

const CATEGORIES = ["Sanitaryware", "Hardware Fittings", "Ceramic & Vitrified Tiles", "Natural Marble Slabs", "Granite Blocks"];
const BRANDS = ["Cera", "Jaquar", "Kajaria", "Somany", "Imported Stone"];
const MANUFACTURERS = ["Cera Sanitaryware Ltd.", "Jaquar Group", "Kajaria Ceramics", "Somany Ceramics", "Italmar Imports"];
const VENDORS = ["Northstar Trading", "Stone Bazaar Pvt Ltd", "Aarav Imports", "Metro Marble Hub"];

type Asset = { id: string; name: string; url: string; size: number };

export function ItemForm() {
  const navigate = useNavigate();
  const [tracking, setTracking] = useState<Tracking>("SLAB_TRACKED");
  const [piecesPerBox, setPiecesPerBox] = useState<number>(4);
  const [areaPerPiece, setAreaPerPiece] = useState<number>(3.875);
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [batchControl, setBatchControl] = useState(true);
  const [serialControl, setSerialControl] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [saving, setSaving] = useState(false);

  const calculatedBoxArea = useMemo(
    () => (piecesPerBox * areaPerPiece).toFixed(3),
    [piecesPerBox, areaPerPiece]
  );

  function onUpload(files: FileList | null) {
    if (!files) return;
    const next: Asset[] = Array.from(files).slice(0, 8 - assets.length).map((f) => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      url: URL.createObjectURL(f),
      size: f.size,
    }));
    setAssets((a) => [...a, ...next]);
  }

  function removeAsset(id: string) {
    setAssets((a) => a.filter((x) => x.id !== id));
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Item record saved", {
        description: "Product profile committed to the catalog.",
      });
      setTimeout(() => navigate({ to: "/items" }), 700);
    }, 1200);
  }

  return (
    <div className="flex h-screen min-h-0 w-full flex-col bg-muted/20">
      {/* Sticky Header — only Back + Title + X */}
      <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-card/95 px-3 py-2.5 backdrop-blur md:px-5">
        <SidebarTrigger className="h-9 w-9" />
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 border-border/70 transition-all hover:border-copper/50 hover:bg-copper/5 hover:text-copper hover:-translate-x-0.5"
        >
          <Link to="/items"><ArrowLeft className="h-4 w-4" /> Back</Link>
        </Button>
        <div className="ml-1 min-w-0">
          <h1 className="truncate font-display text-sm font-semibold leading-tight">
            Product Catalog Profile
          </h1>
          <p className="text-[10px] text-muted-foreground">Item Master · Draft</p>
        </div>

        <div className="ml-auto">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md border border-transparent text-muted-foreground transition-all hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
            aria-label="Close form"
          >
            <Link to="/items"><X className="h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl space-y-5 px-4 py-5 md:px-8 md:py-7">

          {/* SECTION 1 — Asset only (Tenant & Workspace removed) */}
          <Dropzone assets={assets} onUpload={onUpload} onRemove={removeAsset} />

          {/* SECTION 2 — Primary Identification */}
          <FormCard>
            <SectionMarker title="Primary Identification" />
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
              <Field className="md:col-span-12" label="Item Name" required>
                <Input placeholder="e.g., Premium Statuario Marble block template" />
              </Field>
              <Field className="md:col-span-4" label="SKU / Item Code">
                <Input placeholder="System generated or custom input string" />
              </Field>
              <Field className="md:col-span-4" label="Barcode">
                <div className="flex gap-1">
                  <Input placeholder="EAN-13 / Custom" />
                  <Button variant="outline" size="sm" className="h-10 gap-1.5 transition-all hover:border-copper/40 hover:bg-copper/5">
                    <ScanLine className="h-3.5 w-3.5" /> Scan
                  </Button>
                </div>
              </Field>
              <Field className="md:col-span-4" label="Status">
                <Select defaultValue="ACTIVE">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success" /> ACTIVE
                      </span>
                    </SelectItem>
                    <SelectItem value="INACTIVE">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground" /> INACTIVE
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </FormCard>

          {/* SECTION 3 — Classification */}
          <FormCard>
            <SectionMarker title="Classification & Anchor Masters" />
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-10">
              <Field className="md:col-span-2" label="Tracking Type" required>
                <Select value={tracking} onValueChange={(v) => setTracking(v as Tracking)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PIECE_BASED">PIECE_BASED</SelectItem>
                    <SelectItem value="BOX_CONVERSION">BOX_CONVERSION</SelectItem>
                    <SelectItem value="SLAB_TRACKED">SLAB_TRACKED</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field className="md:col-span-2" label="Item Category">
                <SimpleSelect placeholder="Select category" options={CATEGORIES} />
              </Field>
              <Field className="md:col-span-2" label="Brand">
                <SimpleSelect placeholder="Select brand" options={BRANDS} />
              </Field>
              <Field className="md:col-span-2" label="Manufacturer">
                <SimpleSelect placeholder="Select manufacturer" options={MANUFACTURERS} />
              </Field>
              <Field className="md:col-span-2" label="Preferred Vendor">
                <SimpleSelect placeholder="Select vendor" options={VENDORS} />
              </Field>
            </div>
          </FormCard>

          {/* SECTION 4 — Specifications, dynamic */}
          <FormCard>
            <div className="flex items-center justify-between">
              <SectionMarker title="Specifications & Packaging Metrics" />
              <span className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
                Variant: {tracking}
              </span>
            </div>

            {tracking === "PIECE_BASED" && (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-10">
                <Field className="md:col-span-2" label="Base UOM">
                  <Input value="Pcs" disabled className="bg-muted/50 font-medium" />
                </Field>
                <Field className="md:col-span-2" label="Purchase UOM">
                  <Select defaultValue="Pcs">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pcs">Pcs</SelectItem>
                      <SelectItem value="Set">Set</SelectItem>
                      <SelectItem value="Pair">Pair</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field className="md:col-span-2" label="Finish Type">
                  <SimpleSelect placeholder="Select" options={["Glossy Glaze", "Matt Satin", "Chrome Plated"]} />
                </Field>
                <Field className="md:col-span-2" label="Item Color">
                  <SimpleSelect placeholder="Select" options={["Alpine White", "Chrome Silver"]} />
                </Field>
                <Field className="md:col-span-2" label="Quality Grade">
                  <SimpleSelect placeholder="Select" options={["Premium Grade", "Commercial Choice"]} />
                </Field>
              </div>
            )}

            {tracking === "BOX_CONVERSION" && (
              <div className="mt-4 space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
                  <Field className="md:col-span-2" label="Base UOM">
                    <SimpleSelect placeholder="Select" options={["Pcs", "Sqft"]} defaultValue="Sqft" />
                  </Field>
                  <Field className="md:col-span-2" label="Purchase UOM">
                    <SimpleSelect placeholder="Select" options={["Box", "Pcs"]} defaultValue="Box" />
                  </Field>
                  <Field className="md:col-span-2" label="Finish Type">
                    <SimpleSelect placeholder="Select" options={["Glossy Glaze", "Matt Satin", "Chrome Plated"]} />
                  </Field>
                  <Field className="md:col-span-2" label="Item Color">
                    <SimpleSelect placeholder="Select" options={["Alpine White", "Chrome Silver"]} />
                  </Field>
                  <Field className="md:col-span-2" label="Quality Grade">
                    <SimpleSelect placeholder="Select" options={["Premium Grade", "Commercial Choice"]} />
                  </Field>
                </div>

                <SubGroup title="Box Packaging Math Model">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Field label="Pieces Per Box">
                      <Input type="number" step="1" value={piecesPerBox} onChange={(e) => setPiecesPerBox(Number(e.target.value) || 0)} />
                    </Field>
                    <Field label="Area Per Piece (sq.ft)">
                      <Input type="number" step="0.001" value={areaPerPiece} onChange={(e) => setAreaPerPiece(Number(e.target.value) || 0)} />
                    </Field>
                    <Field label="Calculated Total Box Area" helper="Auto-computed: Pieces × Area/Pc">
                      <Input value={calculatedBoxArea} disabled className="bg-muted/50 font-medium tabular-nums" />
                    </Field>
                  </div>
                </SubGroup>

                <SubGroup title="Physical Tile Dimensions">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Field label="Length (mm)"><Input type="number" placeholder="600" /></Field>
                    <Field label="Width (mm)"><Input type="number" placeholder="600" /></Field>
                    <Field label="Thickness / Height (mm)"><Input type="number" placeholder="9" /></Field>
                  </div>
                </SubGroup>
              </div>
            )}

            {tracking === "SLAB_TRACKED" && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
                  <Field className="md:col-span-2" label="Base UOM">
                    <Input value="Sqft" disabled className="bg-muted/50 font-medium" />
                  </Field>
                  <Field className="md:col-span-2" label="Purchase UOM">
                    <SimpleSelect placeholder="Select" options={["Sqft", "Sqm"]} defaultValue="Sqft" />
                  </Field>
                  <Field className="md:col-span-3" label="Slab Thickness">
                    <SimpleSelect placeholder="Select" options={["16.00 mm", "18.00 mm", "20.00 mm"]} />
                  </Field>
                  <Field className="md:col-span-3" label="Dimension Measurement Unit">
                    <SimpleSelect placeholder="Select" options={["Inch", "mm", "Feet", "CM"]} defaultValue="Inch" />
                  </Field>
                </div>

                <div className="flex items-start gap-3 rounded-md border border-copper/30 bg-copper/5 px-4 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                  <p className="text-xs leading-relaxed text-foreground/80">
                    <span className="font-semibold text-copper">Slab-tracked architecture</span> locks
                    base inventory logs to SQFT balances. Unique raw lengths, widths, and structural
                    piece IDs are inwarded block-by-block inside the <em>Block Entry Terminal</em>.
                  </p>
                </div>
              </div>
            )}
          </FormCard>

          {/* SECTION 5 — Financials & Control */}
          <FormCard>
            <SectionMarker title="Financial Matrices & Control Rules" />
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-10">
              <Field className="md:col-span-2" label="Purchase Rate">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                  <Input type="number" className="pl-7" placeholder="0.00" />
                </div>
              </Field>
              <Field className="md:col-span-2" label="Sales Rate">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                  <Input type="number" className="pl-7" placeholder="0.00" />
                </div>
              </Field>
              <Field className="md:col-span-3" label="HSN Code"><Input placeholder="e.g., 25151210" /></Field>
              <Field className="md:col-span-2" label="Tax Rate (%)">
                <SimpleSelect placeholder="Select" options={["0.00%", "5.00%", "12.00%", "18.00%", "28.00%"]} />
              </Field>
              <div className="flex items-end md:col-span-1">
                <label className="flex items-center gap-2 pb-2.5 text-xs">
                  <Checkbox checked={taxInclusive} onCheckedChange={(v) => setTaxInclusive(!!v)} />
                  <span>Tax incl.</span>
                </label>
              </div>
            </div>

            <SubGroup title="Inventory Control Options" className="mt-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-background p-3 transition-colors hover:border-copper/40">
                  <Checkbox checked={batchControl} onCheckedChange={(v) => setBatchControl(!!v)} className="mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Batch / Lot Control</div>
                    <p className="text-[11px] text-muted-foreground">Enforces shade/block bunch tracking on entry receipts.</p>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-background p-3 transition-colors hover:border-copper/40">
                  <Checkbox checked={serialControl} onCheckedChange={(v) => setSerialControl(!!v)} className="mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Serial Control</div>
                    <p className="text-[11px] text-muted-foreground">Enforces unique tracking codes per single entity warehouse unit.</p>
                  </div>
                </label>
              </div>
            </SubGroup>
          </FormCard>

          {/* SECTION 6 — Warehouse */}
          <FormCard>
            <SectionMarker title="Warehouse Tracking Balance Configurations" />
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <Field label="Minimum Stock Alert"><Input type="number" placeholder="0.000" /></Field>
              <Field label="Maximum Stock Cap"><Input type="number" placeholder="0.000" /></Field>
              <Field label="Reorder Trigger Level"><Input type="number" placeholder="0.000" /></Field>
              <Field label="Reorder Economic Qty (EOQ)"><Input type="number" placeholder="0.000" /></Field>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground">
              <Info className="h-3.5 w-3.5" />
              Values apply across all assigned warehouses unless overridden at the warehouse level.
            </div>
          </FormCard>

          {/* Bottom action bar — themed */}
          <div className="sticky bottom-0 -mx-4 mt-2 flex items-center justify-between gap-2 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
            <p className="text-xs text-muted-foreground">
              All required fields validated on save. Drafts auto-archive after 7 days.
            </p>
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-9 border-border/80 text-muted-foreground transition-all hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
              >
                <Link to="/items">Cancel</Link>
              </Button>
              <Button
                size="sm"
                disabled={saving}
                onClick={handleSave}
                className="h-9 gap-1.5 transition-all hover:shadow-md hover:-translate-y-px active:translate-y-0 disabled:opacity-90"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "Saving…" : "Save Item Record"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- helpers ------------------------- */

function FormCard({ children }: { children: React.ReactNode }) {
  return <section className="rounded-lg border border-border bg-card p-5 shadow-sm">{children}</section>;
}

function SectionMarker({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-4 w-0.5 rounded-full bg-copper" />
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</h2>
    </div>
  );
}

function Field({
  label, children, required, helper, className,
}: { label: string; children: React.ReactNode; required?: boolean; helper?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label className="text-xs font-medium text-foreground/80">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {children}
      {helper && <span className="text-[10.5px] text-muted-foreground">{helper}</span>}
    </div>
  );
}

function SimpleSelect({
  options, placeholder, defaultValue,
}: { options: string[]; placeholder?: string; defaultValue?: string }) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function SubGroup({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-md border border-dashed border-border bg-muted/20 p-4", className)}>
      <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  );
}

function Dropzone({
  assets, onUpload, onRemove,
}: { assets: Asset[]; onUpload: (f: FileList | null) => void; onRemove: (id: string) => void }) {
  return (
    <FormCard>
      <div className="flex items-center justify-between">
        <SectionMarker title="Product Asset Dropzone" />
        <span className="text-[10.5px] text-muted-foreground">{assets.length} / 8 assets attached</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {/* Image previews — one tile per image */}
        {assets.map((a) => (
          <div key={a.id} className="group relative aspect-square overflow-hidden rounded-md border border-border bg-muted/30">
            <img src={a.url} alt={a.name} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-1.5 py-1 text-[10px] text-white">
              {a.name}
            </div>
            <button
              type="button"
              onClick={() => onRemove(a.id)}
              className="absolute right-1 top-1 rounded-md bg-black/60 p-1 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
              aria-label="Remove"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}

        {/* Upload tile */}
        {assets.length < 8 && (
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-border bg-muted/20 px-2 text-center transition-colors hover:border-copper/50 hover:bg-copper/[0.04]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/10 text-copper">
              <UploadCloud className="h-4 w-4" />
            </div>
            <div className="text-[11px] font-medium">Add image</div>
            <p className="text-[10px] text-muted-foreground">PNG · JPG · WEBP</p>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => onUpload(e.target.files)}
            />
          </label>
        )}
      </div>
    </FormCard>
  );
}
