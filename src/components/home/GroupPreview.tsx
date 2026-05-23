"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MOCK_GROUPS } from "@/data/mock/groups";
import { getTeamById } from "@/data/mock/teams";
import { FlagAvatar } from "@/components/shared/FlagAvatar";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/I18nProvider";

const previewGroups = MOCK_GROUPS.slice(0, 4);

export function GroupPreview() {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t("home.groupStageTitle")}</h2>
          <p className="mt-1 text-muted-foreground">{t("home.groupStageSubtitle")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {previewGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="glass-card p-5">
                <h3 className="mb-4 text-center text-lg font-bold text-card-foreground">
                  {t("common.group", { id: group.id })}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {group.teamIds.map((teamId) => {
                    const team = getTeamById(teamId);
                    return (
                      <div key={teamId} title={team?.name} className="flex flex-col items-center gap-1">
                        <FlagAvatar code={team?.flagCode} fallback={team?.shortCode} size="sm" />
                        <span className="text-[10px] text-muted-foreground">{team?.shortCode}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/groups">{t("home.exploreGroups")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
