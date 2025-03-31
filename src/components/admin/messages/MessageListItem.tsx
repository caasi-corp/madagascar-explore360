
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Star, Flag, Clock } from 'lucide-react';
import { MessageType, categoryColors, statusColors } from '@/types/message';
import { formatDateTime } from '@/utils/formatters';

interface MessageListItemProps {
  message: MessageType;
  isSelected: boolean;
  onSelect: (message: MessageType) => void;
  onToggleStar: (id: string, e: React.MouseEvent) => void;
  onToggleFlag: (id: string, e: React.MouseEvent) => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  message,
  isSelected,
  onSelect,
  onToggleStar,
  onToggleFlag,
}) => {
  const categoryLabel = {
    'inquiry': 'Demande',
    'support': 'Support',
    'feedback': 'Avis',
    'complaint': 'Plainte',
  }[message.category];

  const statusLabel = {
    'pending': 'En attente',
    'in-progress': 'En cours',
    'resolved': 'Résolu',
  }[message.status];

  return (
    <div
      className={`p-4 hover:bg-muted/50 cursor-pointer ${
        isSelected ? 'bg-muted' : ''
      } ${!message.read ? 'font-semibold' : ''}`}
      onClick={() => onSelect(message)}
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
            onClick={(e) => onToggleStar(message.id, e)}
          >
            <Star
              className={`h-4 w-4 ${message.starred ? 'text-yellow-500 fill-yellow-500' : ''}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => onToggleFlag(message.id, e)}
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
          {categoryLabel}
        </Badge>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {formatDateTime(message.received)}
        </div>
        <Badge className={statusColors[message.status]}>
          {statusLabel}
        </Badge>
      </div>
    </div>
  );
};

export default MessageListItem;
