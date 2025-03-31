
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Clock, CheckCircle2, Trash2, Reply } from 'lucide-react';
import { MessageType, categoryColors, statusColors, categoryLabels } from '@/types/message';
import { formatDateTime } from '@/utils/formatters';

interface MessageDetailProps {
  message: MessageType | null;
  replyContent: string;
  onReplyChange: (content: string) => void;
  onReply: () => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onUpdateStatus: (id: string, status: 'pending' | 'in-progress' | 'resolved') => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({
  message,
  replyContent,
  onReplyChange,
  onReply,
  onDelete,
  onUpdateStatus,
}) => {
  if (!message) {
    return (
      <Card className="h-[600px] overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <Mail className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-medium">Aucun message sélectionné</h3>
            <p>Sélectionnez un message pour l'afficher ici</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{message.subject}</CardTitle>
            <div className="flex items-center mt-2 space-x-4 text-sm">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1 text-muted-foreground" />
                {message.sender.name}
              </span>
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                {message.sender.email}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                {formatDateTime(message.received)}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge className={categoryColors[message.category]}>
              {categoryLabels[message.category]}
            </Badge>
            <Badge className={statusColors[message.status]}>
              {message.status === 'pending' && 'En attente'}
              {message.status === 'in-progress' && 'En cours'}
              {message.status === 'resolved' && 'Résolu'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col h-[calc(600px-200px)] overflow-y-auto">
        <div className="flex-1 whitespace-pre-line">
          {message.content}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 flex flex-col space-y-4">
        <div className="flex justify-between w-full">
          <div className="flex space-x-2">
            <Button 
              onClick={() => onUpdateStatus(message.id, 'pending')} 
              variant="outline" 
              size="sm" 
              className={message.status === 'pending' ? 'bg-muted' : ''}
            >
              En attente
            </Button>
            <Button 
              onClick={() => onUpdateStatus(message.id, 'in-progress')} 
              variant="outline" 
              size="sm" 
              className={message.status === 'in-progress' ? 'bg-muted' : ''}
            >
              En cours
            </Button>
            <Button 
              onClick={() => onUpdateStatus(message.id, 'resolved')} 
              variant="outline" 
              size="sm" 
              className={message.status === 'resolved' ? 'bg-muted' : ''}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Résolu
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={(e) => onDelete(message.id, e)} 
              variant="outline" 
              size="sm" 
              className="text-red-500 hover:text-red-600"
            >
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
            onChange={(e) => onReplyChange(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={onReply} className="w-full">
            <Reply className="h-4 w-4 mr-2" />
            Envoyer la réponse
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MessageDetail;
