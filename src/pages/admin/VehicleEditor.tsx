
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, Save } from 'lucide-react';

const AdminVehicleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = Boolean(id);
  
  const [vehicleData, setVehicleData] = useState({
    name: id ? 'Toyota Hilux' : '',
    type: id ? 'SUV' : '',
    seats: id ? 5 : 2,
    transmission: id ? 'Manuel' : 'Manuel',
    pricePerDay: id ? 80 : 0,
    description: id ? 'Véhicule 4x4 idéal pour les terrains difficiles de Madagascar.' : '',
    features: id ? ['Climatisation', '4x4', 'GPS', 'Bluetooth'] : [],
    available: true,
    featured: false,
    images: id ? ['vehicle1.jpg', 'vehicle2.jpg'] : []
  });

  const handleChange = (field: string, value: any) => {
    setVehicleData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simule un appel API pour sauvegarder le véhicule
    setTimeout(() => {
      toast({
        title: isEditMode ? "Véhicule mis à jour" : "Véhicule créé",
        description: `${vehicleData.name} a été ${isEditMode ? 'mis à jour' : 'ajouté'} avec succès.`,
      });
      navigate('/admin/vehicles');
    }, 500);
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
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={vehicleData.description} 
                  onChange={(e) => handleChange('description', e.target.value)} 
                  placeholder="Description du véhicule..."
                  rows={4}
                />
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
