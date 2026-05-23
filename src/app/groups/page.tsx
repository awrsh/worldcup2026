"use client";

import { useEffect, useState } from "react";
import type { Group, Standing } from "@/lib/api/types";
import { getWorldCupGroups, getWorldCupStandings } from "@/lib/api";
import { AppShell } from "@/components/layout/AppShell";
import { PageContent } from "@/components/layout/PageContent";
import { GroupCard } from "@/components/groups/GroupCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { useTranslation } from "@/i18n/I18nProvider";

export default function GroupsPage() {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<Group[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getWorldCupGroups(), getWorldCupStandings()]).then(([g, s]) => {
      setGroups(g);
      setStandings(s);
      setLoading(false);
    });
  }, []);

  return (
    <AppShell>
      <PageContent>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("groups.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("groups.subtitle")}</p>
        </div>

        {loading ? (
          <LoadingState rows={4} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} standings={standings} />
            ))}
          </div>
        )}
      </PageContent>
    </AppShell>
  );
}
