import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarWithStatusProps {
  avatarSrc?: string;
  fallbackText: string;
  username: string;
  status?: 'online' | 'offline' | 'away';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatarWithStatus: React.FC<UserAvatarWithStatusProps> = ({
  avatarSrc,
  fallbackText,
  username,
  status,
  size = 'md',
  className,
}) => {
  console.log("Rendering UserAvatarWithStatus for:", username, "with status:", status);

  const avatarSizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const statusIndicatorSizeClasses = {
    sm: 'h-2 w-2 bottom-0 right-0',
    md: 'h-2.5 w-2.5 bottom-0.5 right-0.5',
    lg: 'h-3 w-3 bottom-1 right-1',
  };
  
  const statusColorClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <Avatar className={avatarSizeClasses[size]}>
        <AvatarImage src={avatarSrc} alt={username} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
      {status && (
        <span
          className={cn(
            "absolute rounded-full border-2 border-background",
            statusIndicatorSizeClasses[size],
            statusColorClasses[status]
          )}
          title={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      )}
    </div>
  );
};

export default UserAvatarWithStatus;