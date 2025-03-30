
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
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
  FileText,
  Clock,
  MapPin,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      navigate('/login');
    }
  }, [navigate]);
  
  // Sample upcoming bookings data
  const upcomingBookings = [
    {
      id: 'B123',
      title: 'Avenue of the Baobabs Tour',
      startDate: '2023-08-25',
      endDate: '2023-08-27',
      status: 'Confirmed'
    },
    {
      id: 'B124',
      title: 'Nosy Be Island Resort',
      startDate: '2023-09-15',
      endDate: '2023-09-20',
      status: 'Pending'
    }
  ];
  
  // Sample recently viewed tours
  const recentlyViewed = [
    {
      id: '1',
      title: 'Isalo National Park Adventure',
      image: 'https://images.unsplash.com/photo-1504623953583-4ae307ea839f',
      price: 499
    },
    {
      id: '2',
      title: 'Lemur Trekking in Andasibe',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      price: 349
    },
    {
      id: '3',
      title: 'Nosy Be Island Paradise',
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
      price: 599
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>Member since Aug 2023</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav>
                  <div className="border-t">
                    <Link to="/user/dashboard" className="flex items-center p-3 text-sm hover:bg-muted">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </div>
                  <div className="border-t">
                    <Link to="/user/bookings" className="flex items-center p-3 text-sm hover:bg-muted">
                      <CalendarDays className="mr-2 h-4 w-4" /> My Bookings
                    </Link>
                  </div>
                  <div className="border-t">
                    <Link to="/user/wishlist" className="flex items-center p-3 text-sm hover:bg-muted">
                      <Calendar className="mr-2 h-4 w-4" /> Wishlist
                    </Link>
                  </div>
                  <div className="border-t">
                    <Link to="/user/payments" className="flex items-center p-3 text-sm hover:bg-muted">
                      <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                    </Link>
                  </div>
                  <div className="border-t">
                    <Link to="/user/notifications" className="flex items-center p-3 text-sm hover:bg-muted">
                      <Bell className="mr-2 h-4 w-4" /> Notifications
                    </Link>
                  </div>
                  <div className="border-t">
                    <Link to="/user/settings" className="flex items-center p-3 text-sm hover:bg-muted">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </div>
                </nav>
              </CardContent>
              <CardFooter className="border-t p-3">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    localStorage.removeItem('userRole');
                    navigate('/');
                  }}
                >
                  Log out
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Welcome back, John!</h1>
            
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
                <TabsTrigger value="history">Trip History</TabsTrigger>
                <TabsTrigger value="recommendations">For You</TabsTrigger>
              </TabsList>
              
              {/* Upcoming Trips */}
              <TabsContent value="upcoming">
                {upcomingBookings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{booking.title}</CardTitle>
                          <CardDescription>Booking #{booking.id}</CardDescription>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'Confirmed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}
                          >
                            {booking.status}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <CalendarDays className="mr-2 h-4 w-4 text-madagascar-green" />
                              <span className="text-sm">
                                {booking.startDate} - {booking.endDate}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-madagascar-green" />
                              <span className="text-sm">
                                {new Date(booking.startDate) > new Date() 
                                  ? `${Math.ceil((new Date(booking.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go` 
                                  : 'Starting today!'
                                }
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="mr-2">Manage Booking</Button>
                          <Button className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <h3 className="text-lg font-semibold mb-2">No upcoming trips</h3>
                      <p className="text-muted-foreground mb-4">You don't have any upcoming trips planned yet.</p>
                      <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
                        <Link to="/tours">
                          Explore Tours
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
                
                <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
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
                          <p className="text-white/90">${item.price}</p>
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
                    <CardTitle>Your Travel History</CardTitle>
                    <CardDescription>View all your past trips and adventures</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center p-6 text-muted-foreground">
                      You haven't completed any trips yet.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Recommendations */}
              <TabsContent value="recommendations">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended For You</CardTitle>
                    <CardDescription>Tours and destinations you might like</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <img 
                          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
                          alt="Baobab Trees"
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold">Avenue of the Baobabs Tour</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin size={14} className="mr-1" /> Morondava
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            Experience the iconic Avenue of the Baobabs, one of Madagascar's most famous landmarks.
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-madagascar-green">$299</div>
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
                          <h3 className="font-semibold">Ranomafana National Park Expedition</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin size={14} className="mr-1" /> Ranomafana
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            Explore the lush rainforests of Ranomafana and spot rare species of lemurs, birds and chameleons.
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-madagascar-green">$389</div>
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
                        See All Tours
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
