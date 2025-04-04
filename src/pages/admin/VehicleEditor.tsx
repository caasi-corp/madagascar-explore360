
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft } from 'lucide-react';
import { vehicleAPI } from '@/lib/api/vehicleAPI';
import VehicleBasicInfo from '@/components/admin/vehicles/VehicleBasicInfo';
import VehicleFeatures from '@/components/admin/vehicles/VehicleFeatures';
import VehicleSettings from '@/components/admin/vehicles/VehicleSettings';

const AdminVehicleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = Boolean(id);
  
  const [vehicleData, setVehicleData] = useState({
    name: '',
    type: '',
    seats: 2,
    transmission: 'Manuel',
    pricePerDay: 0,
    description: '',
    features: [] as string[],
    available: true,
    featured: false,
    images: [] as string[],
    fuelType: ''
  });

  // Fetch vehicle data when editing an existing vehicle
  useEffect(() => {
    const fetchVehicleData = async () => {
      if (id) {
        try {
          const vehicle = await vehicleAPI.getById(id);
          if (vehicle) {
            setVehicleData({
              name: vehicle.name || '',
              type: vehicle.type || '',
              seats: vehicle.seats || 2,
              transmission: vehicle.transmission || 'Manuel',
              pricePerDay: vehicle.pricePerDay || 0,
              description: vehicle.description || '',
              features: vehicle.features || [],
              available: vehicle.availability !== undefined ? vehicle.availability : true,
              featured: vehicle.featured !== undefined ? vehicle.featured : false,
              images: vehicle.images || [],
              fuelType: vehicle.fuelType || ''
            });
          }
        } catch (error) {
          console.error('Error fetching vehicle data:', error);
          toast({
            title: "Erreur",
            description: "Impossible de récupérer les données du véhicule.",
            variant: "destructive"
          });
        }
      }
    };

    fetchVehicleData();
  }, [id, toast]);

  const handleChange = (field: string, value: any) => {
    setVehicleData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeaturesChange = (features: string[]) => {
    setVehicleData(prev => ({ ...prev, features }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const vehicleToSave = {
        name: vehicleData.name,
        type: vehicleData.type as 'car' | '4x4' | 'motorcycle' | 'quad',
        pricePerDay: vehicleData.pricePerDay,
        seats: vehicleData.seats,
        transmission: vehicleData.transmission as 'Automatic' | 'Manual',
        fuelType: vehicleData.fuelType,
        image: vehicleData.images[0] || 'placeholder.svg',
        features: vehicleData.features,
        availability: vehicleData.available,
      };

      if (isEditMode && id) {
        await vehicleAPI.update(id, vehicleToSave);
      } else {
        await vehicleAPI.add(vehicleToSave);
      }

      toast({
        title: isEditMode ? "Véhicule mis à jour" : "Véhicule créé",
        description: `${vehicleData.name} a été ${isEditMode ? 'mis à jour' : 'ajouté'} avec succès.`,
      });
      navigate('/admin/vehicles');
    } catch (error) {
      console.error('Error saving vehicle:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du véhicule.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{isEditMode ? 'Modifier le Véhicule' : 'Ajouter un Véhicule'}</h1>
        <Button variant="outline" onClick={() => navigate('/admin/vehicles')}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2">
            <CardContent className="pt-6">
              <VehicleBasicInfo 
                name={vehicleData.name}
                type={vehicleData.type}
                seats={vehicleData.seats}
                transmission={vehicleData.transmission}
                pricePerDay={vehicleData.pricePerDay}
                description={vehicleData.description}
                fuelType={vehicleData.fuelType}
                handleChange={handleChange}
              />
              
              <div className="mt-6">
                <VehicleFeatures 
                  features={vehicleData.features}
                  onFeaturesChange={handleFeaturesChange}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <VehicleSettings
              available={vehicleData.available}
              featured={vehicleData.featured}
              isEditMode={isEditMode}
              handleChange={handleChange}
            />
          </Card>
        </div>
      </form>
    </div>
  );
};

export default AdminVehicleEditor;
