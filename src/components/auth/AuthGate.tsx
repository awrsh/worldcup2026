import { getAuthUser } from "@/lib/auth/get-session";
import { AuthHydrator } from "@/components/auth/AuthHydrator";
import { LoginPrompt } from "@/components/auth/LoginPrompt";

export async function AuthGate({ children }: { children: React.ReactNode }) {
  const authUser = await getAuthUser("protected");

  if (!authUser) {
    return <LoginPrompt />;
  }

  return (
    <>
      <AuthHydrator authUser={authUser} />
      {children}
    </>
  );
}
