
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Info, Tag, Check, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock notification data
const mockNotifications = [
  {
    id: 'n1',
    title: 'Confirmation de réservation',
    message: 'Votre réservation pour le circuit "Avenue des Baobabs" a été confirmée.',
    date: '15 Août 2023',
    time: '10:24',
    type: 'reservation',
    isRead: true
  },
  {
    id: 'n2',
    title: 'Rappel: Préparez votre voyage',
    message: 'Votre excursion à Andasibe commence dans 3 jours. N\'oubliez pas de préparer vos documents et bagages.',
    date: '22 Septembre 2023',
    time: '15:30',
    type: 'reminder',
    isRead: false
  },
  {
    id: 'n3',
    title: 'Offre spéciale été',
    message: 'Profitez de 15% de réduction sur tous nos circuits vers Nosy Be en réservant avant le 30 juin.',
    date: '15 Juin 2023',
    time: '09:15',
    type: 'promotion',
    isRead: true
  },
  {
    id: 'n4',
    title: 'Mise à jour des conditions de voyage',
    message: 'Les conditions sanitaires pour voyager à Madagascar ont été mises à jour. Veuillez consulter les nouvelles exigences.',
    date: '8 Juillet 2023',
    time: '14:45',
    type: 'info',
    isRead: false
  }
];

// Type icons
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'reservation':
      return <Calendar className="h-6 w-6 text-blue-500" />;
    case 'reminder':
      return <Bell className="h-6 w-6 text-amber-500" />;
    case 'promotion':
      return <Tag className="h-6 w-6 text-purple-500" />;
    case 'info':
      return <Info className="h-6 w-6 text-northgascar-teal" />;
    default:
      return <Info className="h-6 w-6 text-gray-500" />;
  }
};

const Notifications: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Restez informé de vos réservations et offres spéciales
          </p>
        </div>
        
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Tout marquer comme lu
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Button>
        </div>
      </div>
      
      {notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Pas de notifications</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Vous n'avez aucune notification pour le moment. Vous serez informé des offres spéciales et mises à jour concernant vos réservations.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`overflow-hidden transition-colors ${!notification.isRead ? 'bg-muted/30 hover:bg-muted/50' : ''}`}
            >
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className={`font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                        {notification.title}
                        {!notification.isRead && (
                          <Badge variant="default" className="ml-2 bg-northgascar-teal text-white">Nouveau</Badge>
                        )}
                      </h3>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {notification.date} à {notification.time}
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-1">{notification.message}</p>
                    
                    <div className="flex justify-end mt-3">
                      {!notification.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Marquer comme lu
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
