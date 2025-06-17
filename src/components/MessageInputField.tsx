import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Paperclip, Smile } from 'lucide-react'; // Smile for emoji picker icon

interface MessageInputFieldProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const MessageInputField: React.FC<MessageInputFieldProps> = ({
  onSendMessage,
  placeholder = "Type a message...",
  isLoading = false,
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  console.log("Rendering MessageInputField, current message:", message);

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message.trim());
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // Auto-resize textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`; // Max height ~5 lines
    }
  }, [message]);

  return (
    <div className="bg-background border-t p-3 sm:p-4 flex items-end gap-2">
       {/* Placeholder for Attachment Button */}
      {/* <Button variant="ghost" size="icon" className="flex-shrink-0" aria-label="Attach file" disabled={isLoading}>
        <Paperclip className="h-5 w-5" />
      </Button> */}
      {/* Placeholder for Emoji Button */}
      {/* <Button variant="ghost" size="icon" className="flex-shrink-0" aria-label="Add emoji" disabled={isLoading}>
        <Smile className="h-5 w-5" />
      </Button> */}
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 resize-none max-h-32 min-h-[40px] text-sm" // min-h for initial single line
        rows={1}
        disabled={isLoading}
      />
      <Button
        onClick={handleSend}
        size="icon"
        className="flex-shrink-0"
        aria-label="Send message"
        disabled={isLoading || message.trim() === ''}
      >
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MessageInputField;