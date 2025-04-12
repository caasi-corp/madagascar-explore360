
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Ship, Map, Calendar, Clock, Users, ArrowLeft, Save, Trash, Plus, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const CatamaranCruiseEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== 'new';
  
  // État initial pour le formulaire
  const [formData, setFormData] = useState({
    name: isEditMode ? "Découverte de la Baie de Nosy Be" : "",
    destination: isEditMode ? "Nosy Be" : "",
    duration: isEditMode ? "1" : "",
    price: isEditMode ? "180" : "",
    catamaran: isEditMode ? "Paradis Bleu" : "",
    description: isEditMode ? "Explorez les eaux cristallines autour de Nosy Be à bord d'un catamaran de luxe." : "",
    shortDescription: isEditMode ? "Une journée inoubliable en catamaran" : "",
    includes: isEditMode ? ["Déjeuner à bord", "Équipement de snorkeling", "Boissons non alcoolisées"] : [],
    excludes: isEditMode ? ["Transfert hôtel", "Pourboires", "Assurance voyage"] : [],
    isActive: isEditMode ? true : false,
    image: isEditMode ? "https://images.unsplash.com/photo-1540541338287-41700207dee6" : "",
    gallery: isEditMode ? [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
    ] : [],
    itinerary: isEditMode ? [
      { time: "09:00", description: "Embarquement au port de Nosy Be" },
      { time: "10:30", description: "Navigation vers les spots de snorkeling" },
      { time: "12:30", description: "Déjeuner à bord" },
      { time: "14:00", description: "Baignade et détente sur une plage déserte" },
      { time: "16:30", description: "Retour au port" }
    ] : []
  });
  
  // Fonction pour ajouter un élément à un tableau
  const addItem = (field, value) => {
    if (value.trim() === "") return;
    setFormData({
      ...formData,
      [field]: [...formData[field], value]
    });
  };
  
  // Fonction pour supprimer un élément d'un tableau
  const removeItem = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };
  
  // Fonction pour ajouter un élément à l'itinéraire
  const addItineraryItem = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { time: "", description: "" }]
    });
  };
  
  // Fonction pour mettre à jour un élément de l'itinéraire
  const updateItineraryItem = (index, field, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index][field] = value;
    setFormData({
      ...formData,
      itinerary: newItinerary
    });
  };
  
  // Fonction pour supprimer un élément de l'itinéraire
  const removeItineraryItem = (index) => {
    const newItinerary = [...formData.itinerary];
    newItinerary.splice(index, 1);
    setFormData({
      ...formData,
      itinerary: newItinerary
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/catamaran-cruises')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{isEditMode ? 'Modifier la croisière' : 'Nouvelle croisière'}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="active" 
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
            />
            <Label htmlFor="active">Activer cette croisière</Label>
          </div>
          <Button variant="destructive" className="gap-1">
            <Trash className="h-4 w-4" /> Supprimer
          </Button>
          <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80 gap-1">
            <Save className="h-4 w-4" /> Enregistrer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la croisière</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nom de la croisière"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select
                    value={formData.destination}
                    onValueChange={(value) => setFormData({...formData, destination: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nosy Be">Nosy Be</SelectItem>
                      <SelectItem value="Archipel de Mitsio">Archipel de Mitsio</SelectItem>
                      <SelectItem value="Nosy Komba">Nosy Komba</SelectItem>
                      <SelectItem value="Îles Radama">Îles Radama</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="catamaran">Catamaran</Label>
                  <Select
                    value={formData.catamaran}
                    onValueChange={(value) => setFormData({...formData, catamaran: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un catamaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paradis Bleu">Paradis Bleu</SelectItem>
                      <SelectItem value="Océan Nomade">Océan Nomade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée (jours)</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({...formData, duration: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 jour</SelectItem>
                      <SelectItem value="2">2 jours</SelectItem>
                      <SelectItem value="3">3 jours</SelectItem>
                      <SelectItem value="5">5 jours</SelectItem>
                      <SelectItem value="7">7 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Prix par personne (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Prix"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Description courte</Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  placeholder="Description courte pour les listes"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description complète</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Description détaillée de la croisière"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Programme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  Itinéraire
                </Label>
                <ScrollArea className="max-h-[300px] pr-4">
                  {formData.itinerary.map((item, index) => (
                    <div key={index} className="flex items-start mb-3">
                      <Input
                        className="w-24 mr-2"
                        value={item.time}
                        onChange={(e) => updateItineraryItem(index, "time", e.target.value)}
                        placeholder="Heure"
                      />
                      <Input
                        className="flex-1 mr-2"
                        value={item.description}
                        onChange={(e) => updateItineraryItem(index, "description", e.target.value)}
                        placeholder="Description"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeItineraryItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={addItineraryItem}
                >
                  <Plus className="mr-2 h-4 w-4" /> Ajouter une étape
                </Button>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Plus className="mr-2 h-4 w-4 text-muted-foreground" />
                    Inclus
                  </Label>
                  <div className="space-y-2">
                    {formData.includes.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span className="flex-1">{item}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem("includes", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input 
                        id="includeItem" 
                        placeholder="Ajouter un élément"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addItem("includes", e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      <Button 
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById("includeItem");
                          addItem("includes", input.value);
                          input.value = "";
                        }}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <X className="mr-2 h-4 w-4 text-muted-foreground" />
                    Non inclus
                  </Label>
                  <div className="space-y-2">
                    {formData.excludes.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span className="flex-1">{item}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem("excludes", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input 
                        id="excludeItem" 
                        placeholder="Ajouter un élément"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addItem("excludes", e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      <Button 
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById("excludeItem");
                          addItem("excludes", input.value);
                          input.value = "";
                        }}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Image principale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.image && (
                <div className="relative mb-4">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-destructive"
                    onClick={() => setFormData({...formData, image: ""})}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="mainImage">URL de l'image</Label>
                <Input 
                  id="mainImage" 
                  placeholder="URL de l'image" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>
              <Button variant="outline" className="w-full">
                Parcourir les fichiers
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Galerie d'images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {formData.gallery.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Galerie ${index + 1}`} 
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-1 right-1 bg-white/80 hover:bg-white text-destructive h-6 w-6"
                      onClick={() => removeItem("gallery", index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="galleryImage">Ajouter une image</Label>
                <div className="flex gap-2">
                  <Input 
                    id="galleryImage" 
                    placeholder="URL de l'image"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addItem("gallery", e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const input = document.getElementById("galleryImage");
                      addItem("gallery", input.value);
                      input.value = "";
                    }}
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Parcourir les fichiers
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select
                  value={formData.isActive ? "active" : "inactive"}
                  onValueChange={(value) => setFormData({...formData, isActive: value === "active"})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Statut de publication" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CatamaranCruiseEditor;
