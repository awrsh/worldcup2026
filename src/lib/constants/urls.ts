function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Set it in .env.local (dev) or CI/CD (build/deploy).`
    );
  }
  return value.replace(/\/$/, "");
}

/** Public app URL (browser). Set via NEXT_PUBLIC_APP_BASE_URL. */
export const APP_BASE_URL = requireEnv("NEXT_PUBLIC_APP_BASE_URL");

/** NestJS API origin (predictions, etc.). Set via NEXT_PUBLIC_API_URL. */
export const API_BASE_URL = requireEnv("NEXT_PUBLIC_API_URL");
