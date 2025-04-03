
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Save,
  ChevronLeft,
  Image,
  Plus,
  MapPin,
  Clock,
  Calendar,
  Users,
  Tag,
  X,
  PlusCircle,
  ArrowUp,
  ArrowDown,
  FileImage,
  Upload,
  Trash2
} from 'lucide-react';

// Types pour l'éditeur de circuit
interface TourDetails {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  destination: string;
  locations: string[];
  duration: number;
  price: number;
  discount?: number;
  maxParticipants: number;
  minParticipants: number;
  featured: boolean;
  status: 'active' | 'draft' | 'archived';
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  inclusions: string[];
  exclusions: string[];
  images: { url: string, alt: string }[];
  itinerary: { day: number, title: string, description: string, accommodation: string }[];
  dates: { startDate: string, endDate: string, availability: 'available' | 'limited' | 'full' }[];
}

const AdminTourEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewTour = !id || id === 'new';
  
  // État pour les données du circuit
  const [tour, setTour] = useState<TourDetails>({
    id: isNewTour ? 'T' + Date.now().toString().slice(-6) : id,
    name: isNewTour ? '' : 'Avenue des Baobabs',
    description: isNewTour ? '' : `Découvrez l'emblématique Avenue des Baobabs, l'un des sites les plus célèbres de Madagascar. Ces arbres majestueux, certains vieux de plus de 800 ans, créent un paysage à couper le souffle, particulièrement au lever et au coucher du soleil.

Ce circuit de 3 jours vous offre l'opportunité d'explorer non seulement l'Avenue des Baobabs, mais aussi les environs de Morondava, avec ses villages traditionnels et sa culture locale authentique.`,
    shortDescription: isNewTour ? '' : 'Explorez la majestueuse Avenue des Baobabs et découvrez les environs de Morondava lors de cette excursion de 3 jours.',
    destination: isNewTour ? '' : 'Morondava',
    locations: isNewTour ? [] : ['Avenue des Baobabs', 'Morondava', 'Villages Sakalava'],
    duration: isNewTour ? 1 : 3,
    price: isNewTour ? 0 : 299,
    discount: isNewTour ? undefined : 0,
    maxParticipants: isNewTour ? 1 : 12,
    minParticipants: isNewTour ? 1 : 2,
    featured: isNewTour ? false : true,
    status: isNewTour ? 'draft' : 'active',
    category: isNewTour ? '' : 'Nature',
    tags: isNewTour ? [] : ['Baobabs', 'Coucher de soleil', 'Photographie', 'Culture locale'],
    seoTitle: isNewTour ? '' : 'Circuit Avenue des Baobabs | North Madagascar Tours',
    seoDescription: isNewTour ? '' : 'Découvrez l\'Avenue des Baobabs à Madagascar avec notre circuit de 3 jours. Paysages extraordinaires et culture locale au programme.',
    seoKeywords: isNewTour ? '' : 'avenue des baobabs, morondava, madagascar, circuit, baobabs, coucher de soleil',
    inclusions: isNewTour ? [] : [
      'Transport en 4x4 climatisé',
      'Guide francophone',
      'Hébergement en pension complète',
      'Eau minérale pendant les trajets',
      'Frais d\'entrée dans les parcs et réserves'
    ],
    exclusions: isNewTour ? [] : [
      'Vols internationaux',
      'Boissons supplémentaires',
      'Pourboires',
      'Assurance voyage'
    ],
    images: isNewTour ? [] : [
      { url: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb', alt: 'Avenue des Baobabs au coucher du soleil' },
      { url: 'https://images.unsplash.com/photo-1629837266761-019a5fa91951', alt: 'Baobabs majestueux' },
      { url: 'https://images.unsplash.com/photo-1670064256758-27e86b684600', alt: 'Village traditionnel près de Morondava' }
    ],
    itinerary: isNewTour ? [{ day: 1, title: '', description: '', accommodation: '' }] : [
      {
        day: 1,
        title: 'Arrivée à Morondava',
        description: 'Accueil à l\'aéroport ou à votre hôtel à Morondava. Briefing sur le circuit et présentation du guide. Temps libre pour découvrir la ville côtière de Morondava. Dîner et nuit à l\'hôtel.',
        accommodation: 'Palissandre Côte West, Morondava'
      },
      {
        day: 2,
        title: 'Avenue des Baobabs et villages traditionnels',
        description: 'Après le petit-déjeuner, visite de la ville de Morondava. Déjeuner, puis départ pour l\'Avenue des Baobabs. Visite de villages traditionnels Sakalava en chemin. Arrivée à l\'Avenue des Baobabs en fin d\'après-midi pour admirer le coucher du soleil. Dîner et nuit à l\'hôtel.',
        accommodation: 'Palissandre Côte West, Morondava'
      },
      {
        day: 3,
        title: 'Baobabs environnants et départ',
        description: 'Petit-déjeuner matinal, puis excursion pour découvrir d\'autres baobabs moins connus mais tout aussi impressionnants dans les environs. Retour à Morondava pour le déjeuner. Temps libre jusqu\'au transfert à l\'aéroport ou continuation de votre séjour.',
        accommodation: 'N/A'
      }
    ],
    dates: isNewTour ? [] : [
      { startDate: '2023-11-15', endDate: '2023-11-17', availability: 'available' },
      { startDate: '2023-11-25', endDate: '2023-11-27', availability: 'limited' },
      { startDate: '2023-12-10', endDate: '2023-12-12', availability: 'available' },
      { startDate: '2023-12-20', endDate: '2023-12-22', availability: 'full' }
    ]
  });

  // État pour le nouvel étage de l'itinéraire
  const [newItineraryDay, setNewItineraryDay] = useState({
    title: '',
    description: '',
    accommodation: ''
  });

  // État pour le nouvel emplacement
  const [newLocation, setNewLocation] = useState('');

  // État pour le nouveau tag
  const [newTag, setNewTag] = useState('');

  // État pour le nouvel élément d'inclusion/exclusion
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');

  // État pour les nouvelles dates
  const [newDate, setNewDate] = useState({
    startDate: '',
    endDate: '',
    availability: 'available' as 'available' | 'limited' | 'full'
  });

  // Gérer le changement d'un champ de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTour(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer le changement de statut
  const handleStatusChange = (status: string) => {
    setTour(prev => ({
      ...prev,
      status: status as 'active' | 'draft' | 'archived'
    }));
  };

  // Gérer le changement de catégorie
  const handleCategoryChange = (category: string) => {
    setTour(prev => ({
      ...prev,
      category
    }));
  };

  // Ajouter un emplacement
  const handleAddLocation = () => {
    if (!newLocation.trim()) return;
    
    setTour(prev => ({
      ...prev,
      locations: [...prev.locations, newLocation.trim()]
    }));
    setNewLocation('');
  };

  // Supprimer un emplacement
  const handleRemoveLocation = (index: number) => {
    setTour(prev => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index)
    }));
  };

  // Ajouter un tag
  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    setTour(prev => ({
      ...prev,
      tags: [...prev.tags, newTag.trim()]
    }));
    setNewTag('');
  };

  // Supprimer un tag
  const handleRemoveTag = (index: number) => {
    setTour(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  // Ajouter un jour à l'itinéraire
  const handleAddItineraryDay = () => {
    if (!newItineraryDay.title.trim() || !newItineraryDay.description.trim()) return;
    
    const nextDay = tour.itinerary.length + 1;
    
    setTour(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: nextDay,
          title: newItineraryDay.title,
          description: newItineraryDay.description,
          accommodation: newItineraryDay.accommodation
        }
      ]
    }));
    
    setNewItineraryDay({
      title: '',
      description: '',
      accommodation: ''
    });
  };

  // Supprimer un jour de l'itinéraire
  const handleRemoveItineraryDay = (index: number) => {
    const updatedItinerary = tour.itinerary
      .filter((_, i) => i !== index)
      .map((day, i) => ({
        ...day,
        day: i + 1
      }));
    
    setTour(prev => ({
      ...prev,
      itinerary: updatedItinerary
    }));
  };

  // Déplacer un jour d'itinéraire vers le haut
  const handleMoveItineraryDayUp = (index: number) => {
    if (index === 0) return;
    
    const updatedItinerary = [...tour.itinerary];
    [updatedItinerary[index - 1], updatedItinerary[index]] = [updatedItinerary[index], updatedItinerary[index - 1]];
    
    // Mettre à jour les numéros de jour
    const reorderedItinerary = updatedItinerary.map((day, i) => ({
      ...day,
      day: i + 1
    }));
    
    setTour(prev => ({
      ...prev,
      itinerary: reorderedItinerary
    }));
  };

  // Déplacer un jour d'itinéraire vers le bas
  const handleMoveItineraryDayDown = (index: number) => {
    if (index === tour.itinerary.length - 1) return;
    
    const updatedItinerary = [...tour.itinerary];
    [updatedItinerary[index], updatedItinerary[index + 1]] = [updatedItinerary[index + 1], updatedItinerary[index]];
    
    // Mettre à jour les numéros de jour
    const reorderedItinerary = updatedItinerary.map((day, i) => ({
      ...day,
      day: i + 1
    }));
    
    setTour(prev => ({
      ...prev,
      itinerary: reorderedItinerary
    }));
  };

  // Ajouter une inclusion
  const handleAddInclusion = () => {
    if (!newInclusion.trim()) return;
    
    setTour(prev => ({
      ...prev,
      inclusions: [...prev.inclusions, newInclusion.trim()]
    }));
    setNewInclusion('');
  };

  // Supprimer une inclusion
  const handleRemoveInclusion = (index: number) => {
    setTour(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  };

  // Ajouter une exclusion
  const handleAddExclusion = () => {
    if (!newExclusion.trim()) return;
    
    setTour(prev => ({
      ...prev,
      exclusions: [...prev.exclusions, newExclusion.trim()]
    }));
    setNewExclusion('');
  };

  // Supprimer une exclusion
  const handleRemoveExclusion = (index: number) => {
    setTour(prev => ({
      ...prev,
      exclusions: prev.exclusions.filter((_, i) => i !== index)
    }));
  };

  // Ajouter une date
  const handleAddDate = () => {
    if (!newDate.startDate || !newDate.endDate) return;
    
    setTour(prev => ({
      ...prev,
      dates: [...prev.dates, { ...newDate }]
    }));
    
    setNewDate({
      startDate: '',
      endDate: '',
      availability: 'available'
    });
  };

  // Supprimer une date
  const handleRemoveDate = (index: number) => {
    setTour(prev => ({
      ...prev,
      dates: prev.dates.filter((_, i) => i !== index)
    }));
  };

  // Ajouter une image (simulé)
  const handleAddImage = () => {
    // Dans une application réelle, cela impliquerait un téléchargement de fichier
    const placeholderImage = { 
      url: `https://source.unsplash.com/random/800x600?travel,madagascar&sig=${Date.now()}`, 
      alt: 'Image de circuit' 
    };
    
    setTour(prev => ({
      ...prev,
      images: [...prev.images, placeholderImage]
    }));
    
    toast.success("Image ajoutée avec succès");
  };

  // Supprimer une image
  const handleRemoveImage = (index: number) => {
    setTour(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation de base
    if (!tour.name.trim() || !tour.description.trim() || !tour.destination.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    if (tour.price <= 0) {
      toast.error("Le prix doit être supérieur à 0");
      return;
    }
    
    if (tour.itinerary.length === 0) {
      toast.error("Veuillez ajouter au moins un jour à l'itinéraire");
      return;
    }
    
    // Simuler une sauvegarde
    toast.success(isNewTour ? "Circuit créé avec succès" : "Circuit mis à jour avec succès");
    
    // Redirection après sauvegarde
    setTimeout(() => {
      navigate("/admin/tours");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-2" asChild>
            <Link to="/admin/tours">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isNewTour ? "Nouveau circuit" : `Modifier le circuit ${tour.name}`}
            </h1>
            <p className="text-muted-foreground">
              {isNewTour 
                ? "Créez un nouveau circuit ou une excursion" 
                : `ID: ${tour.id} • Dernière modification: ${new Date().toLocaleDateString()}`}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4 sm:mt-0 space-x-2">
          <Select value={tour.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="active">Publié</SelectItem>
              <SelectItem value="archived">Archivé</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Aperçu</Button>
          <Button className="bg-madagascar-green hover:bg-madagascar-green/80" onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="itinerary">Itinéraire</TabsTrigger>
          <TabsTrigger value="dates">Dates & Prix</TabsTrigger>
          <TabsTrigger value="media">Médias</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        {/* Onglet Général */}
        <TabsContent value="general">
          <Card>
            <form>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>
                  Informations de base sur le circuit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du circuit *</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={tour.name}
                    onChange={handleChange}
                    placeholder="ex: Avenue des Baobabs"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Description courte *</Label>
                  <Textarea 
                    id="shortDescription"
                    name="shortDescription"
                    value={tour.shortDescription}
                    onChange={handleChange}
                    placeholder="Une brève description qui apparaîtra dans les listes et résumés"
                    rows={2}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description complète *</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={tour.description}
                    onChange={handleChange}
                    placeholder="Description détaillée du circuit"
                    rows={6}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination principale *</Label>
                    <Input 
                      id="destination"
                      name="destination"
                      value={tour.destination}
                      onChange={handleChange}
                      placeholder="ex: Morondava"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select value={tour.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nature">Nature</SelectItem>
                        <SelectItem value="Aventure">Aventure</SelectItem>
                        <SelectItem value="Plage">Plage</SelectItem>
                        <SelectItem value="Culture">Culture</SelectItem>
                        <SelectItem value="Randonnée">Randonnée</SelectItem>
                        <SelectItem value="Circuit">Circuit</SelectItem>
                        <SelectItem value="Photographie">Photographie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Emplacements</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tour.locations.map((location, index) => (
                      <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
                        <span>{location}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 ml-1 hover:bg-muted-foreground/20"
                          onClick={() => handleRemoveLocation(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="Ajouter un emplacement"
                    />
                    <Button type="button" onClick={handleAddLocation}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tour.tags.map((tag, index) => (
                      <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
                        <span>{tag}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 ml-1 hover:bg-muted-foreground/20"
                          onClick={() => handleRemoveTag(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Ajouter un tag"
                    />
                    <Button type="button" onClick={handleAddTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured"
                    checked={tour.featured}
                    onCheckedChange={(checked) => setTour(prev => ({ ...prev, featured: checked === true }))}
                  />
                  <Label htmlFor="featured">Mettre ce circuit en vedette sur la page d'accueil</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-madagascar-green hover:bg-madagascar-green/80" onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        {/* Onglet Détails */}
        <TabsContent value="details">
          <Card>
            <form>
              <CardHeader>
                <CardTitle>Détails du circuit</CardTitle>
                <CardDescription>
                  Informations détaillées, inclusions et exclusions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Durée (jours) *</Label>
                    <Input 
                      id="duration"
                      name="duration"
                      type="number"
                      min="1"
                      value={tour.duration}
                      onChange={(e) => setTour(prev => ({ ...prev, duration: Number(e.target.value) }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minParticipants">Minimum de participants</Label>
                    <Input 
                      id="minParticipants"
                      name="minParticipants"
                      type="number"
                      min="1"
                      value={tour.minParticipants}
                      onChange={(e) => setTour(prev => ({ ...prev, minParticipants: Number(e.target.value) }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Maximum de participants</Label>
                    <Input 
                      id="maxParticipants"
                      name="maxParticipants"
                      type="number"
                      min="1"
                      value={tour.maxParticipants}
                      onChange={(e) => setTour(prev => ({ ...prev, maxParticipants: Number(e.target.value) }))}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Inclusions</h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {tour.inclusions.map((item, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <span className="text-sm">{item}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-muted-foreground/20"
                          onClick={() => handleRemoveInclusion(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex gap-2">
                    <Input
                      value={newInclusion}
                      onChange={(e) => setNewInclusion(e.target.value)}
                      placeholder="Ajouter une inclusion"
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddInclusion}>Ajouter</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Exclusions</h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {tour.exclusions.map((item, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <span className="text-sm">{item}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-muted-foreground/20"
                          onClick={() => handleRemoveExclusion(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex gap-2">
                    <Input
                      value={newExclusion}
                      onChange={(e) => setNewExclusion(e.target.value)}
                      placeholder="Ajouter une exclusion"
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddExclusion}>Ajouter</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-madagascar-green hover:bg-madagascar-green/80" onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        {/* Onglet Itinéraire */}
        <TabsContent value="itinerary">
          <Card>
            <form>
              <CardHeader>
                <CardTitle>Itinéraire du circuit</CardTitle>
                <CardDescription>
                  Détaillez le programme jour par jour
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="p-4 border rounded-md space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Jour {day.day}: {day.title}</h3>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleMoveItineraryDayUp(index)}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleMoveItineraryDayDown(index)}
                          disabled={index === tour.itinerary.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                          onClick={() => handleRemoveItineraryDay(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <p className="text-sm">{day.description}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <Label>Hébergement</Label>
                        <p className="text-sm">{day.accommodation || "Non spécifié"}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Ajouter un jour</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dayTitle">Titre du jour</Label>
                    <Input 
                      id="dayTitle"
                      value={newItineraryDay.title}
                      onChange={(e) => setNewItineraryDay(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="ex: Arrivée à Morondava"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dayDescription">Description</Label>
                    <Textarea 
                      id="dayDescription"
                      value={newItineraryDay.description}
                      onChange={(e) => setNewItineraryDay(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description détaillée des activités du jour"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dayAccommodation">Hébergement</Label>
                    <Input 
                      id="dayAccommodation"
                      value={newItineraryDay.accommodation}
                      onChange={(e) => setNewItineraryDay(prev => ({ ...prev, accommodation: e.target.value }))}
                      placeholder="ex: Hôtel Palissandre, Morondava"
                    />
                  </div>
                  
                  <Button type="button" onClick={handleAddItineraryDay}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter ce jour
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-madagascar-green hover:bg-madagascar-green/80" onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        {/* Onglet Dates & Prix */}
        <TabsContent value="dates">
          <Card>
            <form>
              <CardHeader>
                <CardTitle>Tarifs et disponibilités</CardTitle>
                <CardDescription>
                  Définissez les dates de départ et les tarifs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix de base (€) *</Label>
                    <Input 
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      value={tour.price}
                      onChange={(e) => setTour(prev => ({ ...prev, price: Number(e.target.value) }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discount">Réduction (€)</Label>
                    <Input 
                      id="discount"
                      name="discount"
                      type="number"
                      min="0"
                      value={tour.discount || ''}
                      onChange={(e) => setTour(prev => ({ ...prev, discount: Number(e.target.value) || undefined }))}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Dates de départ programmées</h3>
                  </div>
                  
                  {tour.dates.length > 0 ? (
                    <div className="space-y-4">
                      {tour.dates.map((date, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div>
                            <div className="font-medium">{date.startDate} - {date.endDate}</div>
                            <div className="text-sm text-muted-foreground">
                              Disponibilité: 
                              {date.availability === 'available' && <span className="text-green-600"> Disponible</span>}
                              {date.availability === 'limited' && <span className="text-yellow-600"> Places limitées</span>}
                              {date.availability === 'full' && <span className="text-red-600"> Complet</span>}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                            onClick={() => handleRemoveDate(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-muted rounded-md">
                      <p className="text-muted-foreground">Aucune date programmée</p>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Ajouter une date</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Date de début</Label>
                        <Input 
                          id="startDate"
                          type="date"
                          value={newDate.startDate}
                          onChange={(e) => setNewDate(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="endDate">Date de fin</Label>
                        <Input 
                          id="endDate"
                          type="date"
                          value={newDate.endDate}
                          onChange={(e) => setNewDate(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="availability">Disponibilité</Label>
                        <Select 
                          value={newDate.availability}
                          onValueChange={(value) => setNewDate(prev => ({ ...prev, availability: value as 'available' | 'limited' | 'full' }))}
                        >
                          <SelectTrigger id="availability">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Disponible</SelectItem>
                            <SelectItem value="limited">Places limitées</SelectItem>
                            <SelectItem value="full">Complet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button type="button" onClick={handleAddDate}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ajouter cette date
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-madagascar-green hover:bg-madagascar-green/80" onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        {/* Onglet Médias */}
        <TabsContent value="media">
          <Card>
            <form>
              <CardHeader>
                <CardTitle>Images et médias</CardTitle>
                <CardDescription>
                  Ajoutez des photos pour mettre en valeur votre circuit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Images du circuit</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.images.map((image, index) => (
                      <div key={index} className="relative group overflow-hidden rounded-md">
                        <img 
                          src={image.url} 
                          alt={image.alt} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 bg-white hover:bg-white/90"
                            >
                              <FileImage className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 bg-white hover:bg-white/90 hover:text-red-600"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white">
                          <p className="text-xs truncate">{image.alt}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div 
                      className="border-2 border-dashed rounded-md flex items-center justify-center h-48 cursor-pointer hover:bg-muted/50"
                      onClick={handleAddImage}
                    >
                      <div className="text-center p-4">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground font-medium">Cliquez pour ajouter</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG ou GIF</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-madagascar-green hover:bg-madagascar-green/80" onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        {/* Onglet SEO */}
        <TabsContent value="seo">
          <Card>
            <form>
              <CardHeader>
                <CardTitle>Optimisation pour les moteurs de recherche</CardTitle>
                <CardDescription>
                  Améliorez la visibilité de ce circuit sur les moteurs de recherche
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">Titre SEO</Label>
                  <Input 
                    id="seoTitle"
                    name="seoTitle"
                    value={tour.seoTitle}
                    onChange={handleChange}
                    placeholder="ex: Circuit Avenue des Baobabs | North Madagascar Tours"
                  />
                  <p className="text-xs text-muted-foreground">
                    {tour.seoTitle.length}/60 caractères recommandés
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seoDescription">Meta description</Label>
                  <Textarea 
                    id="seoDescription"
                    name="seoDescription"
                    value={tour.seoDescription}
                    onChange={handleChange}
                    placeholder="Une description concise pour les résultats de recherche"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    {tour.seoDescription.length}/160 caractères recommandés
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seoKeywords">Mots-clés SEO</Label>
                  <Textarea 
                    id="seoKeywords"
                    name="seoKeywords"
                    value={tour.seoKeywords}
                    onChange={handleChange}
                    placeholder="Mots-clés séparés par des virgules"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">
                    Séparez les mots-clés par des virgules (ex: baobabs, madagascar, circuit)
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Aperçu dans les résultats de recherche</h3>
                  
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <p className="text-blue-600 text-lg">{tour.seoTitle || tour.name}</p>
                    <p className="text-green-700 text-sm">northgascartours.com › tours › {tour.id}</p>
                    <p className="text-sm line-clamp-2">{tour.seoDescription || tour.shortDescription}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="indexable"
                    checked={true}
                  />
                  <Label htmlFor="indexable">Autoriser l'indexation par les moteurs de recherche</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-madagascar-green hover:bg-madagascar-green/80" onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les modifications
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTourEditor;
