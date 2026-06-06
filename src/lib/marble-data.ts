export type TrackingType = "SLAB_TRACKED" | "BOX_CONVERSION" | "PIECE_BASED";

export type MarbleItem = {
  id: string;
  sku: string;
  name: string;
  category: string;
  origin: string;
  finish: string;
  thickness: string;
  size: string;
  slabs: number;
  area: number; // sq.ft or pcs (context dependent)
  rate: number; // INR
  warehouse: string;
  status: "In Stock" | "Low Stock" | "Reserved" | "Out of Stock";
  updatedAt: string;
  color: string;
  trackingType: TrackingType;
};

export const items: MarbleItem[] = [
  { id: "1", sku: "MRB-IT-1042", name: "Statuario Venato", category: "Natural Marble Slabs", origin: "Italy", finish: "Polished", thickness: "18mm", size: "320×160 cm", slabs: 24, area: 1840, rate: 1850, warehouse: "Kishangarh A", status: "In Stock", updatedAt: "2h ago", color: "#eef0ee", trackingType: "SLAB_TRACKED" },
  { id: "2", sku: "MRB-IT-1058", name: "Calacatta Gold", category: "Natural Marble Slabs", origin: "Italy", finish: "Polished", thickness: "20mm", size: "300×150 cm", slabs: 12, area: 870, rate: 2400, warehouse: "Kishangarh A", status: "Low Stock", updatedAt: "5h ago", color: "#f3eedf", trackingType: "SLAB_TRACKED" },
  { id: "3", sku: "GRN-IN-2210", name: "Black Galaxy", category: "Granite Blocks", origin: "Andhra Pradesh", finish: "Polished", thickness: "18mm", size: "280×170 cm", slabs: 56, area: 4120, rate: 480, warehouse: "Hyderabad B", status: "In Stock", updatedAt: "1d ago", color: "#161618", trackingType: "SLAB_TRACKED" },
  { id: "4", sku: "TIL-KJ-5501", name: "Kajaria Glazed Vitrified 600×600", category: "Ceramic & Vitrified Tiles", origin: "Gujarat", finish: "Glossy Glaze", thickness: "9mm", size: "60×60 cm", slabs: 320, area: 1152, rate: 58, warehouse: "Kishangarh A", status: "In Stock", updatedAt: "6h ago", color: "#e8e6df", trackingType: "BOX_CONVERSION" },
  { id: "5", sku: "TIL-SM-5520", name: "Somany Wood Plank 200×1200", category: "Ceramic & Vitrified Tiles", origin: "Rajasthan", finish: "Matt Satin", thickness: "10mm", size: "20×120 cm", slabs: 144, area: 410, rate: 82, warehouse: "Hyderabad B", status: "Low Stock", updatedAt: "2d ago", color: "#a98562", trackingType: "BOX_CONVERSION" },
  { id: "6", sku: "PCE-JQ-9101", name: "Jaquar Continental Pillar Cock", category: "Sanitaryware", origin: "Haryana", finish: "Chrome Plated", thickness: "—", size: "—", slabs: 48, area: 48, rate: 1450, warehouse: "Kishangarh A", status: "In Stock", updatedAt: "3h ago", color: "#c9cbce", trackingType: "PIECE_BASED" },
  { id: "7", sku: "PCE-CR-9220", name: "Cera Wall Hung Washbasin", category: "Sanitaryware", origin: "Gujarat", finish: "Glossy Glaze", thickness: "—", size: "55×42 cm", slabs: 14, area: 14, rate: 4280, warehouse: "Mumbai Port", status: "Reserved", updatedAt: "1d ago", color: "#ffffff", trackingType: "PIECE_BASED" },
  { id: "8", sku: "ONX-IR-3301", name: "Honey Onyx", category: "Natural Marble Slabs", origin: "Iran", finish: "Honed", thickness: "20mm", size: "260×140 cm", slabs: 6, area: 320, rate: 3200, warehouse: "Mumbai Port", status: "Reserved", updatedAt: "3d ago", color: "#d8a86a", trackingType: "SLAB_TRACKED" },
  { id: "9", sku: "MRB-IN-1190", name: "Makrana White", category: "Natural Marble Slabs", origin: "Rajasthan", finish: "Polished", thickness: "20mm", size: "280×150 cm", slabs: 72, area: 5230, rate: 380, warehouse: "Kishangarh A", status: "In Stock", updatedAt: "1h ago", color: "#f5f3ee", trackingType: "SLAB_TRACKED" },
  { id: "10", sku: "PCE-JQ-9145", name: "Jaquar Shower Head Rainjoy", category: "Hardware Fittings", origin: "Haryana", finish: "Chrome Plated", thickness: "—", size: "200 mm", slabs: 0, area: 0, rate: 3850, warehouse: "Mumbai Port", status: "Out of Stock", updatedAt: "1w ago", color: "#b9bcc0", trackingType: "PIECE_BASED" },
  { id: "11", sku: "TIL-KJ-5540", name: "Kajaria Marble Look 800×1600", category: "Ceramic & Vitrified Tiles", origin: "Gujarat", finish: "Glossy Glaze", thickness: "9mm", size: "80×160 cm", slabs: 96, area: 1228, rate: 145, warehouse: "Kishangarh A", status: "In Stock", updatedAt: "12h ago", color: "#ecebe6", trackingType: "BOX_CONVERSION" },
  { id: "12", sku: "MRB-ES-1077", name: "Crema Marfil", category: "Natural Marble Slabs", origin: "Spain", finish: "Polished", thickness: "18mm", size: "300×160 cm", slabs: 18, area: 1450, rate: 920, warehouse: "Kishangarh A", status: "In Stock", updatedAt: "9h ago", color: "#e8dcc4", trackingType: "SLAB_TRACKED" },
];

export const history = [
  { id: "h1", date: "04 Jun 2026", type: "Purchase", ref: "PO-2941", qty: "+12 slabs", user: "Anita S.", note: "Inward from Italy shipment" },
  { id: "h2", date: "02 Jun 2026", type: "Sale", ref: "SO-7712", qty: "-3 slabs", user: "Rohan K.", note: "Sold to Asha Builders" },
  { id: "h3", date: "30 May 2026", type: "Transfer", ref: "TR-188", qty: "0", user: "Vikas D.", note: "Moved to Kishangarh A" },
  { id: "h4", date: "27 May 2026", type: "Adjustment", ref: "ADJ-44", qty: "-1 slab", user: "Anita S.", note: "Damage in handling" },
  { id: "h5", date: "20 May 2026", type: "Sale", ref: "SO-7689", qty: "-5 slabs", user: "Rohan K.", note: "Sold to Trinity Interiors" },
];

export const documents = [
  { id: "d1", name: "Mill Certificate.pdf", size: "1.2 MB", date: "04 Jun 2026" },
  { id: "d2", name: "Slab Photo Front.jpg", size: "3.8 MB", date: "04 Jun 2026" },
  { id: "d3", name: "QC Inspection Report.pdf", size: "640 KB", date: "03 Jun 2026" },
  { id: "d4", name: "Shipping Invoice.pdf", size: "210 KB", date: "01 Jun 2026" },
];
