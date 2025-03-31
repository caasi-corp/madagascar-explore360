
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Search,
  Filter,
  Mail,
  MailOpen,
  Star,
  Trash2,
  Archive,
  Reply,
  Clock,
  User,
  Flag,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MessageType {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
  };
  received: string;
  content: string;
  read: boolean;
  starred: boolean;
  flagged: boolean;
  category: 'inquiry' | 'support' | 'feedback' | 'complaint';
  status: 'pending' | 'in-progress' | 'resolved';
}

const DEMO_MESSAGES: MessageType[] = [
  {
    id: 'm1',
    subject: 'Demande d\'informations sur le circuit Baobabs',
    sender: {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com'
    },
    received: '2023-09-15T10:30:00',
    content: `Bonjour,

Je voudrais obtenir plus d'informations sur votre circuit "Allée des Baobabs". Est-ce que ce circuit est adapté pour des enfants de 8 et 10 ans ? Quelles sont les activités proposées pendant ce circuit ? Est-il possible d'avoir un guide francophone ?

Merci d'avance pour votre réponse.
Cordialement,

Jean Dupont`,
    read: true,
    starred: false,
    flagged: false,
    category: 'inquiry',
    status: 'pending',
  },
  {
    id: 'm2',
    subject: 'Problème de réservation - Référence B002',
    sender: {
      name: 'Marie Laurent',
      email: 'marie.laurent@example.com'
    },
    received: '2023-09-16T14:15:00',
    content: `Bonjour,

J'ai effectué une réservation pour la location d'un Toyota Land Cruiser (référence B002) pour la période du 10 au 15 septembre, mais je n'ai toujours pas reçu la confirmation par email.
Pouvez-vous vérifier si la réservation a bien été prise en compte ?

Cordialement,
Marie Laurent`,
    read: false,
    starred: true,
    flagged: true,
    category: 'support',
    status: 'in-progress',
  },
  {
    id: 'm3',
    subject: 'Avis sur notre séjour à Madagascar',
    sender: {
      name: 'Paul Martin',
      email: 'paul.martin@example.com'
    },
    received: '2023-09-14T09:45:00',
    content: `Bonjour,

Je tenais à vous remercier pour l'organisation de notre voyage à Madagascar. Le circuit dans le parc national de l'Isalo était magnifique et notre guide, Antoine, était très compétent et sympathique.

Je recommanderai votre agence à mes amis !

Cordialement,
Paul Martin`,
    read: true,
    starred: true,
    flagged: false,
    category: 'feedback',
    status: 'resolved',
  },
  {
    id: 'm4',
    subject: 'Plainte concernant l\'hébergement à Nosy Be',
    sender: {
      name: 'Sophie Petit',
      email: 'sophie.petit@example.com'
    },
    received: '2023-09-17T11:20:00',
    content: `Bonjour,

Je vous écris pour vous faire part de mon mécontentement concernant l'hébergement au Royal Beach Resort & Spa à Nosy Be. La chambre que nous avons reçue ne correspondait pas du tout à celle présentée sur votre site web. Elle était plus petite, sans vue sur l'océan et dans un état général moins bon.

J'espère que vous prendrez en compte cette plainte et que vous proposerez un geste commercial.

Cordialement,
Sophie Petit`,
    read: false,
    starred: false,
    flagged: true,
    category: 'complaint',
    status: 'pending',
  },
];

const categoryLabels = {
  'inquiry': 'Demande',
  'support': 'Support',
  'feedback': 'Avis',
  'complaint': 'Plainte',
};

const categoryColors = {
  'inquiry': 'bg-blue-500',
  'support': 'bg-yellow-500',
  'feedback': 'bg-green-500',
  'complaint': 'bg-red-500',
};

const statusColors = {
  'pending': 'bg-yellow-500',
  'in-progress': 'bg-blue-500',
  'resolved': 'bg-green-500',
};

const MessagesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState(DEMO_MESSAGES);
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

  const formatDateTime = (dateTimeString: string): string => {
    try {
      return format(new Date(dateTimeString), 'dd MMM yyyy à HH:mm', { locale: fr });
    } catch (error) {
      return dateTimeString;
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
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Boîte de réception</CardTitle>
              </CardHeader>
              <div className="h-[600px] overflow-y-auto">
                {filteredMessages.length > 0 ? (
                  <div className="divide-y">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer ${
                          selectedMessage?.id === message.id ? 'bg-muted' : ''
                        } ${!message.read ? 'font-semibold' : ''}`}
                        onClick={() => handleSelectMessage(message)}
                      >
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{message.sender.name}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                <Mail className="h-3 w-3 inline mr-1" />
                                {message.sender.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleToggleStar(message.id, e)}
                            >
                              <Star
                                className={`h-4 w-4 ${message.starred ? 'text-yellow-500 fill-yellow-500' : ''}`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleToggleFlag(message.id, e)}
                            >
                              <Flag
                                className={`h-4 w-4 ${message.flagged ? 'text-red-500 fill-red-500' : ''}`}
                              />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium line-clamp-1">{message.subject}</h4>
                          <Badge className={categoryColors[message.category]}>
                            {categoryLabels[message.category]}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDateTime(message.received)}
                          </div>
                          <Badge className={statusColors[message.status]}>
                            {message.status === 'pending' && 'En attente'}
                            {message.status === 'in-progress' && 'En cours'}
                            {message.status === 'resolved' && 'Résolu'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Aucun message trouvé avec ces critères de recherche.
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="unread" className="col-span-1">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Messages non lus</CardTitle>
              </CardHeader>
              <div className="h-[600px] overflow-y-auto">
                {filteredMessages.filter(m => !m.read).length > 0 ? (
                  <div className="divide-y">
                    {filteredMessages.filter(m => !m.read).map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer ${
                          selectedMessage?.id === message.id ? 'bg-muted' : ''
                        } ${!message.read ? 'font-semibold' : ''}`}
                        onClick={() => handleSelectMessage(message)}
                      >
                        {/* Message content here, similar to "all" tab */}
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{message.sender.name}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                <Mail className="h-3 w-3 inline mr-1" />
                                {message.sender.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleToggleStar(message.id, e)}
                            >
                              <Star
                                className={`h-4 w-4 ${message.starred ? 'text-yellow-500 fill-yellow-500' : ''}`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleToggleFlag(message.id, e)}
                            >
                              <Flag
                                className={`h-4 w-4 ${message.flagged ? 'text-red-500 fill-red-500' : ''}`}
                              />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium line-clamp-1">{message.subject}</h4>
                          <Badge className={categoryColors[message.category]}>
                            {categoryLabels[message.category]}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDateTime(message.received)}
                          </div>
                          <Badge className={statusColors[message.status]}>
                            {message.status === 'pending' && 'En attente'}
                            {message.status === 'in-progress' && 'En cours'}
                            {message.status === 'resolved' && 'Résolu'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Aucun message non lu trouvé.
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="starred" className="col-span-1">
            {/* Similar content as "all" tab but filtered for starred messages */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Messages favoris</CardTitle>
              </CardHeader>
              <div className="h-[600px] overflow-y-auto">
                {filteredMessages.filter(m => m.starred).length > 0 ? (
                  <div className="divide-y">
                    {/* Messages content here... */}
                    {filteredMessages.filter(m => m.starred).map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer ${
                          selectedMessage?.id === message.id ? 'bg-muted' : ''
                        } ${!message.read ? 'font-semibold' : ''}`}
                        onClick={() => handleSelectMessage(message)}
                      >
                        {/* Similar to "all" tab content */}
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{message.sender.name}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                <Mail className="h-3 w-3 inline mr-1" />
                                {message.sender.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleToggleStar(message.id, e)}
                            >
                              <Star
                                className={`h-4 w-4 ${message.starred ? 'text-yellow-500 fill-yellow-500' : ''}`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleToggleFlag(message.id, e)}
                            >
                              <Flag
                                className={`h-4 w-4 ${message.flagged ? 'text-red-500 fill-red-500' : ''}`}
                              />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium line-clamp-1">{message.subject}</h4>
                          <Badge className={categoryColors[message.category]}>
                            {categoryLabels[message.category]}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDateTime(message.received)}
                          </div>
                          <Badge className={statusColors[message.status]}>
                            {message.status === 'pending' && 'En attente'}
                            {message.status === 'in-progress' && 'En cours'}
                            {message.status === 'resolved' && 'Résolu'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Aucun message favori trouvé.
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="flagged" className="col-span-1">
            {/* Similar content as "all" tab but filtered for flagged messages */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Messages signalés</CardTitle>
              </CardHeader>
              <div className="h-[600px] overflow-y-auto">
                {filteredMessages.filter(m => m.flagged).length > 0 ? (
                  <div className="divide-y">
                    {/* Messages content here... */}
                    {filteredMessages.filter(m => m.flagged).map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer ${
                          selectedMessage?.id === message.id ? 'bg-muted' : ''
                        } ${!message.read ? 'font-semibold' : ''}`}
                        onClick={() => handleSelectMessage(message)}
                      >
                        {/* Similar to "all" tab content */}
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{message.sender.name}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                <Mail className="h-3 w-3 inline mr-1" />
                                {message.sender.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleToggleStar(message.id, e)}
                            >
                              <Star
                                className={`h-4 w-4 ${message.starred ? 'text-yellow-500 fill-yellow-500' : ''}`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => handleToggleFlag(message.id, e)}
                            >
                              <Flag
                                className={`h-4 w-4 ${message.flagged ? 'text-red-500 fill-red-500' : ''}`}
                              />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium line-clamp-1">{message.subject}</h4>
                          <Badge className={categoryColors[message.category]}>
                            {categoryLabels[message.category]}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDateTime(message.received)}
                          </div>
                          <Badge className={statusColors[message.status]}>
                            {message.status === 'pending' && 'En attente'}
                            {message.status === 'in-progress' && 'En cours'}
                            {message.status === 'resolved' && 'Résolu'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Aucun message signalé trouvé.
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          {/* Message View Panel - Always visible on desktop */}
          <Card className="col-span-1 lg:col-span-2 h-[600px] overflow-hidden">
            {selectedMessage ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedMessage.subject}</CardTitle>
                      <div className="flex items-center mt-2 space-x-4 text-sm">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-muted-foreground" />
                          {selectedMessage.sender.name}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                          {selectedMessage.sender.email}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          {formatDateTime(selectedMessage.received)}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={categoryColors[selectedMessage.category]}>
                        {categoryLabels[selectedMessage.category]}
                      </Badge>
                      <Badge className={statusColors[selectedMessage.status]}>
                        {selectedMessage.status === 'pending' && 'En attente'}
                        {selectedMessage.status === 'in-progress' && 'En cours'}
                        {selectedMessage.status === 'resolved' && 'Résolu'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex flex-col h-[calc(600px-200px)] overflow-y-auto">
                  <div className="flex-1 whitespace-pre-line">
                    {selectedMessage.content}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex flex-col space-y-4">
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-2">
                      <Button onClick={() => handleUpdateStatus(selectedMessage.id, 'pending')} variant="outline" size="sm" className={selectedMessage.status === 'pending' ? 'bg-muted' : ''}>
                        En attente
                      </Button>
                      <Button onClick={() => handleUpdateStatus(selectedMessage.id, 'in-progress')} variant="outline" size="sm" className={selectedMessage.status === 'in-progress' ? 'bg-muted' : ''}>
                        En cours
                      </Button>
                      <Button onClick={() => handleUpdateStatus(selectedMessage.id, 'resolved')} variant="outline" size="sm" className={selectedMessage.status === 'resolved' ? 'bg-muted' : ''}>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Résolu
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={(e) => handleDelete(selectedMessage.id, e)} variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 w-full">
                    <Label htmlFor="reply">Répondre</Label>
                    <Textarea
                      id="reply"
                      placeholder="Tapez votre réponse ici..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button onClick={handleReply} className="w-full">
                      <Reply className="h-4 w-4 mr-2" />
                      Envoyer la réponse
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <MailOpen className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-medium">Aucun message sélectionné</h3>
                  <p>Sélectionnez un message pour l'afficher ici</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </Tabs>
    </AnimatedContainer>
  );
};

export default MessagesManagement;
