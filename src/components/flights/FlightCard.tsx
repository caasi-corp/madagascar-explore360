
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plane, ArrowRight, Clock, Users, Calendar } from 'lucide-react';
import { Flight } from '@/lib/db/schema';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  // Calculer la durée de vol approximative
  const calculateDuration = (departure: string, arrival: string) => {
    const [departureHours, departureMinutes] = departure.split(':').map(Number);
    const [arrivalHours, arrivalMinutes] = arrival.split(':').map(Number);
    
    let durationHours = arrivalHours - departureHours;
    let durationMinutes = arrivalMinutes - departureMinutes;
    
    if (durationMinutes < 0) {
      durationHours -= 1;
      durationMinutes += 60;
    }
    
    if (durationHours < 0) {
      durationHours += 24;
    }
    
    return `${durationHours}h ${durationMinutes}min`;
  };

  const getAvailabilityColor = (seats: number) => {
    if (seats === 0) return 'bg-red-100 text-red-700';
    if (seats < 10) return 'bg-amber-100 text-amber-700';
    return 'bg-green-100 text-green-700';
  };

  const duration = calculateDuration(flight.departureTime, flight.arrivalTime);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline" className="font-semibold">
            {flight.airline}
          </Badge>
          <Badge 
            variant="outline" 
            className={`${getAvailabilityColor(flight.availableSeats)}`}
          >
            {flight.availableSeats === 0 
              ? 'Complet' 
              : flight.availableSeats < 10 
                ? `${flight.availableSeats} places restantes` 
                : 'Disponible'}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">{flight.departureTime}</span>
            <span className="text-sm text-muted-foreground line-clamp-1">{flight.departure}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full flex items-center justify-center">
              <div className="w-full h-px bg-gray-300"></div>
              <div className="absolute">
                <Plane className="h-5 w-5 transform rotate-90 text-madagascar-green" />
              </div>
              <div className="absolute -bottom-5">
                <span className="text-xs text-muted-foreground">{duration}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">{flight.arrivalTime}</span>
            <span className="text-sm text-muted-foreground line-clamp-1">{flight.arrival}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-between text-sm text-muted-foreground">
          <div className="flex items-center mr-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{flight.departureDate}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{flight.availableSeats} sièges disponibles</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="text-xl font-bold">{flight.price}€</div>
        <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Link to={`/flights/${flight.id}/book`}>Réserver</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FlightCard;
