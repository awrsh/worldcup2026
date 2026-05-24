import { AuthGate } from "@/components/auth/AuthGate";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AuthGate>{children}</AuthGate>;
}
