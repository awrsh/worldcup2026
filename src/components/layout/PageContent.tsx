import { cn } from "@/lib/utils";

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

/** Consistent page width across all app routes */
export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={cn("mx-auto w-full max-w-full space-y-6", className)}>
      {children}
    </div>
  );
}
