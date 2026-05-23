"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Grid3X3,
  GitBranch,
  Trophy,
  Users,
  BookOpen,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import { useSidebarStore } from "@/lib/store/sidebar-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { href: "/groups", labelKey: "nav.groups", icon: Grid3X3 },
  { href: "/bracket", labelKey: "nav.bracket", icon: GitBranch },
  { href: "/leaderboard", labelKey: "nav.leaderboard", icon: Trophy },
  { href: "/teams", labelKey: "nav.teams", icon: Users },
  { href: "/rules", labelKey: "nav.rules", icon: BookOpen },
] as const;

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
  tooltipSide,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  collapsed: boolean;
  tooltipSide: "left" | "right";
}) {
  const link = (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-xl text-sm transition-colors",
        collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5",
        active
          ? "bg-sidebar-primary/20 text-sidebar-primary"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side={tooltipSide}>{label}</TooltipContent>
    </Tooltip>
  );
}

export function SidebarNav() {
  const pathname = usePathname();
  const { t, dir } = useTranslation();
  const collapsed = useSidebarStore((s) => s.collapsed);
  const toggle = useSidebarStore((s) => s.toggle);
  const tooltipSide = dir === "rtl" ? "left" : "right";

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-sidebar-border bg-sidebar backdrop-blur-xl transition-[width] duration-300 ease-in-out lg:flex",
          "border-e",
          collapsed ? "w-[4.5rem]" : "w-64"
        )}
      >
        <div className="flex h-16 items-center border-b border-sidebar-border px-3">
          <Link
            href="/"
            className={cn(
              "flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-sidebar-foreground",
              collapsed && "justify-center"
            )}
          >
            <span className="shrink-0 text-2xl">⚽</span>
            {!collapsed && <span className="truncate font-bold">{t("nav.brand")}</span>}
          </Link>
          {!collapsed && (
            <button
              type="button"
              onClick={toggle}
              className="ml-1 rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              aria-label={t("sidebar.collapse")}
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <div className="flex justify-center border-b border-sidebar-border py-2">
            <button
              type="button"
              onClick={toggle}
              className="rounded-lg p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              aria-label={t("sidebar.expand")}
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          </div>
        )}

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-3">
          <SidebarLink
            href="/"
            label={t("nav.home")}
            icon={Home}
            active={pathname === "/"}
            collapsed={collapsed}
            tooltipSide={tooltipSide}
          />
          {navItems.map(({ href, labelKey, icon }) => (
            <SidebarLink
              key={href}
              href={href}
              label={t(labelKey)}
              icon={icon}
              active={pathname === href || pathname.startsWith(href + "/")}
              collapsed={collapsed}
              tooltipSide={tooltipSide}
            />
          ))}
        </nav>

       
      </aside>
    </TooltipProvider>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const mobileItems = navItems.slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t !pb-0 border-sidebar-border bg-sidebar/95 backdrop-blur-xl lg:hidden pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileItems.map(({ href, labelKey, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-xs transition-colors",
              pathname === href || pathname.startsWith(href + "/")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{t(labelKey)}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
