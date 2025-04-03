
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, Save, Plus, X } from 'lucide-react';
import { vehicleAPI } from '@/lib/api/vehicleAPI';
import { Badge } from '@/components/ui/badge';

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

  const [newFeature, setNewFeature] = useState('');

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

  const handleAddFeature = () => {
    if (newFeature.trim() && !vehicleData.features.includes(newFeature.trim())) {
      setVehicleData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setVehicleData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
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
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du véhicule</Label>
                <Input 
                  id="name" 
                  value={vehicleData.name} 
                  onChange={(e) => handleChange('name', e.target.value)} 
                  placeholder="Ex: Toyota Hilux"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type de véhicule</Label>
                  <Select 
                    value={vehicleData.type} 
                    onValueChange={(value) => handleChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Compact">Compact</SelectItem>
                      <SelectItem value="Berline">Berline</SelectItem>
                      <SelectItem value="Minibus">Minibus</SelectItem>
                      <SelectItem value="4x4">4x4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select 
                    value={vehicleData.transmission} 
                    onValueChange={(value) => handleChange('transmission', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manuel">Manuel</SelectItem>
                      <SelectItem value="Automatique">Automatique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seats">Nombre de places</Label>
                  <Input 
                    id="seats" 
                    type="number" 
                    min={1}
                    value={vehicleData.seats} 
                    onChange={(e) => handleChange('seats', parseInt(e.target.value))} 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Prix par jour (€)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    min={0}
                    value={vehicleData.pricePerDay} 
                    onChange={(e) => handleChange('pricePerDay', parseInt(e.target.value))} 
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Type de carburant</Label>
                <Select 
                  value={vehicleData.fuelType} 
                  onValueChange={(value) => handleChange('fuelType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Essence">Essence</SelectItem>
                    <SelectItem value="Hybride">Hybride</SelectItem>
                    <SelectItem value="Électrique">Électrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={vehicleData.description} 
                  onChange={(e) => handleChange('description', e.target.value)} 
                  placeholder="Description du véhicule..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Caractéristiques</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {vehicleData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveFeature(feature)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Ajouter une caractéristique"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                  />
                  <Button type="button" size="icon" onClick={handleAddFeature}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="available">Disponible</Label>
                  <div className="text-sm text-muted-foreground">Le véhicule peut être réservé</div>
                </div>
                <Switch 
                  id="available" 
                  checked={vehicleData.available} 
                  onCheckedChange={(checked) => handleChange('available', checked)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="featured">Mettre en avant</Label>
                  <div className="text-sm text-muted-foreground">Afficher sur la page d'accueil</div>
                </div>
                <Switch 
                  id="featured" 
                  checked={vehicleData.featured} 
                  onCheckedChange={(checked) => handleChange('featured', checked)} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? 'Mettre à jour le véhicule' : 'Ajouter le véhicule'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default AdminVehicleEditor;
