/// <reference types="node" />

function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Set it in .env.local (dev) or CI/CD (build/deploy).`
    );
  }
  return trimTrailingSlash(value);
}

/** Public app URL (browser). Resolved at call time — safe during `next build` prerender. */
export function getAppBaseUrl(): string {
  return requireEnv("NEXT_PUBLIC_APP_BASE_URL");
}

/** NestJS API origin. Resolved at call time — safe during `next build` prerender. */
export function getApiBaseUrl(): string {
  return requireEnv("NEXT_PUBLIC_API_URL");
}
