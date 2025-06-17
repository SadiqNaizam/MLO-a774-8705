import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChatListItemProps {
  id: string;
  avatarSrc?: string;
  avatarFallback: string;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isActive?: boolean;
  onClick?: (id: string) => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  avatarSrc,
  avatarFallback,
  name,
  lastMessage,
  timestamp,
  unreadCount,
  isActive,
  onClick,
}) => {
  console.log("Rendering ChatListItem for:", name);

  return (
    <button
      onClick={() => onClick?.(id)}
      className={cn(
        "w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors text-left",
        isActive && "bg-muted"
      )}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm truncate">{name}</h3>
          {timestamp && <span className="text-xs text-muted-foreground">{timestamp}</span>}
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <p className="text-xs text-muted-foreground truncate">{lastMessage || 'No messages yet'}</p>
          {unreadCount && unreadCount > 0 && (
            <Badge variant="default" className="h-5 px-1.5 text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatListItem;