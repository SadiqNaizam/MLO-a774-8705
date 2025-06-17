import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import UserAvatarWithStatus from '@/components/UserAvatarWithStatus';
import ChatMessageBubble from '@/components/ChatMessageBubble';
import MessageInputField from '@/components/MessageInputField';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { Phone, Video, Info, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'me' | 'other';
  senderName?: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

const mockChatMessages: Record<string, Message[]> = {
  '1': [
    { id: 'm1', text: 'Hey Alice, how are you?', sender: 'other', timestamp: '10:25 AM', senderName: 'Bob Johnson', avatarSrc: 'https://source.unsplash.com/random/32x32?face&sig=2', avatarFallback: 'BJ' },
    { id: 'm2', text: 'I am good, Bob! Thanks for asking.', sender: 'me', timestamp: '10:26 AM' },
    { id: 'm3', text: 'What about you?', sender: 'me', timestamp: '10:26 AM' },
    { id: 'm4', text: "Doing great! Just working on the new project. It's quite challenging.", sender: 'other', timestamp: '10:28 AM', senderName: 'Bob Johnson', avatarSrc: 'https://source.unsplash.com/random/32x32?face&sig=2', avatarFallback: 'BJ' },
    { id: 'm5', text: "Oh, I can imagine! Let me know if you need any help.", sender: 'me', timestamp: '10:30 AM' },
  ],
  '2': [
    { id: 'm6', text: 'Hey Bob!', sender: 'me', timestamp: 'Yesterday 09:15 PM' },
    { id: 'm7', text: 'Did you get the files I sent?', sender: 'me', timestamp: 'Yesterday 09:15 PM' },
    { id: 'm8', text: 'Yes, I did. Thanks!', sender: 'other', timestamp: 'Yesterday 09:20 PM', senderName: 'Bob Johnson', avatarSrc: 'https://source.unsplash.com/random/32x32?face&sig=2', avatarFallback: 'BJ' },
    { id: 'm9', text: 'Sounds good! See you then.', sender: 'other', timestamp: 'Yesterday 09:21 PM', senderName: 'Bob Johnson', avatarSrc: 'https://source.unsplash.com/random/32x32?face&sig=2', avatarFallback: 'BJ' },
  ],
   '3': [
    { id: 'm10', text: 'Alice: Are we still on for Friday?', sender: 'other', timestamp: 'Mon 02:30 PM', senderName: 'Alice Doe', avatarSrc: 'https://source.unsplash.com/random/32x32?face&sig=1', avatarFallback: 'AD' },
    { id: 'm11', text: 'Bob: Yep, I am!', sender: 'other', timestamp: 'Mon 02:31 PM', senderName: 'Bob Johnson', avatarSrc: 'https://source.unsplash.com/random/32x32?face&sig=2', avatarFallback: 'BJ' },
     { id: 'm12', text: "Great, I'll be there!", sender: 'me', timestamp: 'Mon 02:32 PM' },
  ],
   '4': [
    { id: 'm13', text: 'Check out this photo I took!', sender: 'other', timestamp: 'Sun 11:00 AM', senderName: 'Diana Smith', avatarSrc: 'https://source.unsplash.com/random/32x32?face&sig=4', avatarFallback: 'DS' },
    { id: 'm14', text: 'Wow, amazing!', sender: 'me', timestamp: 'Sun 11:01 AM' },
  ]
};

const mockChatPartners: Record<string, { name: string, avatarSrc?: string, avatarFallback: string, status?: 'online' | 'offline' | 'away' }> = {
  '1': { name: 'Alice Doe', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=1', avatarFallback: 'AD', status: 'online' },
  '2': { name: 'Bob Johnson', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=2', avatarFallback: 'BJ', status: 'away' },
  '3': { name: 'Charlie Green (Group)', avatarFallback: 'CG', status: 'online' },
  '4': { name: 'Diana Smith', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=4', avatarFallback: 'DS', status: 'offline' },
};


const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatPartner, setChatPartner] = useState(mockChatPartners[chatId || '']);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(`ChatPage loaded for chatId: ${chatId}`);
    if (chatId && mockChatMessages[chatId]) {
      setMessages(mockChatMessages[chatId]);
      setChatPartner(mockChatPartners[chatId]);
    } else {
      // Handle invalid or missing chatId, perhaps navigate to a not-found or error page
      console.warn(`Chat with id ${chatId} not found.`);
      // navigate('/404'); // or navigate back
    }
  }, [chatId, navigate]);

  useEffect(() => {
    // Scroll to bottom on new messages
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if(scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);


  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    console.log('Message sent:', newMessage);
  };

  if (!chatId || !chatPartner) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <p>Chat not found or loading...</p>
        <Button onClick={() => navigate('/')}>Go to Chats</Button>
      </div>
    );
  }

  return (
    <TooltipProvider>
    <div className="flex flex-col h-screen bg-muted/20 dark:bg-gray-900">
      <Header showBackButton onBackButtonClick={() => navigate('/')} title="">
        <div className="flex items-center gap-3">
          <UserAvatarWithStatus
            avatarSrc={chatPartner.avatarSrc}
            fallbackText={chatPartner.avatarFallback}
            username={chatPartner.name}
            status={chatPartner.status}
            size="md"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base">{chatPartner.name}</span>
            <span className="text-xs text-muted-foreground">{chatPartner.status === 'online' ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent><p>Start voice call</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent><p>Start video call</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
               <Button variant="ghost" size="icon"><Info className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent><p>View contact info</p></TooltipContent>
          </Tooltip>
        </div>
      </Header>
      
      {/* Breadcrumb example (optional) */}
      {/* <div className="px-4 py-2 border-b bg-background">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>Chats</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{chatPartner.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}

      <ScrollArea className="flex-1 p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((msg, index) => (
          <ChatMessageBubble
            key={msg.id}
            message={msg.text}
            timestamp={msg.timestamp}
            isSender={msg.sender === 'me'}
            senderName={msg.sender === 'other' ? msg.senderName : undefined}
            senderAvatarSrc={msg.sender === 'other' ? msg.avatarSrc : undefined}
            senderAvatarFallback={msg.sender === 'other' ? msg.avatarFallback : undefined}
            // Show avatar only for first message of a sequence or if sender changes
            showAvatar={msg.sender === 'other' && (index === 0 || messages[index-1]?.sender !== 'other' || messages[index-1]?.senderName !== msg.senderName)}
          />
        ))}
      </ScrollArea>
      <MessageInputField onSendMessage={handleSendMessage} placeholder={`Message ${chatPartner.name}...`} />
    </div>
    </TooltipProvider>
  );
};

export default ChatPage;