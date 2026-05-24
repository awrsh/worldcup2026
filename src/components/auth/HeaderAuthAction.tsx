"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginCard } from "@/components/auth/LoginCard";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useTranslation } from "@/i18n/I18nProvider";

interface HeaderAuthActionProps {
  isAuthenticated: boolean;
}

export function HeaderAuthAction({ isAuthenticated: serverAuthenticated }: HeaderAuthActionProps) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthSession(serverAuthenticated);

  if (isAuthenticated) {
    return (
      <Button asChild className="shadow-md shadow-primary/20">
        <Link href="/dashboard">{t("nav.dashboard")}</Link>
      </Button>
    );
  }

  return <LoginCard compact className="justify-end" />;
}
