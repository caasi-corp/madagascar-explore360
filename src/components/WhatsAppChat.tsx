
import React, { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const WhatsAppChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const phoneNumber = '+261320500999';
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSend = () => {
    if (!message.trim()) return;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setMessage('');
  };
  
  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <Card className="w-80 shadow-xl animate-fade-in">
          <CardHeader className="bg-madagascar-green text-white p-4 flex flex-row justify-between items-center rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle />
              <div>
                <h3 className="font-semibold">Chat with us</h3>
                <p className="text-sm opacity-90">via WhatsApp</p>
              </div>
            </div>
            <Button size="icon" variant="ghost" onClick={toggleChat} className="text-white hover:bg-white/10">
              <X size={20} />
            </Button>
          </CardHeader>
          <CardContent className="p-4 bg-white dark:bg-gray-900">
            <p className="text-sm mb-4">
              Hi there! 👋 <br />
              How can we help you today?
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCall}
                className="flex items-center gap-1"
              >
                <Phone size={14} />
                Call us
              </Button>
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t flex gap-2">
            <Input 
              placeholder="Type a message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="text-sm"
            />
            <Button 
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
            >
              Send
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-madagascar-green hover:bg-madagascar-green/80 text-white"
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  );
};

export default WhatsAppChat;
