
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Star, 
  Download,
  Mail,
  Clock,
  MoreVertical,
  Reply,
  Archive,
  Eye
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
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  starred: boolean;
  replied: boolean;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'M001', 
      name: 'Jean Dupont', 
      email: 'jean.dupont@example.com',
      subject: 'Demande d\'informations sur les circuits',
      content: 'Bonjour,\n\nJe souhaiterais avoir plus d\'informations sur vos circuits dans le nord de Madagascar, notamment sur les dates de départ et les tarifs pour un groupe de 4 personnes.\n\nMerci d\'avance pour votre réponse,\nJean Dupont',
      date: '2023-09-15T14:30:00',
      read: false,
      starred: false,
      replied: false
    },
    { 
      id: 'M002', 
      name: 'Marie Durand', 
      email: 'marie.durand@example.com',
      subject: 'Réservation circuit Avenue des Baobabs',
      content: 'Bonjour,\n\nJe souhaite réserver le circuit "Avenue des Baobabs" pour 2 personnes du 15 au 18 octobre 2023. Pourriez-vous me confirmer la disponibilité et m\'indiquer la procédure à suivre pour réserver?\n\nCordialement,\nMarie Durand',
      date: '2023-09-14T09:15:00',
      read: true,
      starred: true,
      replied: true
    },
    { 
      id: 'M003', 
      name: 'Pierre Martin', 
      email: 'pierre.martin@example.com',
      subject: 'Question sur la location de 4x4',
      content: 'Bonjour,\n\nJe serai à Madagascar du 5 au 15 novembre et je souhaiterais louer un 4x4 pour parcourir le pays. Pouvez-vous me donner les tarifs et les conditions de location?\n\nMerci,\nPierre Martin',
      date: '2023-09-13T16:45:00',
      read: true,
      starred: false,
      replied: false
    },
    { 
      id: 'M004', 
      name: 'Sophie Legrand', 
      email: 'sophie.legrand@example.com',
      subject: 'Problème de paiement',
      content: 'Bonjour,\n\nJ\'ai essayé de finaliser ma réservation pour le circuit "Trekking aux Lémuriens" mais j\'ai rencontré un problème lors du paiement. Le système a indiqué une erreur de transaction. Pouvez-vous m\'aider?\n\nCordialement,\nSophie Legrand',
      date: '2023-09-12T11:20:00',
      read: false,
      starred: true,
      replied: false
    },
    { 
      id: 'M005', 
      name: 'Michel Blanc', 
      email: 'michel.blanc@example.com',
      subject: 'Demande de partenariat',
      content: 'Bonjour,\n\nJe suis Michel Blanc, responsable de l\'agence de voyage "Voyages Exotiques". Nous souhaiterions mettre en place un partenariat avec votre entreprise pour proposer vos circuits à nos clients. Pourrions-nous échanger à ce sujet?\n\nBien cordialement,\nMichel Blanc',
      date: '2023-09-10T08:00:00',
      read: true,
      starred: false,
      replied: true
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  
  const { toast } = useToast();

  const openMessageDialog = (message: Message) => {
    // Mark as read when opening
    if (!message.read) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ));
    }
    
    setSelectedMessage(message);
    setIsMessageDialogOpen(true);
  };

  const openReplyDialog = () => {
    setIsReplyDialogOpen(true);
    setReplyContent('');
  };

  const openDeleteDialog = (message: Message) => {
    setSelectedMessage(message);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedMessage) {
      setMessages(messages.filter(m => m.id !== selectedMessage.id));
      
      toast({
        title: "Message supprimé",
        description: `Le message de ${selectedMessage.name} a été supprimé avec succès`,
        variant: "default",
      });
      
      setIsDeleteDialogOpen(false);
      setIsMessageDialogOpen(false);
      setSelectedMessage(null);
    }
  };

  const handleSendReply = () => {
    if (selectedMessage && replyContent) {
      // Mark message as replied
      setMessages(messages.map(m => 
        m.id === selectedMessage.id ? { ...m, replied: true } : m
      ));
      
      toast({
        title: "Réponse envoyée",
        description: `Votre réponse à ${selectedMessage.name} a été envoyée avec succès`,
        variant: "default",
      });
      
      setIsReplyDialogOpen(false);
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez rédiger un message avant d'envoyer",
        variant: "destructive",
      });
    }
  };

  const toggleStarred = (id: string) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, starred: !message.starred } : message
    ));
  };

  const markAsRead = (id: string, read: boolean) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read } : message
    ));
    
    const message = messages.find(m => m.id === id);
    if (message) {
      toast({
        title: read ? "Marqué comme lu" : "Marqué comme non lu",
        description: `Le message a été marqué comme ${read ? 'lu' : 'non lu'}`,
        variant: "default",
      });
    }
  };

  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: string) => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return `Aujourd'hui ${messageDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return `Hier ${messageDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return messageDate.toLocaleDateString('fr-FR');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Messages</h1>
        <div className="flex gap-2">
          <Button variant="outline" disabled={filteredMessages.length === 0}>
            <Archive className="mr-2 h-4 w-4" />
            Archiver
          </Button>
          <Button variant="outline" disabled={filteredMessages.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Rechercher dans les messages..." 
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>Non lus</DropdownMenuItem>
                <DropdownMenuItem>Lus</DropdownMenuItem>
                <DropdownMenuItem>Favoris</DropdownMenuItem>
                <DropdownMenuItem>Répondus</DropdownMenuItem>
                <DropdownMenuItem>Non répondus</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]"></TableHead>
                <TableHead>Expéditeur</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Aucun message trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow 
                    key={message.id} 
                    className={message.read ? '' : 'font-medium bg-muted/20'}
                    onClick={() => openMessageDialog(message)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStarred(message.id);
                        }}
                      >
                        <Star 
                          className={`h-4 w-4 ${message.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                        />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-madagascar-green/20 text-madagascar-green">
                            {message.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className={message.read ? '' : 'font-medium'}>{message.name}</div>
                          <div className="text-xs text-muted-foreground">{message.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className={`truncate max-w-[400px] ${message.read ? '' : 'font-medium'}`}>
                          {message.subject}
                        </span>
                        {message.replied && (
                          <Badge variant="outline" className="ml-2 text-green-500 border-green-500">
                            Répondu
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {formatDate(message.date)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openMessageDialog(message)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir le détail
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedMessage(message);
                                openReplyDialog();
                              }}
                            >
                              <Reply className="mr-2 h-4 w-4" />
                              Répondre
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => markAsRead(message.id, !message.read)}>
                              Marquer comme {message.read ? 'non lu' : 'lu'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleStarred(message.id)}>
                              {message.starred ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(message)}
                              className="text-destructive focus:text-destructive"
                            >
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

      {/* Message Details Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>{selectedMessage?.subject}</DialogTitle>
              <div className="flex gap-2">
                {selectedMessage && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toggleStarred(selectedMessage.id)}
                  >
                    <Star 
                      className={`h-4 w-4 ${selectedMessage.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                )}
                {selectedMessage?.replied && (
                  <Badge variant="outline" className="text-green-500 border-green-500">
                    Répondu
                  </Badge>
                )}
              </div>
            </div>
            <DialogDescription>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-madagascar-green/20 text-madagascar-green">
                      {selectedMessage?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedMessage?.name} &lt;{selectedMessage?.email}&gt;</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {selectedMessage && formatDate(selectedMessage.date)}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 border-t pt-4 whitespace-pre-line">
            {selectedMessage?.content}
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Fermer
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => openDeleteDialog(selectedMessage!)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
              <Button className="bg-madagascar-green hover:bg-madagascar-green/80" onClick={openReplyDialog}>
                <Reply className="mr-2 h-4 w-4" />
                Répondre
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Répondre à {selectedMessage?.name}</DialogTitle>
            <DialogDescription>
              <div className="mt-2">
                <div><strong>À:</strong> {selectedMessage?.email}</div>
                <div><strong>Sujet:</strong> Re: {selectedMessage?.subject}</div>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <Textarea 
              placeholder="Composez votre message..." 
              value={replyContent} 
              onChange={(e) => setReplyContent(e.target.value)} 
              rows={10}
            />
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-madagascar-green hover:bg-madagascar-green/80" onClick={handleSendReply}>
              Envoyer la réponse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le message "{selectedMessage?.subject}" ?
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
