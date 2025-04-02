
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Mail,
  MailOpen,
  Star,
  Trash2,
  RefreshCcw,
  MoreVertical,
  CheckCircle,
  Archive,
  Reply,
  Clock,
  User,
  CalendarClock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface Message {
  id: string;
  from: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  starred: boolean;
  category?: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'MSG001',
      from: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      subject: 'Question sur le circuit Avenue des Baobabs',
      message: 'Bonjour,\n\nJe souhaiterais avoir plus d\'informations sur votre circuit "Avenue des Baobabs". Est-ce que ce circuit est adapté pour une famille avec enfants ?\n\nMerci d\'avance pour votre réponse.\n\nCordialement,\nJean Dupont',
      date: '2023-08-05T10:30:00',
      read: true,
      starred: true,
      category: 'Circuit'
    },
    {
      id: 'MSG002',
      from: 'Emma Martin',
      email: 'emma.martin@example.com',
      subject: 'Disponibilité de la Toyota Hilux',
      message: 'Bonjour,\n\nJe voudrais savoir si la Toyota Hilux est disponible du 15 au 20 septembre ? Et quel est le tarif exact pour cette période ?\n\nMerci,\nEmma',
      date: '2023-08-10T14:15:00',
      read: false,
      starred: false,
      category: 'Location'
    },
    {
      id: 'MSG003',
      from: 'Michel Blanc',
      email: 'michel.blanc@example.com',
      subject: 'Problème de paiement sur le site',
      message: 'Bonjour,\n\nJ\'ai essayé de réserver le circuit "Trekking aux Lémuriens" mais j\'ai eu un problème lors du paiement. La transaction a été refusée alors que ma carte est valide.\n\nPouvez-vous m\'aider à résoudre ce problème ?\n\nCordialement,\nMichel Blanc',
      date: '2023-08-12T09:45:00',
      read: false,
      starred: false,
      category: 'Support'
    },
    {
      id: 'MSG004',
      from: 'Sophie Garcia',
      email: 'sophie.garcia@example.com',
      subject: 'Demande de partenariat',
      message: 'Bonjour,\n\nJe suis Sophie Garcia, directrice marketing de l\'agence de voyage "Voyages Exotiques". Nous sommes intéressés par un partenariat avec votre entreprise pour proposer vos circuits à Madagascar à notre clientèle.\n\nPourrions-nous organiser un appel pour discuter des possibilités de collaboration ?\n\nBien cordialement,\nSophie Garcia',
      date: '2023-08-15T16:20:00',
      read: true,
      starred: true,
      category: 'Commercial'
    },
    {
      id: 'MSG005',
      from: 'Pierre Dubois',
      email: 'pierre.dubois@example.com',
      subject: 'Annulation de réservation',
      message: 'Bonjour,\n\nJ\'ai malheureusement dû changer mes plans et je dois annuler ma réservation pour le circuit "Parc National d\'Isalo" prévue pour le 25 septembre (réservation #B003).\n\nPuis-je savoir quelles sont les conditions d\'annulation et si un remboursement est possible ?\n\nMerci pour votre compréhension,\nPierre Dubois',
      date: '2023-08-18T11:05:00',
      read: false,
      starred: false,
      category: 'Réservation'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const { toast } = useToast();

  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
  };

  const handleToggleStar = (id: string) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, starred: !message.starred } : message
    ));
  };

  const handleDelete = (ids: string[]) => {
    setMessages(messages.filter(message => !ids.includes(message.id)));
    setSelectedMessages([]);
    
    toast({
      title: ids.length > 1 ? "Messages supprimés" : "Message supprimé",
      description: ids.length > 1 ? `${ids.length} messages ont été supprimés` : "Le message a été supprimé avec succès",
    });
  };

  const handleBulkAction = (action: 'read' | 'unread' | 'star' | 'unstar' | 'delete') => {
    if (selectedMessages.length === 0) return;
    
    switch (action) {
      case 'read':
        setMessages(messages.map(message => 
          selectedMessages.includes(message.id) ? { ...message, read: true } : message
        ));
        toast({
          title: "Messages marqués comme lus",
          description: `${selectedMessages.length} messages ont été marqués comme lus`,
        });
        break;
      case 'unread':
        setMessages(messages.map(message => 
          selectedMessages.includes(message.id) ? { ...message, read: false } : message
        ));
        toast({
          title: "Messages marqués comme non lus",
          description: `${selectedMessages.length} messages ont été marqués comme non lus`,
        });
        break;
      case 'star':
        setMessages(messages.map(message => 
          selectedMessages.includes(message.id) ? { ...message, starred: true } : message
        ));
        toast({
          title: "Messages marqués comme importants",
          description: `${selectedMessages.length} messages ont été marqués comme importants`,
        });
        break;
      case 'unstar':
        setMessages(messages.map(message => 
          selectedMessages.includes(message.id) ? { ...message, starred: false } : message
        ));
        toast({
          title: "Messages démarqués",
          description: `${selectedMessages.length} messages ne sont plus marqués comme importants`,
        });
        break;
      case 'delete':
        handleDelete(selectedMessages);
        break;
    }
    
    setSelectedMessages([]);
  };

  const handleReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    toast({
      title: "Réponse envoyée",
      description: `Votre réponse à ${selectedMessage.from} a été envoyée avec succès`,
    });
    
    setReplyText('');
    setIsViewDialogOpen(false);
  };

  const handleSelectMessage = (id: string) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter(messageId => messageId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const handleSelectAllMessages = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(message => message.id));
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getCategoryBadge = (category?: string) => {
    if (!category) return null;
    
    const styles: Record<string, string> = {
      Circuit: "bg-blue-500",
      Location: "bg-green-500",
      Support: "bg-amber-500",
      Commercial: "bg-purple-500",
      Réservation: "bg-indigo-500"
    };
    
    return (
      <Badge className={styles[category] || "bg-gray-500"}>
        {category}
      </Badge>
    );
  };

  const filteredMessages = messages.filter(message => 
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (message.category && message.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Button onClick={() => handleBulkAction('read')} variant="outline">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Rafraîchir
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Rechercher des messages..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Tous les messages</DropdownMenuItem>
                <DropdownMenuItem>Non lus</DropdownMenuItem>
                <DropdownMenuItem>Importants</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Circuit</DropdownMenuItem>
                <DropdownMenuItem>Location</DropdownMenuItem>
                <DropdownMenuItem>Réservation</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem>Commercial</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {selectedMessages.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-muted rounded-md">
              <p className="text-sm">
                {selectedMessages.length} message{selectedMessages.length > 1 ? 's' : ''} sélectionné{selectedMessages.length > 1 ? 's' : ''}
              </p>
              <div className="flex-1"></div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleBulkAction('read')}
              >
                <MailOpen className="mr-1 h-4 w-4" />
                Marquer comme lu
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleBulkAction('star')}
              >
                <Star className="mr-1 h-4 w-4" />
                Marquer
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => handleBulkAction('delete')}
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Supprimer
              </Button>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox 
                    checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                    onCheckedChange={handleSelectAllMessages}
                  />
                </TableHead>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Expéditeur</TableHead>
                <TableHead className="hidden md:table-cell">Sujet</TableHead>
                <TableHead className="hidden lg:table-cell">Catégorie</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun message trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow 
                    key={message.id} 
                    className={!message.read ? "bg-muted/30 font-medium" : ""}
                    onClick={() => {
                      setSelectedMessage(message);
                      setIsViewDialogOpen(true);
                      if (!message.read) {
                        handleMarkAsRead(message.id);
                      }
                    }}
                  >
                    <TableCell 
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Checkbox 
                        checked={selectedMessages.includes(message.id)}
                        onCheckedChange={() => handleSelectMessage(message.id)}
                      />
                    </TableCell>
                    <TableCell 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStar(message.id);
                      }}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                        <Star 
                          className={`h-4 w-4 ${message.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                        />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {!message.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        )}
                        <span>{message.from}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                      {message.subject}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {message.category ? getCategoryBadge(message.category) : null}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">
                      {format(new Date(message.date), 'dd MMM', { locale: fr })}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(message.id);
                            }}>
                              <MailOpen className="mr-2 h-4 w-4" />
                              Marquer comme lu
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStar(message.id);
                            }}>
                              <Star className="mr-2 h-4 w-4" />
                              {message.starred ? 'Retirer l\'étoile' : 'Marquer'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMessage(message);
                              setIsViewDialogOpen(true);
                            }}>
                              <Reply className="mr-2 h-4 w-4" />
                              Répondre
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStar(message.id);
                            }}>
                              <Archive className="mr-2 h-4 w-4" />
                              Archiver
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleDelete([message.id]);
                            }}
                            className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Message details dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  {selectedMessage.category && getCategoryBadge(selectedMessage.category)}
                  <span>{format(new Date(selectedMessage.date), 'dd MMMM yyyy à HH:mm', { locale: fr })}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(selectedMessage.from)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedMessage.from}</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Répondre</h4>
                  <Textarea 
                    placeholder="Écrivez votre réponse ici..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mr-auto">
                  <Clock className="h-4 w-4" />
                  <span>Reçu {format(new Date(selectedMessage.date), 'dd/MM/yyyy')}</span>
                </div>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleReply} disabled={!replyText.trim()}>
                  <Reply className="mr-2 h-4 w-4" />
                  Envoyer la réponse
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
