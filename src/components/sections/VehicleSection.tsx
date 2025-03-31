
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import VehicleCard, { VehicleProps } from '@/components/VehicleCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface VehicleSectionProps {
  vehicles: VehicleProps[];
}

const VehicleSection: React.FC<VehicleSectionProps> = ({ vehicles }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [displayedVehicles, setDisplayedVehicles] = useState<VehicleProps[]>(vehicles);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (activeTab === 'all') {
      setDisplayedVehicles(vehicles);
    } else {
      setDisplayedVehicles(vehicles.filter(v => v.type === activeTab));
    }
  }, [activeTab, vehicles]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-madagascar-blue to-madagascar-blue/80 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Explorez à Votre Façon</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Choisissez parmi notre flotte de véhicules bien entretenus pour votre aventure parfaite à Madagascar
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
          <div className="flex justify-center mb-6 overflow-x-auto pb-2">
            <TabsList className="bg-white/10">
              <TabsTrigger value="all">Tous les véhicules</TabsTrigger>
              <TabsTrigger value="4x4">4x4</TabsTrigger>
              <TabsTrigger value="car">Voitures</TabsTrigger>
              <TabsTrigger value="motorcycle">Motos</TabsTrigger>
              <TabsTrigger value="quad">Quads</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mt-2">
            {displayedVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedVehicles.map((vehicle, index) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-white/80">
                  Aucun véhicule de type {activeTab === 'all' ? '' : activeTab} disponible pour le moment.
                </p>
              </div>
            )}
          </div>
        </Tabs>
        
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
