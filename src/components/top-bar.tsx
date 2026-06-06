import { Bell, Search, HelpCircle, Plus, Globe, Check } from "lucide-react";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGS = [
  { code: "EN", label: "English", flag: "🇬🇧" },
  { code: "HI", label: "हिन्दी", flag: "🇮🇳" },
  { code: "GU", label: "ગુજરાતી", flag: "🇮🇳" },
  { code: "AR", label: "العربية", flag: "🇦🇪" },
  { code: "ZH", label: "中文", flag: "🇨🇳" },
];

export function TopBar() {
  const [lang, setLang] = useState(LANGS[0]);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger className="h-9 w-9" />

      <div className="relative hidden flex-1 max-w-xl md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search items, SKUs, orders, customers…"
          className="h-10 border-border bg-muted/40 pl-10 pr-20 focus-visible:bg-background"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button size="sm" className="hidden h-9 gap-1.5 transition-all hover:shadow-md hover:-translate-y-px active:translate-y-0 md:flex">
          <Plus className="h-4 w-4" /> Quick Add
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hidden h-9 gap-1.5 px-2.5 md:flex">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-semibold tabular-nums">{lang.code}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Language
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {LANGS.map((l) => (
              <DropdownMenuItem key={l.code} onClick={() => setLang(l)} className="flex items-center gap-2">
                <span className="text-base leading-none">{l.flag}</span>
                <span className="flex-1 text-sm">{l.label}</span>
                {l.code === lang.code && <Check className="h-3.5 w-3.5 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-9 w-9">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 justify-center rounded-full bg-destructive p-0 text-[10px]">
            3
          </Badge>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full pl-1 pr-2 outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">RK</AvatarFallback>
            </Avatar>
            <div className="hidden text-left leading-tight md:block">
              <div className="text-xs font-medium">Rohan Kapoor</div>
              <div className="text-[10px] text-muted-foreground">Admin · Jaipur HQ</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Branch Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
