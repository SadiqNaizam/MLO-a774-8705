import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import UserAvatarWithStatus from '@/components/UserAvatarWithStatus';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquarePlus, UserPlus, Search } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatarSrc?: string;
  avatarFallback: string;
  status?: 'online' | 'offline' | 'away';
  email?: string; 
}

const mockContacts: Contact[] = [
  { id: '1', name: 'Alice Doe', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=1', avatarFallback: 'AD', status: 'online', email: 'alice@example.com' },
  { id: '2', name: 'Bob Johnson', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=2', avatarFallback: 'BJ', status: 'away', email: 'bob@example.com' },
  { id: '4', name: 'Diana Smith', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=4', avatarFallback: 'DS', status: 'offline', email: 'diana@example.com' },
  { id: '5', name: 'Eve Williams', avatarFallback: 'EW', status: 'online', email: 'eve@example.com' },
  { id: '6', name: 'Frank Brown', avatarSrc: 'https://source.unsplash.com/random/40x40?face&sig=6', avatarFallback: 'FB', status: 'offline', email: 'frank@example.com' },
];


const ContactsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleStartChat = (contactId: string) => {
    // In a real app, you might create a new chat session if one doesn't exist
    // For now, let's assume contactId can be used as chatId or find existing chat.
    // For simplicity, this mock will navigate to a chat page assuming the contact ID might map to a pre-existing chat ID
    // or a new chat would be initiated with this contact.
    const existingChat = mockChatMessages[contactId]; // A bit of a hack, assuming contact ID might match a chat ID
    if (existingChat) {
        navigate(`/chat/${contactId}`);
    } else {
        // If no existing chat, maybe create one or navigate to a "new chat with contact" page
        // For this demo, let's just go to a generic chat page for this contact ID.
        // This would need backend logic to create/find chats.
        console.log(`Starting new chat with contact ${contactId}`);
        navigate(`/chat/${contactId}`); // This will likely show "Chat not found" if no mock messages for this ID.
    }
  };
  
  const handleAddNewContact = () => {
    // Placeholder for "Add New Contact" functionality
    console.log("Add new contact clicked");
    // This might open a dialog or navigate to a new contact form page
    alert("Add New Contact functionality not implemented yet.");
  };

  console.log('ContactsPage loaded');

  return (
    <div className="flex flex-col h-screen">
      <Header title="Contacts" showBackButton onBackButtonClick={() => navigate('/')}>
        <Button variant="ghost" size="icon" onClick={handleAddNewContact} aria-label="Add new contact">
            <UserPlus className="h-5 w-5" />
        </Button>
      </Header>
      <div className="p-4 border-b">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search contacts..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredContacts.length > 0 ? (
          <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map(contact => (
              <Card key={contact.id}>
                <CardContent className="p-4 flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-3">
                    <UserAvatarWithStatus
                      avatarSrc={contact.avatarSrc}
                      fallbackText={contact.avatarFallback}
                      username={contact.name}
                      status={contact.status}
                      size="md"
                    />
                    <div>
                      <p className="text-sm font-medium leading-none">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.email || 'No email'}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleStartChat(contact.id)}>
                    <MessageSquarePlus className="h-4 w-4 mr-2" /> Chat
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No contacts found.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ContactsPage;