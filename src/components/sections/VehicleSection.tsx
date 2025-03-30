
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import VehicleCard, { VehicleProps } from '@/components/VehicleCard';

interface VehicleSectionProps {
  vehicles: VehicleProps[];
}

const VehicleSection: React.FC<VehicleSectionProps> = ({ vehicles }) => {
  return (
    <section className="section-padding bg-gradient-to-b from-madagascar-blue to-madagascar-blue/80 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore Your Way</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Choose from our fleet of well-maintained vehicles for the perfect Madagascar adventure
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-white/10">
              <TabsTrigger value="all">All Vehicles</TabsTrigger>
              <TabsTrigger value="4x4">4x4</TabsTrigger>
              <TabsTrigger value="car">Cars</TabsTrigger>
              <TabsTrigger value="motorcycle">Motorcycles</TabsTrigger>
              <TabsTrigger value="quad">Quads</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="4x4" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.filter(v => v.type === '4x4').map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="motorcycle" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.filter(v => v.type === 'motorcycle').map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="quad" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.filter(v => v.type === 'quad').map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10 text-center">
          <Button asChild className="bg-white hover:bg-white/90 text-madagascar-blue">
            <a href="/services/car-rental">
              View All Vehicles <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VehicleSection;
