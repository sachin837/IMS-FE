import type { MarbleItem } from "@/lib/marble-data";

export type ColKey =
  | "name" | "category" | "trackingType" | "origin"
  | "size" | "slabs" | "area" | "rate" | "warehouse" | "status";

export type ColDef = {
  key: ColKey;
  label: string;
  visible: boolean;
  width: number;
  align?: "left" | "right";
  essential?: boolean; // shown even in compact mode
};

export const DEFAULT_COLUMNS: ColDef[] = [
  { key: "name",         label: "Item",            visible: true, width: 280, align: "left",  essential: true },
  { key: "trackingType", label: "Tracking",        visible: true, width: 130, align: "left" },
  { key: "category",     label: "Category",        visible: true, width: 200, align: "left" },
  { key: "origin",       label: "Origin",          visible: true, width: 140, align: "left" },
  { key: "size",         label: "Size · Finish",   visible: true, width: 180, align: "left" },
  { key: "slabs",        label: "Qty",             visible: true, width: 80,  align: "right", essential: true },
  { key: "area",         label: "Area (sq.ft)",    visible: true, width: 120, align: "right" },
  { key: "rate",         label: "Rate ₹",          visible: true, width: 110, align: "right" },
  { key: "warehouse",    label: "Warehouse",       visible: false, width: 150, align: "left" },
  { key: "status",       label: "Status",          visible: true, width: 120, align: "left",  essential: true },
];

export function renderCell(item: MarbleItem, key: ColKey): React.ReactNode {
  switch (key) {
    case "name": return item.name;
    case "trackingType":
      return item.trackingType === "SLAB_TRACKED" ? "Slab"
        : item.trackingType === "BOX_CONVERSION" ? "Tile / Box"
        : "Piece";
    case "category": return item.category;
    case "origin": return item.origin;
    case "size": return `${item.size} · ${item.finish}`;
    case "slabs": return item.slabs.toLocaleString();
    case "area": return item.area.toLocaleString();
    case "rate": return `₹${item.rate.toLocaleString()}`;
    case "warehouse": return item.warehouse;
    case "status": return item.status;
  }
}
