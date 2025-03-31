
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { MessageType } from '@/types/message';
import { DEMO_MESSAGES } from '@/data/mockMessages';
import MessageList from '@/components/admin/messages/MessageList';
import MessageDetail from '@/components/admin/messages/MessageDetail';

const MessagesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<MessageType[]>(DEMO_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectMessage = (message: MessageType) => {
    if (!message.read) {
      // Mark as read
      setMessages(messages.map(m => m.id === message.id ? { ...m, read: true } : m));
    }
    setSelectedMessage(message);
  };

  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages(messages.map(message => 
      message.id === id ? { ...message, starred: !message.starred } : message
    ));
  };

  const handleToggleFlag = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages(messages.map(message => 
      message.id === id ? { ...message, flagged: !message.flagged } : message
    ));
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message?')) {
      setMessages(messages.filter(message => message.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleUpdateStatus = (id: string, status: 'pending' | 'in-progress' | 'resolved') => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, status } : message
    ));
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
  };

  const handleReply = () => {
    if (!selectedMessage || !replyContent.trim()) return;
    
    // In a real app, this would send an email or save a reply
    alert(`Réponse à ${selectedMessage.sender.name} envoyée avec succès!`);
    setReplyContent('');
    
    // Change status to in-progress if it was pending
    if (selectedMessage.status === 'pending') {
      handleUpdateStatus(selectedMessage.id, 'in-progress');
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(m => !m.read).length;
  const starredCount = messages.filter(m => m.starred).length;
  const flaggedCount = messages.filter(m => m.flagged).length;

  return (
    <AnimatedContainer className="space-y-6">
      <h1 className="text-3xl font-bold">Centre de Messages</h1>
      
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">
              Tous <Badge variant="secondary" className="ml-2">{messages.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Non lus <Badge variant="secondary" className="ml-2">{unreadCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="starred">
              Favoris <Badge variant="secondary" className="ml-2">{starredCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="flagged">
              Signalés <Badge variant="secondary" className="ml-2">{flaggedCount}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-10 w-[250px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TabsContent value="all" className="col-span-1">
            <MessageList
              title="Boîte de réception"
              messages={filteredMessages}
              selectedMessageId={selectedMessage?.id || null}
              onSelectMessage={handleSelectMessage}
              onToggleStar={handleToggleStar}
              onToggleFlag={handleToggleFlag}
              emptyMessage="Aucun message trouvé avec ces critères de recherche."
            />
          </TabsContent>
          
          <TabsContent value="unread" className="col-span-1">
            <MessageList
              title="Messages non lus"
              messages={filteredMessages.filter(m => !m.read)}
              selectedMessageId={selectedMessage?.id || null}
              onSelectMessage={handleSelectMessage}
              onToggleStar={handleToggleStar}
              onToggleFlag={handleToggleFlag}
              emptyMessage="Aucun message non lu trouvé."
            />
          </TabsContent>
          
          <TabsContent value="starred" className="col-span-1">
            <MessageList
              title="Messages favoris"
              messages={filteredMessages.filter(m => m.starred)}
              selectedMessageId={selectedMessage?.id || null}
              onSelectMessage={handleSelectMessage}
              onToggleStar={handleToggleStar}
              onToggleFlag={handleToggleFlag}
              emptyMessage="Aucun message favori trouvé."
            />
          </TabsContent>
          
          <TabsContent value="flagged" className="col-span-1">
            <MessageList
              title="Messages signalés"
              messages={filteredMessages.filter(m => m.flagged)}
              selectedMessageId={selectedMessage?.id || null}
              onSelectMessage={handleSelectMessage}
              onToggleStar={handleToggleStar}
              onToggleFlag={handleToggleFlag}
              emptyMessage="Aucun message signalé trouvé."
            />
          </TabsContent>
          
          {/* Message Detail Panel - Always visible on desktop */}
          <div className="col-span-1 lg:col-span-2">
            <MessageDetail
              message={selectedMessage}
              replyContent={replyContent}
              onReplyChange={setReplyContent}
              onReply={handleReply}
              onDelete={handleDelete}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        </div>
      </Tabs>
    </AnimatedContainer>
  );
};

export default MessagesManagement;
