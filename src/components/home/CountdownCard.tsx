"use client";

import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { useTranslation } from "@/i18n/I18nProvider";

const TOURNAMENT_START = "2026-06-11T16:00:00Z";

export function CountdownCard() {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-card p-8 text-center">
        <h2 className="text-sm font-medium uppercase tracking-wider text-accent">{t("home.countdownLabel")}</h2>
        <p className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{t("home.countdownTitle")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("home.countdownDate")}</p>
        <div className="mt-8 flex justify-center">
          <CountdownTimer targetDate={TOURNAMENT_START} />
        </div>
      </div>
    </motion.section>
  );
}
