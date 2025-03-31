
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageType } from '@/types/message';
import MessageListItem from './MessageListItem';

interface MessageListProps {
  title: string;
  messages: MessageType[];
  selectedMessageId: string | null;
  onSelectMessage: (message: MessageType) => void;
  onToggleStar: (id: string, e: React.MouseEvent) => void;
  onToggleFlag: (id: string, e: React.MouseEvent) => void;
  emptyMessage?: string;
}

const MessageList: React.FC<MessageListProps> = ({
  title,
  messages,
  selectedMessageId,
  onSelectMessage,
  onToggleStar,
  onToggleFlag,
  emptyMessage = 'Aucun message trouvé.'
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <div className="h-[600px] overflow-y-auto">
        {messages.length > 0 ? (
          <div className="divide-y">
            {messages.map((message) => (
              <MessageListItem
                key={message.id}
                message={message}
                isSelected={message.id === selectedMessageId}
                onSelect={onSelectMessage}
                onToggleStar={onToggleStar}
                onToggleFlag={onToggleFlag}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MessageList;
