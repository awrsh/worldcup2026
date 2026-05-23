"use client";

import { useEffect, useState } from "react";
import type { Team } from "@/lib/api/types";
import { getWorldCupTeams } from "@/lib/api";
import { AppShell } from "@/components/layout/AppShell";
import { PageContent } from "@/components/layout/PageContent";
import { TeamCard } from "@/components/teams/TeamCard";
import { TeamDetailsModal } from "@/components/teams/TeamDetailsModal";
import { LoadingState } from "@/components/shared/LoadingState";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { GROUP_IDS } from "@/data/mock/teams";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/i18n/I18nProvider";

export default function TeamsPage() {
  const { t } = useTranslation();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Team | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getWorldCupTeams().then((data) => {
      setTeams(data);
      setLoading(false);
    });
  }, []);

  const filtered = teams.filter((team) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q || team.name.toLowerCase().includes(q) || team.shortCode.toLowerCase().includes(q);
    const matchesGroup = groupFilter === "all" || team.groupId === groupFilter;
    return matchesSearch && matchesGroup;
  });

  const handleSelect = (team: Team) => {
    setSelected(team);
    setModalOpen(true);
  };

  return (
    <AppShell>
      <PageContent>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("teams.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("teams.subtitle")}</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("teams.searchPlaceholder")}
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Tabs value={groupFilter} onValueChange={setGroupFilter}>
          <TabsList className="flex h-auto flex-wrap gap-1">
            <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
            {GROUP_IDS.map((g) => (
              <TabsTrigger key={g} value={g}>
                {g}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <LoadingState rows={6} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((team) => (
              <TeamCard key={team.id} team={team} onSelect={handleSelect} />
            ))}
          </div>
        )}

        <TeamDetailsModal team={selected} open={modalOpen} onOpenChange={setModalOpen} />
      </PageContent>
    </AppShell>
  );
}
