import { useState } from "react";
import { GripVertical, Eye, EyeOff, RotateCcw } from "lucide-react";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { DEFAULT_COLUMNS, type ColDef } from "./columns";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  columns: ColDef[];
  onChange: (cols: ColDef[]) => void;
};

export function ColumnSettingsDrawer({ open, onOpenChange, columns, onChange }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const update = (i: number, patch: Partial<ColDef>) => {
    const next = columns.map((c, idx) => (idx === i ? { ...c, ...patch } : c));
    onChange(next);
  };

  const move = (from: number, to: number) => {
    if (from === to) return;
    const next = [...columns];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border bg-muted/30 px-5 py-4 text-left">
          <SheetTitle className="font-display text-lg">Column Settings</SheetTitle>
          <SheetDescription className="text-xs">
            Drag to reorder · toggle visibility · set width in pixels
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto px-3 py-3">
          <ul className="space-y-1">
            {columns.map((col, i) => {
              const isOver = overIndex === i && dragIndex !== null && dragIndex !== i;
              return (
                <li
                  key={col.key}
                  draggable
                  onDragStart={(e) => { setDragIndex(i); e.dataTransfer.effectAllowed = "move"; }}
                  onDragOver={(e) => { e.preventDefault(); setOverIndex(i); }}
                  onDragLeave={() => setOverIndex((v) => (v === i ? null : v))}
                  onDrop={(e) => { e.preventDefault(); if (dragIndex !== null) move(dragIndex, i); setDragIndex(null); setOverIndex(null); }}
                  onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
                  className={cn(
                    "group flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-2 transition",
                    isOver && "border-primary ring-1 ring-primary/40",
                    dragIndex === i && "opacity-50"
                  )}
                >
                  <button
                    type="button"
                    className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
                    aria-label="Drag to reorder"
                  >
                    <GripVertical className="h-4 w-4" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{col.label}</div>
                    <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{col.key}</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Input
                      type="number"
                      min={60}
                      max={500}
                      step={10}
                      value={col.width}
                      onChange={(e) => update(i, { width: Math.max(60, Number(e.target.value) || 60) })}
                      className="h-8 w-20 text-xs tabular-nums"
                    />
                    <span className="text-[10px] text-muted-foreground">px</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {col.visible ? (
                      <Eye className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <Switch
                      checked={col.visible}
                      onCheckedChange={(v) => update(i, { visible: v })}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <SheetFooter className="flex flex-row items-center justify-between gap-2 border-t border-border bg-muted/30 px-5 py-3 sm:justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={() => onChange(DEFAULT_COLUMNS)}
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset defaults
          </Button>
          <Button size="sm" onClick={() => onOpenChange(false)}>Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
