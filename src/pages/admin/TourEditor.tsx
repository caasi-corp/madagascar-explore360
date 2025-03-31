
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormAutoSave } from '@/hooks/useFormAutoSave';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { tourAPI } from '@/lib/store';
import { Tour } from '@/lib/db/schema';

// Import form section components
import TourBasicInfoFields from '@/components/admin/tours/TourBasicInfoFields';
import TourCategorySelect from '@/components/admin/tours/TourCategorySelect';
import TourPricingFields from '@/components/admin/tours/TourPricingFields';
import TourOptionsFields from '@/components/admin/tours/TourOptionsFields';
import TourDescriptionField from '@/components/admin/tours/TourDescriptionField';
import TourFormActions from '@/components/admin/tours/TourFormActions';
import SavedDataAlert from '@/components/admin/tours/SavedDataAlert';
import AutoSaveIndicator from '@/components/admin/tours/AutoSaveIndicator';

// Tour Schema for form validation
const tourSchema = z.object({
  title: z.string().min(3, { message: 'Tour title is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  price: z.coerce.number().min(0),
  duration: z.coerce.number().min(1),
  category: z.string().min(1),
  location: z.string().min(1),
  featured: z.enum(['true', 'false']),
  difficulty: z.enum(['easy', 'medium', 'hard'])
});

export type TourFormValues = z.infer<typeof tourSchema>;

interface TourEditorProps {
  useCategories?: boolean;
}

const initialFormState: TourFormValues = {
  title: '',
  description: '',
  price: 0,
  duration: 1,
  category: 'adventure',
  location: '',
  featured: 'false',
  difficulty: 'medium'
};

const TourEditor: React.FC<TourEditorProps> = ({ useCategories = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize the form with our hook for auto-save
  const { formData, updateFormData, clearSavedData, lastSavedAt, hasSavedData } = useFormAutoSave<TourFormValues>(
    'tour-editor',
    initialFormState,
    5000 // Auto-save every 5 seconds
  );

  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues: formData
  });

  // This effect will run whenever form data changes via the form's onChange
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value as TourFormValues);
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormData]);

  // Load tour data from API if editing an existing tour
  useEffect(() => {
    if (id && id !== 'new') {
      setIsLoading(true);
      tourAPI.getById(id)
        .then((tour) => {
          if (tour) {
            // Convert tour data to form format
            const formData: TourFormValues = {
              title: tour.title,
              description: tour.description,
              location: tour.location,
              category: tour.category || 'adventure',
              // Convert string to number for form fields
              price: typeof tour.price === 'string' ? parseFloat(tour.price) : tour.price,
              // Safely convert duration to number regardless of its type
              duration: typeof tour.duration === 'string' ? parseInt(tour.duration) : Number(tour.duration),
              featured: tour.featured ? 'true' : 'false',
              difficulty: tour.difficulty || 'medium'
            };
            
            form.reset(formData);
            updateFormData(formData);
          }
        })
        .catch((error) => {
          console.error('Error loading tour:', error);
          toast({
            title: 'Error',
            description: 'Failed to load tour data',
            variant: 'destructive',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, form]);

  const onSubmit = async (data: TourFormValues) => {
    setIsSubmitting(true);
    try {
      // Create partial tour data for update or complete tour data for new
      if (id && id !== 'new') {
        // For updates, we only need to send the fields being updated
        const tourData: Partial<Tour> = {
          title: data.title,
          description: data.description,
          location: data.location,
          category: data.category,
          price: data.price,
          // Convert number to string for API
          duration: data.duration.toString(),
          featured: data.featured === 'true',
          difficulty: data.difficulty
        };
        
        await tourAPI.update(id, tourData);
        toast({
          title: 'Success',
          description: 'Tour updated successfully',
        });
      } else {
        // For new tours, we need to provide all required fields
        const tourData: Omit<Tour, 'id'> = {
          title: data.title,
          description: data.description,
          location: data.location,
          category: data.category,
          price: data.price,
          // Convert number to string for API
          duration: data.duration.toString(),
          featured: data.featured === 'true',
          difficulty: data.difficulty,
          // Default values for required fields
          rating: 0,
          image: 'placeholder.svg'
        };
        
        await tourAPI.add(tourData);
        toast({
          title: 'Success',
          description: 'Tour created successfully',
        });
      }
      
      // Clear saved data after successful submission
      clearSavedData();
      navigate('/admin/tours');
    } catch (error) {
      console.error('Error saving tour:', error);
      toast({
        title: 'Error',
        description: 'Failed to save tour',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    clearSavedData();
    navigate('/admin/tours');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading tour data...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {useCategories ? 'Tour Categories Editor' : id && id !== 'new' ? 'Edit Tour' : 'Create New Tour'}
        </h1>
        
        <AutoSaveIndicator lastSavedAt={lastSavedAt} />
      </div>

      {/* Alert dialog for restoring saved data */}
      {hasSavedData && (
        <SavedDataAlert 
          formData={formData}
          clearSavedData={clearSavedData}
          form={form}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tour Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TourBasicInfoFields form={form} />
                <TourCategorySelect form={form} />
                <TourPricingFields form={form} />
                <TourOptionsFields form={form} />
              </div>

              <TourDescriptionField form={form} />

              <TourFormActions 
                isSubmitting={isSubmitting}
                onCancel={handleCancel}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TourEditor;
