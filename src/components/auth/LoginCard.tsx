"use client";

import { LogIn } from "lucide-react";
import { useGradianLogin } from "@/components/auth/GradianLoginProvider";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

interface LoginCardProps {
  className?: string;
  compact?: boolean;
}

export function LoginCard({ className, compact = false }: LoginCardProps) {
  const { t } = useTranslation();
  const openLogin = useGradianLogin();

  return (
    <div className={cn("flex justify-center", className)}>
      <Button
        type="button"
        size={compact ? "default" : "lg"}
        onClick={openLogin}
        className={cn(
          "relative overflow-hidden shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-[0.98]",
          !compact && "min-w-[220px] px-8"
        )}
      >
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/0 via-white/15 to-primary/0 opacity-0 transition-opacity hover:opacity-100"
          aria-hidden
        />
        <LogIn className="h-5 w-5 shrink-0" aria-hidden />
        <span>{t("auth.signIn")}</span>
      </Button>
    </div>
  );
}
