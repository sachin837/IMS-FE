import { Link, useRouterState } from "@tanstack/react-router";
import {
  Package, Layers, Truck, Users, Warehouse, Ruler, Palette,
  FileText, ShoppingCart, BarChart3, Settings, Gem, ChevronDown,
  Plus, ListChecks, Receipt, ShoppingBag,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

type NavChild = { title: string; url: string };
type NavItem = { title: string; url: string; icon: any; children?: NavChild[] };

const masters: NavItem[] = [
  {
    title: "Items", url: "/items", icon: Package,
    children: [
      { title: "All Items", url: "/items" },
      { title: "New Item", url: "/items/new" },
    ],
  },
  { title: "Categories", url: "/categories", icon: Layers },
  { title: "Colors & Finishes", url: "/colors", icon: Palette },
  { title: "Units", url: "/units", icon: Ruler },
  { title: "Suppliers", url: "/suppliers", icon: Truck },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Warehouses", url: "/warehouses", icon: Warehouse },
];

const ops: NavItem[] = [
  {
    title: "Sales", url: "/orders", icon: ShoppingCart,
    children: [
      { title: "Sales Orders", url: "/orders" },
      { title: "Quotes", url: "/orders" },
    ],
  },
  {
    title: "Purchase", url: "/orders", icon: ShoppingBag,
    children: [
      { title: "Purchase Orders", url: "/orders" },
      { title: "Receipts", url: "/orders" },
    ],
  },
  { title: "Invoices", url: "/invoices", icon: Receipt },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-marble-black [&>[data-sidebar=sidebar]]:bg-marble-black">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-md transition-transform hover:scale-105">
            <Gem className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold text-sidebar-foreground">MarbleHQ</span>
              <span className="text-[11px] text-sidebar-foreground/60">Inventory Suite</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <NavGroup label="Masters" items={masters} pathname={pathname} collapsed={collapsed} />
        <NavGroup label="Operations" items={ops} pathname={pathname} collapsed={collapsed} />

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="transition-colors hover:bg-sidebar-accent">
                  <Link to="/" className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    {!collapsed && <span className="text-sm">Settings</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function NavGroup({
  label, items, pathname, collapsed,
}: { label: string; items: NavItem[]; pathname: string; collapsed: boolean }) {
  return (
    <SidebarGroup>
      {!collapsed && (
        <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-sidebar-foreground/50">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavRow key={item.title} item={item} pathname={pathname} collapsed={collapsed} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function NavRow({ item, pathname, collapsed }: { item: NavItem; pathname: string; collapsed: boolean }) {
  const active = pathname.startsWith(item.url);
  const hasChildren = !!item.children?.length;

  /* COLLAPSED: hover popout with submenu (or just label) */
  if (collapsed) {
    return (
      <SidebarMenuItem>
        <HoverCard openDelay={80} closeDelay={120}>
          <HoverCardTrigger asChild>
            <SidebarMenuButton
              asChild
              isActive={active}
              className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground hover:bg-sidebar-accent transition-colors"
            >
              <Link to={item.url} className="flex items-center justify-center">
                <item.icon className="h-4 w-4" />
              </Link>
            </SidebarMenuButton>
          </HoverCardTrigger>
          <HoverCardContent
            side="right"
            align="start"
            sideOffset={10}
            className="w-56 border-sidebar-border bg-sidebar p-1.5 text-sidebar-foreground shadow-xl"
          >
            <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/60">
              {item.title}
            </div>
            <div className="flex flex-col gap-0.5">
              <Link
                to={item.url}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent",
                  active && "bg-sidebar-primary/20 text-sidebar-primary-foreground"
                )}
              >
                <item.icon className="h-3.5 w-3.5" /> Open {item.title}
              </Link>
              {hasChildren && (
                <>
                  <div className="my-1 h-px bg-sidebar-border" />
                  {item.children!.map((c) => (
                    <Link
                      key={c.title}
                      to={c.url}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    >
                      <span className="ml-5">{c.title}</span>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      </SidebarMenuItem>
    );
  }

  /* EXPANDED: collapsible parent with sub-items, or simple link */
  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={active}
          className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Link to={item.url} className="flex items-center gap-3">
            <item.icon className="h-4 w-4" />
            <span className="text-sm">{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible defaultOpen={active}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={active}
            className="group/parent w-full data-[active=true]:bg-sidebar-primary/15 data-[active=true]:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <item.icon className="h-4 w-4" />
            <span className="text-sm">{item.title}</span>
            <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-70 transition-transform group-data-[state=open]/parent:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children!.map((c, i) => {
              const childActive = pathname === c.url;
              return (
                <SidebarMenuSubItem key={`${c.title}-${i}`}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={childActive}
                    className="data-[active=true]:bg-sidebar-primary/20 data-[active=true]:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                  >
                    <Link to={c.url} className="flex items-center gap-2">
                      {c.title === "New Item" ? <Plus className="h-3 w-3" /> : <ListChecks className="h-3 w-3 opacity-60" />}
                      <span className="text-[13px]">{c.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
