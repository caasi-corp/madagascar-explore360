
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { VehicleProps } from '@/components/VehicleCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const VehicleEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [vehicle, setVehicle] = useState<VehicleProps>({
    id: '',
    name: '',
    type: 'car',
    pricePerDay: 0,
    seats: 1,
    transmission: 'Manual',
    fuelType: 'Essence',
    image: '',
    features: [],
    availability: true,
  });
  
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    if (isEditing) {
      // In a real application, fetch the vehicle data from API
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        // Mock data - this would come from your API
        setVehicle({
          id: 'v1',
          name: 'Toyota Land Cruiser',
          type: '4x4',
          pricePerDay: 89,
          seats: 7,
          transmission: 'Automatic',
          fuelType: 'Diesel',
          image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
          features: ['Climatisation', 'GPS', 'Porte-bagages', '4x4', 'Bluetooth', 'Ports USB'],
          availability: true,
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [id, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSelectChange = (name: keyof VehicleProps, value: string) => {
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleNumberChange = (name: keyof VehicleProps, value: string) => {
    setVehicle({ ...vehicle, [name]: Number(value) });
  };

  const handleSwitchChange = (name: keyof VehicleProps, checked: boolean) => {
    setVehicle({ ...vehicle, [name]: checked });
  };

  const addFeature = () => {
    if (featureInput.trim() !== '') {
      setVehicle({
        ...vehicle,
        features: [...vehicle.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setVehicle({
      ...vehicle,
      features: vehicle.features.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // In a real application, send data to API
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        isEditing ? 'Véhicule mis à jour avec succès!' : 'Véhicule ajouté avec succès!', 
        { description: `Le véhicule "${vehicle.name}" a été ${isEditing ? 'mis à jour' : 'ajouté'}.` }
      );
      // Would typically redirect back to vehicles list
    }, 1500);
  };

  return (
    <AnimatedContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Modifier le Véhicule' : 'Ajouter un Véhicule'}
        </h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-madagascar-green"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom du Véhicule</Label>
                    <Input
                      id="name"
                      name="name"
                      value={vehicle.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Type de Véhicule</Label>
                    <Select
                      value={vehicle.type}
                      onValueChange={(value) => handleSelectChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Voiture</SelectItem>
                        <SelectItem value="4x4">4x4</SelectItem>
                        <SelectItem value="motorcycle">Moto</SelectItem>
                        <SelectItem value="quad">Quad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="pricePerDay">Prix par jour (€)</Label>
                    <Input
                      id="pricePerDay"
                      name="pricePerDay"
                      type="number"
                      min="0"
                      value={vehicle.pricePerDay}
                      onChange={(e) => handleNumberChange('pricePerDay', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="seats">Nombre de places</Label>
                    <Input
                      id="seats"
                      name="seats"
                      type="number"
                      min="1"
                      value={vehicle.seats}
                      onChange={(e) => handleNumberChange('seats', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                {/* Additional Info Section */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select
                      value={vehicle.transmission}
                      onValueChange={(value) => handleSelectChange('transmission', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automatic">Automatique</SelectItem>
                        <SelectItem value="Manual">Manuelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="fuelType">Type de carburant</Label>
                    <Select
                      value={vehicle.fuelType}
                      onValueChange={(value) => handleSelectChange('fuelType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Essence">Essence</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Hybrid">Hybride</SelectItem>
                        <SelectItem value="Electric">Électrique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="image">URL de l'image</Label>
                    <Input
                      id="image"
                      name="image"
                      value={vehicle.image}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="availability"
                      checked={vehicle.availability}
                      onCheckedChange={(checked) => handleSwitchChange('availability', checked)}
                    />
                    <Label htmlFor="availability">Disponible</Label>
                  </div>
                </div>
              </div>
              
              {/* Features Section */}
              <div className="space-y-2">
                <Label>Caractéristiques</Label>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Ajouter une caractéristique"
                  />
                  <Button type="button" variant="outline" onClick={addFeature}>
                    Ajouter
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {vehicle.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="bg-muted/50 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {feature}
                      <button
                        type="button"
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => removeFeature(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-madagascar-green hover:bg-madagascar-green/80"
                  disabled={formSubmitted && isLoading}
                >
                  {isLoading ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default VehicleEditor;
