"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Trophy, Users, Calendar, MapPin } from "lucide-react";
import { LoginCard } from "@/components/auth/LoginCard";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/I18nProvider";
import { AnimatedItem, MagneticButton } from "@/components/animations";
import { fadeUp, staggerContainer, transition, floatIdle } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function StaggerWords({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function ParallaxBanner({ alt, caption }: { alt: string; caption: string }) {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ ...transition.cinematic, delay: 0.2 }}
      className="relative hidden lg:block"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
        variants={floatIdle}
        animate="animate"
        className="relative"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 shadow-2xl ring-1 ring-white/5">
          <Image src="/banner/banner2.png" alt={alt} fill className="object-fill " sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0  " />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-sm font-medium text-foreground">{caption}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface HeroProps {
  isAuthenticated?: boolean;
}

export function Hero({ isAuthenticated = false }: HeroProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const stats = [
    { icon: Users, label: t("home.statTeams") },
    { icon: Calendar, label: t("home.statMatches") },
    { icon: MapPin, label: t("home.statHosts") },
  ];

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-background">
       

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            transition={transition.cinematic}
            className="rounded-3xl border border-border/50 bg-background/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:bg-background/80"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, ...transition.premium }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              <motion.span
                animate={reduced ? undefined : { rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Trophy className="h-4 w-4" />
              </motion.span>
              {t("home.heroBadge")}
            </motion.div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              <StaggerWords text={t("home.heroTitle1")} />
              <span className="mt-2 block text-primary">
                <StaggerWords text={t("home.heroTitle2")} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, ...transition.premium }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {t("home.heroDescription")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, ...transition.premium }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {isAuthenticated ? (
                <MagneticButton
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                >
                  {t("home.startPredicting")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
              ) : (
                <LoginCard className="justify-start" />
              )}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 border-border bg-background/60 backdrop-blur-sm"
              >
                <Link href="/rules">{t("home.howScoringWorks")}</Link>
              </Button>
            </motion.div>

            <motion.div variants={staggerContainer(0.08, 0.65)} className="mt-8 grid grid-cols-3 gap-2 sm:max-w-md sm:gap-3">
              {stats.map(({ icon: Icon, label }) => (
                <AnimatedItem
                  key={label}
                  className="rounded-xl border border-border/50 bg-card/80 px-2 py-3 text-center sm:px-3"
                >
                  <Icon className="mx-auto mb-1 h-4 w-4 text-primary" />
                  <p className="text-[11px] font-semibold text-foreground sm:text-xs">{label}</p>
                </AnimatedItem>
              ))}
            </motion.div>
          </motion.div>

          <ParallaxBanner alt={t("home.bannerCaption")} caption={t("home.bannerCaption")} />
        </motion.div>
      </div>
    </section>
  );
}
