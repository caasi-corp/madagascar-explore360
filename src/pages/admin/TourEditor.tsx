
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
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminTourEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  const [tour, setTour] = useState({
    name: '',
    category: '',
    duration: 1,
    price: 0,
    description: '',
    shortDescription: '',
    location: '',
    image: '',
    featured: false,
    active: true
  });

  const [itinerary, setItinerary] = useState([
    { day: 1, title: '', description: '' }
  ]);

  const [includes, setIncludes] = useState<string[]>(['Transport', 'Guide francophone']);
  const [excludes, setExcludes] = useState<string[]>(['Pourboires', 'Dépenses personnelles']);

  useEffect(() => {
    if (isEditMode) {
      // Dans une vraie application, nous ferions un appel API pour récupérer les données du circuit
      // Ici, nous simulons des données pour l'exemple
      setTour({
        name: 'Avenue des Baobabs',
        category: 'Nature',
        duration: 3,
        price: 599,
        description: 'Découvrez l\'emblématique Allée des Baobabs, l\'un des sites les plus célèbres de Madagascar. Ce circuit vous permettra d\'observer ces arbres majestueux au coucher du soleil, offrant une vue spectaculaire.',
        shortDescription: 'Une expérience unique avec les baobabs emblématiques de Madagascar',
        location: 'Morondava',
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
        featured: true,
        active: true
      });

      setItinerary([
        { 
          day: 1, 
          title: 'Arrivée à Morondava', 
          description: 'Arrivée à Morondava et transfert à l\'hôtel. Temps libre pour vous reposer et vous préparer pour l\'aventure.' 
        },
        { 
          day: 2, 
          title: 'Exploration de l\'Allée des Baobabs', 
          description: 'Départ matinal pour l\'Allée des Baobabs. Photographie et exploration du site. Coucher de soleil parmi les baobabs.' 
        },
        { 
          day: 3, 
          title: 'Retour à Morondava', 
          description: 'Temps libre à Morondava. Visite du marché local. Départ.' 
        }
      ]);
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTour({
      ...tour,
      [name]: name === 'duration' || name === 'price' ? Number(value) : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setTour({
      ...tour,
      [name]: value
    });
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setTour({
      ...tour,
      [name]: value
    });
  };

  const handleItineraryChange = (index: number, field: string, value: string) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[index] = { 
      ...updatedItinerary[index], 
      [field]: field === 'day' ? Number(value) : value 
    };
    setItinerary(updatedItinerary);
  };

  const addItineraryDay = () => {
    const newDay = itinerary.length > 0 ? itinerary[itinerary.length - 1].day + 1 : 1;
    setItinerary([...itinerary, { day: newDay, title: '', description: '' }]);
  };

  const removeItineraryDay = (index: number) => {
    if (itinerary.length > 1) {
      const updatedItinerary = itinerary.filter((_, i) => i !== index);
      setItinerary(updatedItinerary);
    }
  };

  const handleItemChange = (index: number, value: string, type: 'includes' | 'excludes') => {
    if (type === 'includes') {
      const updatedIncludes = [...includes];
      updatedIncludes[index] = value;
      setIncludes(updatedIncludes);
    } else {
      const updatedExcludes = [...excludes];
      updatedExcludes[index] = value;
      setExcludes(updatedExcludes);
    }
  };

  const addItem = (type: 'includes' | 'excludes') => {
    if (type === 'includes') {
      setIncludes([...includes, '']);
    } else {
      setExcludes([...excludes, '']);
    }
  };

  const removeItem = (index: number, type: 'includes' | 'excludes') => {
    if (type === 'includes' && includes.length > 1) {
      const updatedIncludes = includes.filter((_, i) => i !== index);
      setIncludes(updatedIncludes);
    } else if (type === 'excludes' && excludes.length > 1) {
      const updatedExcludes = excludes.filter((_, i) => i !== index);
      setExcludes(updatedExcludes);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de l'enregistrement
    setTimeout(() => {
      toast({
        title: isEditMode ? "Circuit mis à jour" : "Circuit créé",
        description: isEditMode 
          ? `Le circuit ${tour.name} a été mis à jour avec succès`
          : `Le circuit ${tour.name} a été ajouté avec succès`,
        variant: "default",
      });
      
      navigate('/admin/tours');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/admin/tours">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditMode ? `Modifier le circuit: ${tour.name}` : 'Ajouter un circuit'}
          </h1>
        </div>
        <Button type="submit" form="tour-form" className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>

      <form id="tour-form" onSubmit={handleSubmit}>
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Informations générales</TabsTrigger>
            <TabsTrigger value="itinerary">Itinéraire</TabsTrigger>
            <TabsTrigger value="details">Détails</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Informations du circuit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du circuit</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={tour.name} 
                      onChange={handleChange} 
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select 
                      value={tour.category} 
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nature">Nature</SelectItem>
                        <SelectItem value="Aventure">Aventure</SelectItem>
                        <SelectItem value="Plage">Plage</SelectItem>
                        <SelectItem value="Culture">Culture</SelectItem>
                        <SelectItem value="Faune">Faune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Lieu</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={tour.location} 
                      onChange={handleChange} 
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">URL de l'image</Label>
                    <Input 
                      id="image" 
                      name="image" 
                      value={tour.image} 
                      onChange={handleChange} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Durée (jours)</Label>
                    <Input 
                      id="duration" 
                      name="duration" 
                      type="number" 
                      min="1" 
                      value={tour.duration} 
                      onChange={handleChange} 
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€)</Label>
                    <Input 
                      id="price" 
                      name="price" 
                      type="number" 
                      min="0" 
                      value={tour.price} 
                      onChange={handleChange} 
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between col-span-1 md:col-span-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Mis en avant</Label>
                      <p className="text-sm text-muted-foreground">Afficher ce circuit sur la page d'accueil</p>
                    </div>
                    <Switch 
                      id="featured"
                      checked={tour.featured}
                      onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between col-span-1 md:col-span-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="active">Actif</Label>
                      <p className="text-sm text-muted-foreground">Ce circuit peut être réservé</p>
                    </div>
                    <Switch 
                      id="active"
                      checked={tour.active}
                      onCheckedChange={(checked) => handleSwitchChange('active', checked)}
                    />
                  </div>

                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <Label htmlFor="shortDescription">Description courte</Label>
                    <Textarea 
                      id="shortDescription" 
                      name="shortDescription" 
                      value={tour.shortDescription} 
                      onChange={handleChange} 
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <Label htmlFor="description">Description complète</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={tour.description} 
                      onChange={handleChange} 
                      rows={6}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="itinerary">
            <Card>
              <CardHeader>
                <CardTitle>Itinéraire du circuit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {itinerary.map((day, index) => (
                  <div key={index} className="space-y-4 border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Jour {day.day}</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeItineraryDay(index)} 
                        disabled={itinerary.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`day-title-${index}`}>Titre</Label>
                        <Input 
                          id={`day-title-${index}`}
                          value={day.title}
                          onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`day-number-${index}`}>Numéro du jour</Label>
                        <Input 
                          id={`day-number-${index}`}
                          type="number"
                          min="1"
                          value={day.day}
                          onChange={(e) => handleItineraryChange(index, 'day', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`day-description-${index}`}>Description</Label>
                      <Textarea 
                        id={`day-description-${index}`}
                        value={day.description}
                        onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addItineraryDay} 
                  className="mt-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un jour
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Détails du circuit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ce qui est inclus</h3>
                  {includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value, 'includes')}
                        placeholder="Ex: Transport, Guide, etc."
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeItem(index, 'includes')} 
                        disabled={includes.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => addItem('includes')} 
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un élément inclus
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ce qui n'est pas inclus</h3>
                  {excludes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value, 'excludes')}
                        placeholder="Ex: Pourboires, Dépenses personnelles, etc."
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeItem(index, 'excludes')} 
                        disabled={excludes.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => addItem('excludes')} 
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un élément non inclus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default AdminTourEditor;
