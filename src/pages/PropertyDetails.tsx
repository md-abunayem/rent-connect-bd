import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Star, Shield, CheckCircle, Calendar, Users, Car, Wifi, Dumbbell, Coffee, Phone, Mail, MessageCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import PropertyCard from '@/components/PropertyCard';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<any>(null);
  const [landlordProfile, setLandlordProfile] = useState<any>(null);
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);

      // Fetch property details
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (propertyError) throw propertyError;

      // Fetch landlord profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', propertyData.landlord_id)
        .single();

      // Fetch similar properties (same city, different ID)
      const { data: similarData } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .eq('location_city', propertyData.location_city)
        .neq('id', id)
        .limit(3);

      // Transform property data
      const transformedProperty = {
        id: propertyData.id,
        title: propertyData.title,
        location: `${propertyData.location_address}, ${propertyData.location_city}`,
        price: propertyData.price_monthly,
        images: propertyData.images || [],
        rating: 4.5,
        reviews: 0,
        type: propertyData.property_type,
        verified: propertyData.is_verified,
        features: [
          propertyData.bedrooms && `${propertyData.bedrooms} Bedrooms`,
          propertyData.bathrooms && `${propertyData.bathrooms} Bathrooms`,
          ...(propertyData.amenities || [])
        ].filter(Boolean),
        description: propertyData.description,
        amenities: (propertyData.amenities || []).map((amenity: string) => ({
          icon: Wifi,
          label: amenity
        })),
        landlord: {
          name: profileData?.full_name || 'Property Owner',
          avatar: '',
          rating: 4.5,
          reviews: 0,
          responseTime: '2 hours',
          verified: profileData?.verification_status === 'verified',
          joinedDate: new Date(profileData?.created_at || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        },
        details: {
          bedrooms: propertyData.bedrooms || 0,
          bathrooms: propertyData.bathrooms || 0,
          area: propertyData.area_sqft ? `${propertyData.area_sqft} sq ft` : 'N/A',
          floor: 'N/A',
          facing: 'N/A',
          availability: propertyData.available_from ? new Date(propertyData.available_from).toLocaleDateString() : 'Available Now',
        }
      };

      // Transform similar properties
      const transformedSimilar = (similarData || []).map((prop: any) => ({
        id: prop.id,
        title: prop.title,
        location: `${prop.location_address}, ${prop.location_city}`,
        price: prop.price_monthly,
        images: prop.images || [],
        rating: 4.5,
        reviews: 0,
        type: prop.property_type,
        verified: prop.is_verified,
        features: [
          prop.bedrooms && `${prop.bedrooms} Bedrooms`,
          prop.bathrooms && `${prop.bathrooms} Bathrooms`,
        ].filter(Boolean),
      }));

      setProperty(transformedProperty);
      setLandlordProfile(profileData);
      setSimilarProperties(transformedSimilar);
    } catch (error) {
      console.error('Error fetching property details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/search')}>Browse Properties</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to search
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img 
                  src={property.images[selectedImage] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'} 
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="sm" className="bg-background/80 backdrop-blur-sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                
                {property.verified && (
                  <div className="absolute top-4 left-4">
                    <div className="verified-badge">
                      <Shield className="w-3 h-3" />
                      Verified
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {property.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Property ${index + 1}`}
                      className={`w-20 h-16 object-cover rounded cursor-pointer transition-all ${
                        selectedImage === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{property.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{property.rating}</span>
                        <span className="text-muted-foreground">({property.reviews} reviews)</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{property.title}</CardTitle>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      ৳{property.price.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">per month</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Property Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{property.details.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{property.details.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{property.details.area}</div>
                    <div className="text-sm text-muted-foreground">Area</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{property.details.floor}</div>
                    <div className="text-sm text-muted-foreground">Floor</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{property.details.facing}</div>
                    <div className="text-sm text-muted-foreground">Facing</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold text-accent">{property.details.availability}</div>
                    <div className="text-sm text-muted-foreground">Availability</div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>

                <Separator />

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map((amenity: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <amenity.icon className="w-5 h-5 text-primary" />
                        <span>{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Landlord Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Landlord Profile
                  {property.landlord.verified && (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={property.landlord.avatar} />
                    <AvatarFallback>{property.landlord.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{property.landlord.name}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{property.landlord.rating}</span>
                      <span>({property.landlord.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response time:</span>
                    <span>{property.landlord.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span>{property.landlord.joinedDate}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      placeholder="Your phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="I'm interested in this property..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => navigate(`/apply/${id}`)}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;