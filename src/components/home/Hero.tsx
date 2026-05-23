"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/I18nProvider";

export function Hero() {
  const { t } = useTranslation();

  const stats = [
    { icon: Users, label: t("home.statTeams") },
    { icon: Calendar, label: t("home.statMatches") },
    { icon: MapPin, label: t("home.statHosts") },
  ];

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <Image
        src="/banner/banner.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="hero-gradient absolute inset-0" />
      <div className="football-pattern absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <Trophy className="h-4 w-4" />
              {t("home.heroBadge")}
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("home.heroTitle1")}
              <span className="mt-2 block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t("home.heroTitle2")}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t("home.heroDescription")}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25">
                <Link href="/dashboard">
                  {t("home.startPredicting")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 border-border/80 bg-background/40 backdrop-blur-sm">
                <Link href="/rules">{t("home.howScoringWorks")}</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-md">
              {stats.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border/60 bg-card/50 px-3 py-3 text-center backdrop-blur-sm"
                >
                  <Icon className="mx-auto mb-1 h-4 w-4 text-primary" />
                  <p className="text-xs font-semibold text-foreground sm:text-sm">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-primary/30 shadow-2xl shadow-primary/20 ring-1 ring-white/10">
              <Image
                src="/banner/banner2.png"
                alt={t("home.bannerCaption")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-6">
                <p className="text-sm font-medium text-foreground">{t("home.bannerCaption")}</p>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-accent/25 blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative mt-2 aspect-[16/10] overflow-hidden rounded-2xl border border-primary/30 shadow-xl lg:hidden"
          >
            <Image
              src="/banner/banner2.png"
              alt={t("home.bannerCaption")}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4">
              <p className="text-sm font-medium text-foreground">{t("home.bannerCaption")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
