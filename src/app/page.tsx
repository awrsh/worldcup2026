import { getAuthUser } from "@/lib/auth/get-session";
import { LandingPageClient } from "./LandingPageClient";

export default async function LandingPage() {
  const authUser = await getAuthUser("landing");

  return <LandingPageClient isAuthenticated={Boolean(authUser)} />;
}
