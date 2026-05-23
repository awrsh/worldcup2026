"use client";

import dynamic from "next/dynamic";
import { AppShell } from "@/components/layout/AppShell";
import { PageContent } from "@/components/layout/PageContent";
import { LoadingState } from "@/components/shared/LoadingState";
import { useTranslation } from "@/i18n/I18nProvider";

const KnockoutBracket = dynamic(
  () => import("@/components/bracket/KnockoutBracket").then((m) => m.KnockoutBracket),
  { ssr: false, loading: () => <LoadingState rows={4} /> }
);

export default function BracketPage() {
  const { t } = useTranslation();

  return (
    <AppShell>
      <PageContent>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("bracket.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("bracket.subtitle")}</p>
        </div>
        <KnockoutBracket />
      </PageContent>
    </AppShell>
  );
}
