
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tour } from '@/lib/db/schema';
import { tourAPI } from '@/lib/store';

// Import refactored components
import TourDetailLoading from '@/components/tour/TourDetailLoading';
import TourNotFound from '@/components/tour/TourNotFound';
import TourDetailHero from '@/components/tour/TourDetailHero';
import TourAboutTab from '@/components/tour/TourAboutTab';
import TourItineraryTab from '@/components/tour/TourItineraryTab';
import TourDetailsTab from '@/components/tour/TourDetailsTab';
import TourBookingSidebar from '@/components/tour/TourBookingSidebar';
import RelatedTours from '@/components/tour/RelatedTours';

const TourDetail = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [relatedTours, setRelatedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true);
        if (!tourId) return;
        
        console.log('Chargement du circuit avec ID:', tourId);
        const tourData = await tourAPI.getById(tourId);
        console.log('Données du circuit récupérées:', tourData);
        setTour(tourData);
        
        // Convert limit to a number to fix the TypeScript error
        const limitNumber = 3; // Default related tours limit
        
        if (tourData?.category) {
          const related = await tourAPI.getRelated(tourId, limitNumber);
          setRelatedTours(related);
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du circuit",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
    // Scroll to top when component mounts or tourId changes
    window.scrollTo(0, 0);
  }, [tourId, toast]);

  if (loading) {
    return <TourDetailLoading />;
  }

  if (!tour) {
    return <TourNotFound />;
  }

  return (
    <div className="pt-16 pb-16">
      {/* Hero section with large image */}
      <TourDetailHero tour={tour} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left content - main information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="itinerary">Itinéraire</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <TourAboutTab tour={tour} />
              </TabsContent>
              
              <TabsContent value="itinerary">
                <TourItineraryTab />
              </TabsContent>
              
              <TabsContent value="details">
                <TourDetailsTab />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right sidebar - booking and details */}
          <div>
            <TourBookingSidebar tour={tour} />
          </div>
        </div>
        
        {/* Related tours section */}
        <RelatedTours tours={relatedTours} />
      </div>
    </div>
  );
};

export default TourDetail;
