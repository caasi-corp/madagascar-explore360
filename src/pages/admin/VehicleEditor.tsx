
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminVehicleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  const [vehicle, setVehicle] = useState({
    name: '',
    type: '',
    transmission: 'Automatique',
    fuelType: 'Essence',
    pricePerDay: 0,
    seats: 1,
    image: '',
    description: '',
    features: '',
    available: true
  });

  useEffect(() => {
    if (isEditMode) {
      // Dans une vraie application, nous ferions un appel API pour récupérer les données du véhicule
      // Ici, nous simulons des données pour l'exemple
      setVehicle({
        name: 'Toyota Land Cruiser',
        type: '4x4',
        transmission: 'Automatique',
        fuelType: 'Diesel',
        pricePerDay: 89,
        seats: 7,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
        description: 'Véhicule robuste et fiable pour tous vos déplacements à Madagascar.',
        features: 'Climatisation, GPS, Porte-bagages, 4x4, Bluetooth, Ports USB',
        available: true
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: name === 'pricePerDay' || name === 'seats' ? Number(value) : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setVehicle({
      ...vehicle,
      [name]: value
    });
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setVehicle({
      ...vehicle,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de l'enregistrement
    setTimeout(() => {
      toast({
        title: isEditMode ? "Véhicule mis à jour" : "Véhicule créé",
        description: isEditMode 
          ? `Le véhicule ${vehicle.name} a été mis à jour avec succès`
          : `Le véhicule ${vehicle.name} a été ajouté avec succès`,
        variant: "default",
      });
      
      navigate('/admin/vehicles');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/admin/vehicles">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditMode ? `Modifier le véhicule` : 'Ajouter un véhicule'}
          </h1>
        </div>
        <Button type="submit" form="vehicle-form" className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du véhicule</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="vehicle-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du véhicule</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={vehicle.name} 
                  onChange={handleChange} 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type de véhicule</Label>
                <Select 
                  value={vehicle.type} 
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4x4">4x4</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Berline">Berline</SelectItem>
                    <SelectItem value="Moto">Moto</SelectItem>
                    <SelectItem value="Quad">Quad</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select 
                  value={vehicle.transmission} 
                  onValueChange={(value) => handleSelectChange('transmission', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Automatique">Automatique</SelectItem>
                    <SelectItem value="Manuelle">Manuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Carburant</Label>
                <Select 
                  value={vehicle.fuelType} 
                  onValueChange={(value) => handleSelectChange('fuelType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Essence">Essence</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybride">Hybride</SelectItem>
                    <SelectItem value="Électrique">Électrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerDay">Prix par jour (€)</Label>
                <Input 
                  id="pricePerDay" 
                  name="pricePerDay" 
                  type="number" 
                  min="0" 
                  value={vehicle.pricePerDay} 
                  onChange={handleChange} 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seats">Nombre de places</Label>
                <Input 
                  id="seats" 
                  name="seats" 
                  type="number" 
                  min="1" 
                  value={vehicle.seats} 
                  onChange={handleChange} 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">URL de l'image</Label>
                <Input 
                  id="image" 
                  name="image" 
                  value={vehicle.image} 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-2 flex items-center justify-between">
                <Label htmlFor="available">Disponible</Label>
                <Switch 
                  id="available"
                  checked={vehicle.available}
                  onCheckedChange={(checked) => handleSwitchChange('available', checked)}
                />
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={vehicle.description} 
                  onChange={handleChange} 
                  rows={4}
                />
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="features">Caractéristiques (séparées par des virgules)</Label>
                <Textarea 
                  id="features" 
                  name="features" 
                  value={vehicle.features} 
                  onChange={handleChange} 
                  rows={3}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVehicleEditor;
