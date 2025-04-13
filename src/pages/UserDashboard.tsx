
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  User,
  CreditCard,
  Bell,
  Settings,
  Clock,
  MapPin,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';
import { bookingAPI, tourAPI } from '@/lib/store';
import { Tour, Booking } from '@/lib/db/schema';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Vérifier si l'utilisateur est connecté et charger les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          navigate('/login');
          return;
        }
        
        setIsLoading(true);
        
        // Charger les réservations de l'utilisateur
        const userBookings = await bookingAPI.getByUserId(user.id);
        // Filtrer pour n'obtenir que les réservations à venir
        const upcoming = userBookings.filter(booking => 
          new Date(booking.startDate) >= new Date()
        );
        setUpcomingBookings(upcoming);
        
        // Charger les circuits récemment consultés (simulé)
        const allTours = await tourAPI.getAll();
        setRecentlyViewed(allTours.slice(0, 3));
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Une erreur s'est produite lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success("Déconnexion réussie");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-madagascar-green mx-auto mb-4"></div>
          <p>Chargement de vos données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
                <AvatarFallback>{user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'UT'}</AvatarFallback>
              </Avatar>
              <CardTitle>{user ? `${user.firstName} ${user.lastName}` : 'Utilisateur'}</CardTitle>
              <CardDescription>Membre depuis {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <nav>
                <div className="border-t">
                  <Link to="/user/dashboard" className="flex items-center p-3 text-sm hover:bg-muted">
                    <User className="mr-2 h-4 w-4" /> Profil
                  </Link>
                </div>
                <div className="border-t">
                  <Link to="/user/bookings" className="flex items-center p-3 text-sm hover:bg-muted">
                    <CalendarDays className="mr-2 h-4 w-4" /> Mes Réservations
                  </Link>
                </div>
                <div className="border-t">
                  <Link to="/user/wishlist" className="flex items-center p-3 text-sm hover:bg-muted">
                    <Calendar className="mr-2 h-4 w-4" /> Liste de souhaits
                  </Link>
                </div>
                <div className="border-t">
                  <Link to="/user/payments" className="flex items-center p-3 text-sm hover:bg-muted">
                    <CreditCard className="mr-2 h-4 w-4" /> Moyens de paiement
                  </Link>
                </div>
                <div className="border-t">
                  <Link to="/user/notifications" className="flex items-center p-3 text-sm hover:bg-muted">
                    <Bell className="mr-2 h-4 w-4" /> Notifications
                  </Link>
                </div>
                <div className="border-t">
                  <Link to="/user/settings" className="flex items-center p-3 text-sm hover:bg-muted">
                    <Settings className="mr-2 h-4 w-4" /> Paramètres
                  </Link>
                </div>
              </nav>
            </CardContent>
            <CardFooter className="border-t p-3">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Bienvenue, {user ? user.firstName : 'Voyageur'} !</h1>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Voyages à venir</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
              <TabsTrigger value="recommendations">Pour vous</TabsTrigger>
            </TabsList>
            
            {/* Upcoming Trips */}
            <TabsContent value="upcoming">
              {upcomingBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{booking.tourId ? "Circuit réservé" : booking.vehicleId ? "Location de véhicule" : "Réservation"}</CardTitle>
                        <CardDescription>Réservation #{booking.id.slice(0, 6)}</CardDescription>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Confirmed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}
                        >
                          {booking.status === 'Confirmed' ? 'Confirmée' : booking.status === 'Pending' ? 'En attente' : 'Annulée'}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <CalendarDays className="mr-2 h-4 w-4 text-madagascar-green" />
                            <span className="text-sm">
                              {new Date(booking.startDate).toLocaleDateString('fr-FR')} - {new Date(booking.endDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-madagascar-green" />
                            <span className="text-sm">
                              {new Date(booking.startDate) > new Date() 
                                ? `${Math.ceil((new Date(booking.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours restants` 
                                : "Commence aujourd'hui!"
                              }
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="mr-2">Gérer la réservation</Button>
                        <Button className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">Voir les détails</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-lg font-semibold mb-2">Aucun voyage à venir</h3>
                    <p className="text-muted-foreground mb-4">Vous n'avez pas encore planifié de voyages.</p>
                    <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
                      <Link to="/tours">
                        Explorer les circuits
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              <h2 className="text-xl font-semibold mb-4">Récemment consultés</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recentlyViewed.map((item) => (
                  <Link to={`/tours/${item.id}`} key={item.id}>
                    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex flex-col justify-end">
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <p className="text-white/90">{item.price} €</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            {/* Trip History */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Votre historique de voyages</CardTitle>
                  <CardDescription>Consultez tous vos voyages et aventures passés</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center p-6 text-muted-foreground">
                    Vous n'avez pas encore effectué de voyages.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Recommendations */}
            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle>Recommandés pour vous</CardTitle>
                  <CardDescription>Circuits et destinations qui pourraient vous plaire</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <img 
                        src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
                        alt="Baobabs"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">Allée des Baobabs</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin size={14} className="mr-1" /> Morondava
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          Découvrez l'emblématique Allée des Baobabs, l'un des sites les plus célèbres de Madagascar.
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-madagascar-green">299 €</div>
                        <Button size="sm" variant="outline" className="mt-1">
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <img 
                        src="https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a"
                        alt="Ranomafana"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">Expédition au Parc National de Ranomafana</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin size={14} className="mr-1" /> Ranomafana
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          Explorez les forêts luxuriantes de Ranomafana et observez des espèces rares de lémuriens, d'oiseaux et de caméléons.
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-madagascar-green">389 €</div>
                        <Button size="sm" variant="outline" className="mt-1">
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-madagascar-green hover:bg-madagascar-green/80 text-white">
                    <Link to="/tours">
                      Voir tous les circuits
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
