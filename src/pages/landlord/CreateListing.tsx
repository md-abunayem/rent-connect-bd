import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(100),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  property_type: z.enum(['house', 'apartment', 'room', 'shared_space']),
  location_address: z.string().min(5, 'Address is required'),
  location_city: z.string().min(2, 'City is required'),
  location_state: z.string().optional(),
  price_monthly: z.number().min(1, 'Price must be greater than 0'),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  area_sqft: z.number().min(1).optional(),
  amenities: z.array(z.string()).default([]),
});

type FormData = z.infer<typeof formSchema>;

const amenitiesList = [
  'WiFi', 'Air Conditioning', 'Heating', 'Parking', 'Balcony',
  'Garden', 'Furnished', 'Pet Friendly', 'Security', 'Gym',
  'Swimming Pool', 'Elevator', 'Laundry', 'Kitchen', 'Storage'
];

const CreateListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      property_type: 'apartment',
      location_address: '',
      location_city: '',
      location_state: '',
      price_monthly: 0,
      bedrooms: 1,
      bathrooms: 1,
      area_sqft: 0,
      amenities: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please log in to create a listing');
        navigate('/auth');
        return;
      }

      const { error } = await supabase.from('properties').insert({
        landlord_id: user.id,
        title: data.title,
        description: data.description,
        property_type: data.property_type,
        location_address: data.location_address,
        location_city: data.location_city,
        location_state: data.location_state,
        price_monthly: data.price_monthly,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area_sqft: data.area_sqft,
        amenities: data.amenities,
        status: 'draft',
      });

      if (error) throw error;

      toast.success('Property listing created successfully!');
      navigate('/landlord/listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate('/landlord/dashboard')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create Property Listing</CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Title *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Spacious 2BR Apartment in Dhaka" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your property in detail..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="property_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="room">Room</SelectItem>
                              <SelectItem value="shared_space">Shared Space</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Location & Pricing</h3>
                    
                    <FormField
                      control={form.control}
                      name="location_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="location_city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Dhaka" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location_state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Division</FormLabel>
                            <FormControl>
                              <Input placeholder="Optional" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="price_monthly"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Rent (BDT) *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="e.g., 25000"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Property Details</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bedrooms</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bathrooms</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="area_sqft"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area (sqft)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="amenities"
                      render={() => (
                        <FormItem>
                          <FormLabel>Amenities</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {amenitiesList.map((amenity) => (
                              <FormField
                                key={amenity}
                                control={form.control}
                                name="amenities"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(amenity)}
                                        onCheckedChange={(checked) => {
                                          const current = field.value || [];
                                          field.onChange(
                                            checked
                                              ? [...current, amenity]
                                              : current.filter((v) => v !== amenity)
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {amenity}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}
                  
                  {step < 3 ? (
                    <Button type="button" onClick={nextStep} className="ml-auto">
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={loading} className="ml-auto">
                      <Save className="mr-2 h-4 w-4" />
                      {loading ? 'Creating...' : 'Create Listing'}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateListing;
