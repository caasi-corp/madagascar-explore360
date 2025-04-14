
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import VehicleCard from '@/components/VehicleCard';
import { VehicleProps } from '@/hooks/useVehicles';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface VehicleSectionProps {
  vehicles: {
    vehicles: VehicleProps[];
    loading: boolean;
    error: string | null;
  };
}

const VehicleSection: React.FC<VehicleSectionProps> = ({ vehicles }) => {
  const { vehicles: vehiclesList, loading, error } = vehicles;

  return (
    <section className="section-padding bg-gradient-to-b from-madagascar-blue to-madagascar-blue/80 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Explorez à Votre Façon</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Choisissez parmi notre flotte de véhicules bien entretenus pour votre aventure parfaite à Madagascar
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6 bg-white/10 border-white/20 text-white">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-white/10">
                <TabsTrigger value="all">Tous les véhicules</TabsTrigger>
                <TabsTrigger value="4x4">4x4</TabsTrigger>
                <TabsTrigger value="car">Voitures</TabsTrigger>
                <TabsTrigger value="motorcycle">Motos</TabsTrigger>
                <TabsTrigger value="quad">Quads</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehiclesList.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="4x4" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehiclesList.filter(v => v.type === '4x4').map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="motorcycle" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehiclesList.filter(v => v.type === 'motorcycle').map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="quad" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehiclesList.filter(v => v.type === 'quad').map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="car" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehiclesList.filter(v => v.type === 'car').map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        <div className="mt-10 text-center">
          <Button asChild className="bg-white hover:bg-white/90 text-madagascar-blue">
            <a href="/services/car-rental">
              Voir tous les véhicules <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VehicleSection;
