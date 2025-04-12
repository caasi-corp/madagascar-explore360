
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CruiseFormHeader from '@/components/admin/catamaran/CruiseFormHeader';
import GeneralInfoSection from '@/components/admin/catamaran/GeneralInfoSection';
import ProgramSection from '@/components/admin/catamaran/ProgramSection';
import ImageSection from '@/components/admin/catamaran/ImageSection';
import GallerySection from '@/components/admin/catamaran/GallerySection';
import PublishSettingsSection from '@/components/admin/catamaran/PublishSettingsSection';
import { toast } from 'sonner';

const CatamaranCruiseEditor = () => {
  const { id } = useParams();
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
  const addItem = (field: keyof typeof formData, value: string) => {
    if (value.trim() === "") return;
    setFormData({
      ...formData,
      [field]: [...(formData[field] as string[]), value]
    });
  };
  
  // Fonction pour supprimer un élément d'un tableau
  const removeItem = (field: keyof typeof formData, index: number) => {
    const newArray = [...(formData[field] as any[])];
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
  const updateItineraryItem = (index: number, field: "time" | "description", value: string) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index][field] = value;
    setFormData({
      ...formData,
      itinerary: newItinerary
    });
  };
  
  // Fonction pour supprimer un élément de l'itinéraire
  const removeItineraryItem = (index: number) => {
    const newItinerary = [...formData.itinerary];
    newItinerary.splice(index, 1);
    setFormData({
      ...formData,
      itinerary: newItinerary
    });
  };

  // Fonctions de gestion des événements
  const handleSave = () => {
    // Logic to save the form data
    toast.success("Croisière enregistrée avec succès");
  };

  const handleDelete = () => {
    // Logic to delete the cruise
    toast.error("Croisière supprimée");
  };

  const handleBrowseFiles = () => {
    // Logic to browse files
    toast.info("Fonctionnalité de parcours des fichiers non implémentée");
  };
  
  return (
    <div className="space-y-6">
      <CruiseFormHeader 
        isEditMode={isEditMode}
        isActive={formData.isActive}
        onActiveChange={(checked) => setFormData({...formData, isActive: checked})}
        onDelete={handleDelete}
        onSave={handleSave}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GeneralInfoSection 
            name={formData.name}
            destination={formData.destination}
            catamaran={formData.catamaran}
            duration={formData.duration}
            price={formData.price}
            shortDescription={formData.shortDescription}
            description={formData.description}
            onNameChange={(value) => setFormData({...formData, name: value})}
            onDestinationChange={(value) => setFormData({...formData, destination: value})}
            onCatamaranChange={(value) => setFormData({...formData, catamaran: value})}
            onDurationChange={(value) => setFormData({...formData, duration: value})}
            onPriceChange={(value) => setFormData({...formData, price: value})}
            onShortDescriptionChange={(value) => setFormData({...formData, shortDescription: value})}
            onDescriptionChange={(value) => setFormData({...formData, description: value})}
          />
          
          <ProgramSection 
            itinerary={formData.itinerary}
            includes={formData.includes}
            excludes={formData.excludes}
            onAddItineraryItem={addItineraryItem}
            onRemoveItineraryItem={removeItineraryItem}
            onUpdateItineraryItem={updateItineraryItem}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        </div>
        
        <div className="space-y-6">
          <ImageSection 
            title="Image principale"
            image={formData.image}
            onImageChange={(value) => setFormData({...formData, image: value})}
            onImageRemove={() => setFormData({...formData, image: ""})}
            onBrowseFiles={handleBrowseFiles}
          />
          
          <GallerySection 
            gallery={formData.gallery}
            onAddImage={(url) => addItem("gallery", url)}
            onRemoveImage={(index) => removeItem("gallery", index)}
            onBrowseFiles={handleBrowseFiles}
          />
          
          <PublishSettingsSection 
            isActive={formData.isActive}
            onStatusChange={(value) => setFormData({...formData, isActive: value === "active"})}
          />
        </div>
      </div>
    </div>
  );
};

export default CatamaranCruiseEditor;
