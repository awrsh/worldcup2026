import { cn } from "@/lib/utils";
import type { Team } from "@/lib/api/types";
import { FlagAvatar } from "./FlagAvatar";

interface TeamBadgeProps {
  team?: Team;
  showFlag?: boolean;
  className?: string;
}

export function TeamBadge({ team, showFlag = true, className }: TeamBadgeProps) {
  if (!team) return <span className="text-muted-foreground">TBD</span>;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showFlag && <FlagAvatar code={team.flagCode} fallback={team.shortCode} size="sm" />}
      <span className="font-medium">{team.shortCode}</span>
    </div>
  );
}
