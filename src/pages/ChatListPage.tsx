import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import ChatListItem from '@/components/ChatListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserAvatarWithStatus from '@/components/UserAvatarWithStatus';
import { PlusCircle, Users, Settings, LogOut, MessageSquarePlus, Moon, Sun } from 'lucide-react';

const mockChats = [
  { id: '1', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=1', avatarFallback: 'AD', name: 'Alice Doe', lastMessage: 'Hey, how are you?', timestamp: '10:30 AM', unreadCount: 2, isActive: false },
  { id: '2', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=2', avatarFallback: 'BJ', name: 'Bob Johnson', lastMessage: 'Sounds good! See you then.', timestamp: 'Yesterday', unreadCount: 0, isActive: true },
  { id: '3', avatarFallback: 'CG', name: 'Charlie Green (Group)', lastMessage: 'Alice: Are we still on for Friday?', timestamp: 'Mon', unreadCount: 5, isActive: false },
  { id: '4', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=4', avatarFallback: 'DS', name: 'Diana Smith', lastMessage: 'Photo', timestamp: 'Sun', unreadCount: 0, isActive: false },
];

const ChatListPage = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState(mockChats);
  const [activeChatId, setActiveChatId] = useState('2'); // Bob Johnson is active by default
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);


  const handleChatSelect = (id: string) => {
    setActiveChatId(id);
    navigate(`/chat/${id}`);
  };

  const handleNewChat = () => {
    navigate('/contacts'); // Navigate to contacts page to start a new chat
  };
  
  const handleLogout = () => {
    console.log("User logged out");
    navigate('/auth');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd also toggle a class on the HTML element
    document.documentElement.classList.toggle('dark', !isDarkMode);
    console.log("Dark mode toggled:", !isDarkMode);
  };


  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (chat.lastMessage && chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  console.log('ChatListPage loaded');

  return (
    <div className={`flex h-screen antialiased text-gray-800 dark:text-gray-200 ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar
        showSearch={true}
        searchPlaceholder="Search chats..."
        onSearchChange={setSearchTerm}
        className="w-72 md:w-80 flex flex-col"
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chats</h2>
          <Button variant="ghost" size="icon" onClick={handleNewChat} aria-label="New Chat">
            <MessageSquarePlus className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          {filteredChats.length > 0 ? (
            filteredChats.map(chat => (
              <ChatListItem
                key={chat.id}
                {...chat}
                isActive={chat.id === activeChatId}
                onClick={() => handleChatSelect(chat.id)}
              />
            ))
          ) : (
            <p className="p-4 text-center text-muted-foreground">No chats found.</p>
          )}
        </ScrollArea>
        <div className="p-2 border-t">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <UserAvatarWithStatus 
                    avatarSrc="https://source.unsplash.com/random/40x40?profile&sig=99" 
                    fallbackText="ME" 
                    username="My Profile" 
                    status="online" 
                    size="sm" 
                />
                <span className="ml-2 font-medium">My Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2 ml-2" side="top" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/contacts')}>
                <Users className="mr-2 h-4 w-4" />
                <span>Contacts</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Sidebar>
      <main className="flex-1 flex flex-col items-center justify-center bg-muted/40 dark:bg-gray-800">
        {/* Placeholder for when no chat is selected or for larger screens */}
        <div className="text-center">
          <MessageSquarePlus className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">Select a chat</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Or start a <Button variant="link" className="p-0 h-auto" onClick={handleNewChat}>new conversation</Button>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ChatListPage;