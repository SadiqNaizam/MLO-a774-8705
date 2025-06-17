import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // For displaying sender avatar

interface ChatMessageBubbleProps {
  message: string;
  timestamp?: string;
  isSender: boolean; // True if the current user sent the message
  senderName?: string; // Optional: for group chats or to show name
  senderAvatarSrc?: string; // Optional: avatar for the sender
  senderAvatarFallback?: string; // Optional: fallback for sender avatar
  showAvatar?: boolean; // Control visibility of avatar (e.g., only for first message in a sequence)
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  timestamp,
  isSender,
  senderName,
  senderAvatarSrc,
  senderAvatarFallback,
  showAvatar = true,
}) => {
  console.log(`Rendering ChatMessageBubble (isSender: ${isSender}):`, message);

  const bubbleAlignment = isSender ? 'items-end' : 'items-start';
  const bubbleColor = isSender ? 'bg-primary text-primary-foreground' : 'bg-muted';
  const avatarOrder = isSender ? 'order-last ml-2' : 'order-first mr-2';

  return (
    <div className={cn("flex flex-col w-full py-1", bubbleAlignment)}>
        <div className={cn("flex items-end max-w-[75%]", isSender ? "flex-row-reverse" : "flex-row")}>
            {showAvatar && senderAvatarFallback && (
                 <Avatar className={cn("h-7 w-7 self-end", avatarOrder, isSender ? "ml-2" : "mr-2")}>
                    <AvatarImage src={senderAvatarSrc} alt={senderName || 'User'} />
                    <AvatarFallback>{senderAvatarFallback}</AvatarFallback>
                </Avatar>
            )}
            <div
                className={cn(
                "px-3 py-2 rounded-xl",
                bubbleColor,
                isSender ? 'rounded-br-none' : 'rounded-bl-none'
                )}
            >
                {senderName && !isSender && <p className="text-xs font-medium mb-0.5">{senderName}</p>}
                <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
            </div>
      </div>
      {timestamp && (
        <p className={cn("text-xs text-muted-foreground mt-1", isSender ? 'text-right pr-1' : 'text-left pl-1', showAvatar && senderAvatarFallback ? (isSender ? 'mr-9' : 'ml-9') : '')}>
          {timestamp}
        </p>
      )}
    </div>
  );
};

export default ChatMessageBubble;