import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  initials: string;
  avatarUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export function UserAvatar({ name, initials, avatarUrl, className, fallbackClassName }: UserAvatarProps) {
  return (
    <Avatar className={cn("ring-1 ring-primary/40", className)}>
      {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
      <AvatarFallback className={cn("bg-primary text-xs text-primary-foreground", fallbackClassName)}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
