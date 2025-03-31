
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormAutoSave } from '@/hooks/useFormAutoSave';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { tourAPI } from '@/lib/store';
import { Tour } from '@/lib/db/schema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Clock, Save } from 'lucide-react';

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

type TourFormValues = z.infer<typeof tourSchema>;

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

  // Format the last saved time
  const formatLastSaved = (date: Date | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
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
        
        {lastSavedAt && (
          <div className="text-sm text-gray-500 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Auto-saved at {formatLastSaved(lastSavedAt)}
          </div>
        )}
      </div>

      {/* Alert dialog for restoring saved data */}
      {hasSavedData && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="mb-6">
              <Save className="h-4 w-4 mr-2" /> You have unsaved changes
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes from your previous session. Would you like to restore them or start fresh?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={clearSavedData}>Start Fresh</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => {
                  const savedData = formData;
                  form.reset(savedData);
                  toast({
                    title: 'Changes restored',
                    description: 'Your unsaved changes have been restored',
                  });
                }}>
                Restore Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tour Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tour title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="nature">Nature</SelectItem>
                          <SelectItem value="wildlife">Wildlife</SelectItem>
                          <SelectItem value="beach">Beach</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (€)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} min="0" step="0.01" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (days)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} min="1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="easy" />
                            </FormControl>
                            <FormLabel className="font-normal">Easy</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="medium" />
                            </FormControl>
                            <FormLabel className="font-normal">Medium</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="hard" />
                            </FormControl>
                            <FormLabel className="font-normal">Hard</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter tour description" className="min-h-32" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the tour.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    clearSavedData();
                    navigate('/admin/tours');
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Tour'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TourEditor;
