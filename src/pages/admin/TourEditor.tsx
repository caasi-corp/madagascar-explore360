import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
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
  Upload
} from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  location: string;
  images: string[];
  price: number;
  discount: number;
  maxGroupSize: number;
  isFeatured: boolean;
  itinerary: { day: number; description: string }[];
  tags: string[];
  highlights: string[];
}

const TourEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tour, setTour] = useState<Tour>({
    id: '',
    title: '',
    description: '',
    category: '',
    duration: '',
    location: '',
    images: [],
    price: 0,
    discount: 0,
    maxGroupSize: 0,
    isFeatured: false,
    itinerary: [],
    tags: [],
    highlights: [],
  });

  const [newItineraryItem, setNewItineraryItem] = useState({ day: 1, description: '' });
  const [newTag, setNewTag] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock tour categories
  const tourCategories = ['Adventure', 'Cultural', 'Relaxation', 'Hiking', 'City Tour'];

  // Mock image upload function
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploading(true);
      let uploadedImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Simulate upload with a promise and progress update
        await new Promise<void>((resolve) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
              clearInterval(interval);
              // Simulate a URL after successful upload
              uploadedImages.push(`https://example.com/images/tour-${Date.now()}-${file.name}`);
              resolve();
            }
          }, 100);
        });
      }
      
      setTour(prevTour => ({
        ...prevTour,
        images: [...prevTour.images, ...uploadedImages],
      }));
      setUploading(false);
      setUploadProgress(0);
      toast.success('Images uploaded successfully!');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setTour(prevTour => ({
      ...prevTour,
      [name]: newValue,
    }));
  };

  const handleItineraryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItineraryItem(prev => ({ ...prev, [name]: value }));
  };

  const addItineraryItem = () => {
    setTour(prevTour => ({
      ...prevTour,
      itinerary: [...prevTour.itinerary, newItineraryItem],
    }));
    setNewItineraryItem({ day: 1, description: '' });
  };

  const removeItineraryItem = (index: number) => {
    setTour(prevTour => ({
      ...prevTour,
      itinerary: prevTour.itinerary.filter((_, i) => i !== index),
    }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const addTag = () => {
    if (newTag.trim() !== '') {
      setTour(prevTour => ({
        ...prevTour,
        tags: [...prevTour.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTour(prevTour => ({
      ...prevTour,
      tags: prevTour.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHighlight(e.target.value);
  };

  const addHighlight = () => {
    if (newHighlight.trim() !== '') {
      setTour(prevTour => ({
        ...prevTour,
        highlights: [...prevTour.highlights, newHighlight.trim()],
      }));
      setNewHighlight('');
    }
  };

  const removeHighlight = (highlightToRemove: string) => {
    setTour(prevTour => ({
      ...prevTour,
      highlights: prevTour.highlights.filter(highlight => highlight !== highlightToRemove),
    }));
  };

  const removeImage = (imageToRemove: string) => {
    setTour(prevTour => ({
      ...prevTour,
      images: prevTour.images.filter(image => image !== imageToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the tour data to your backend
    console.log('Tour data submitted:', tour);
    toast.success('Tour saved successfully!');
  };

  return (
    <div>
      <div className="mb-4">
        <Link to="/admin/tours" className="flex items-center text-sm font-medium hover:underline">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Tours
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{id ? 'Edit Tour' : 'Create New Tour'}</CardTitle>
          <CardDescription>Manage tour details and settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="additional">Additional</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={tour.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setTour(prevTour => ({ ...prevTour, category: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" defaultValue={tour.category} />
                    </SelectTrigger>
                    <SelectContent>
                      {tourCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={tour.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={tour.duration}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={tour.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGroupSize">Max Group Size</Label>
                  <Input
                    id="maxGroupSize"
                    name="maxGroupSize"
                    type="number"
                    value={tour.maxGroupSize}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={tour.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    value={tour.discount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="itinerary">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Itinerary Items</h3>
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Day {item.day}:</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItineraryItem(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="day">Day</Label>
                    <Input
                      type="number"
                      id="day"
                      name="day"
                      value={newItineraryItem.day}
                      onChange={handleItineraryChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newItineraryItem.description}
                      onChange={handleItineraryChange}
                    />
                  </div>
                </div>
                <Button onClick={addItineraryItem} className="bg-madagascar-green hover:bg-madagascar-green/80">
                  <Plus className="mr-2 h-4 w-4" /> Add Itinerary Item
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="media">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tour Images</h3>
                <div className="grid grid-cols-3 gap-4">
                  {tour.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Tour Image ${index + 1}`} className="rounded-md" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/50 hover:bg-background/80"
                        onClick={() => removeImage(image)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {uploading ? (
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-madagascar-green/20">
                      <div style={{ width: `${uploadProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-madagascar-green transition-all duration-500"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
                  </div>
                ) : (
                  <>
                    <Label htmlFor="imageUpload">
                      <div className="cursor-pointer flex items-center justify-center w-full p-3 border-2 border-dashed rounded-md text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
                        <FileImage className="mr-2 h-4 w-4" />
                        Upload Images
                      </div>
                    </Label>
                    <Input
                      type="file"
                      id="imageUpload"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="additional">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      id="tags"
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={handleTagChange}
                    />
                    <Button type="button" size="sm" onClick={addTag} className="bg-madagascar-green hover:bg-madagascar-green/80">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tour.tags.map((tag, index) => (
                      <div key={index} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {tag}
                        <Button variant="ghost" size="icon" onClick={() => removeTag(tag)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="highlights">Highlights</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      id="highlights"
                      placeholder="Add a highlight"
                      value={newHighlight}
                      onChange={handleHighlightChange}
                    />
                    <Button type="button" size="sm" onClick={addHighlight} className="bg-madagascar-green hover:bg-madagascar-green/80">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.map((highlight, index) => (
                      <div key={index} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {highlight}
                        <Button variant="ghost" size="icon" onClick={() => removeHighlight(highlight)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="isFeatured">Is Featured?</Label>
                  <Switch
                    id="isFeatured"
                    name="isFeatured"
                    checked={tour.isFeatured}
                    onCheckedChange={(checked) => setTour(prevTour => ({ ...prevTour, isFeatured: checked }))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline" onClick={() => navigate('/admin/tours')}>Cancel</Button>
          <Button className="bg-madagascar-green hover:bg-madagascar-green/80" onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" /> Save Tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TourEditor;
