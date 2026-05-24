"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LoginCard } from "@/components/auth/LoginCard";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/I18nProvider";

interface FinalCTAProps {
  isAuthenticated?: boolean;
}

export function FinalCTA({ isAuthenticated = false }: FinalCTAProps) {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl"
      >
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-background to-accent/10 p-10 text-center">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-accent" />
            <h2 className="text-2xl font-bold text-foreground sm:text-4xl">{t("home.ctaTitle")}</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">{t("home.ctaDescription")}</p>
            <div className="mt-8 flex justify-center">
              {isAuthenticated ? (
                <Button asChild size="lg">
                  <Link href="/dashboard">{t("home.goToDashboard")}</Link>
                </Button>
              ) : (
                <LoginCard />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
