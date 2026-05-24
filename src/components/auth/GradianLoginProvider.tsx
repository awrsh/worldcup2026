"use client";

import Script from "next/script";
import { createContext, useCallback, useContext, type ReactNode } from "react";

const GRADIAN_LOGIN_SCRIPT = "https://app1.cinnagen.com/cdn/gradian-login-embed.min.js";

const GradianLoginContext = createContext<(() => void) | null>(null);

export function GradianLoginProvider({ children }: { children: ReactNode }) {
  const openLogin = useCallback(() => {
    document.getElementById("nx_btnPopup")?.click();
  }, []);

  return (
    <GradianLoginContext.Provider value={openLogin}>
      <button type="button" id="nx_btnPopup" className="sr-only" tabIndex={-1} aria-hidden />
      {children}
      <Script src={GRADIAN_LOGIN_SCRIPT} strategy="afterInteractive" />
    </GradianLoginContext.Provider>
  );
}

export function useGradianLogin() {
  const openLogin = useContext(GradianLoginContext);
  if (!openLogin) {
    throw new Error("useGradianLogin must be used within GradianLoginProvider");
  }
  return openLogin;
}
