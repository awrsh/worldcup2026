"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, Trophy } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

export function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    { icon: Target, titleKey: "home.step1Title", descKey: "home.step1Description" },
    { icon: TrendingUp, titleKey: "home.step2Title", descKey: "home.step2Description" },
    { icon: Trophy, titleKey: "home.step3Title", descKey: "home.step3Description" },
  ] as const;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t("home.howItWorksTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("home.howItWorksSubtitle")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, titleKey, descKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="glass-card h-full p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{t(titleKey)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
