"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Trophy } from "lucide-react";
import { LoginCard } from "@/components/auth/LoginCard";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/I18nProvider";

export function LoginPrompt() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="text-xl" aria-hidden>
              ⚽
            </span>
            {t("nav.brand")}
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">{t("auth.backHome")}</Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-card to-accent/10 p-8 text-center shadow-xl shadow-primary/10 sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
                <Trophy className="h-7 w-7 text-primary" aria-hidden />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("auth.promptTitle")}</h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("auth.promptDescription")}
              </p>

              <div className="mt-8 flex flex-col items-center gap-4">
                <LoginCard />
                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="h-3.5 w-3.5 shrink-0 text-primary/80" aria-hidden />
                  {t("auth.secureSignIn")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
