"use client";

import { SidebarNav, MobileNav } from "./SidebarNav";
import { StickyTournamentHeader } from "./StickyTournamentHeader";
import { PageTransition } from "@/components/animations";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <StickyTournamentHeader />
        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 pb-20 lg:px-8 lg:pb-0">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
