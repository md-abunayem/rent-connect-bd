import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Star, Shield, CheckCircle, Calendar, Users, Car, Wifi, Dumbbell, Coffee, Phone, Mail, MessageCircle } from 'lucide-react';
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

// Mock data - in real app this would come from API/database
const propertyData = {
  id: '1',
  title: 'Modern 3-Bedroom Apartment in Gulshan',
  location: 'Gulshan 2, Dhaka',
  price: 45000,
  images: [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80',
  ],
  rating: 4.8,
  reviews: 24,
  type: 'Apartment',
  verified: true,
  features: ['3 Bedrooms', '2 Bathrooms', 'Balcony', 'Parking', 'WiFi', 'Gym Access'],
  description: 'Experience luxury living in this beautifully designed 3-bedroom apartment located in the heart of Gulshan. This modern unit features contemporary furnishing, ample natural light, and premium amenities. Perfect for professionals and families seeking comfort and convenience in Dhaka\'s most prestigious neighborhood.',
  amenities: [
    { icon: Wifi, label: 'High-Speed WiFi' },
    { icon: Car, label: 'Parking Space' },
    { icon: Dumbbell, label: 'Gym Access' },
    { icon: Coffee, label: 'Kitchen Appliances' },
  ],
  landlord: {
    name: 'Ahmed Rahman',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    rating: 4.9,
    reviews: 47,
    responseTime: '2 hours',
    verified: true,
    joinedDate: 'March 2020',
  },
  details: {
    bedrooms: 3,
    bathrooms: 2,
    area: '1200 sq ft',
    floor: '8th Floor',
    facing: 'South-East',
    availability: 'Available Now',
  }
};

const similarProperties = [
  {
    id: '2',
    title: 'Cozy 2-Bedroom in Dhanmondi',
    location: 'Dhanmondi 15, Dhaka',
    price: 35000,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80'],
    rating: 4.6,
    reviews: 18,
    type: 'Apartment',
    verified: true,
    features: ['2 Bedrooms', '1 Bathroom', 'Balcony'],
  },
  {
    id: '3',
    title: 'Luxury Studio in Banani',
    location: 'Banani DOHS, Dhaka',
    price: 28000,
    images: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&q=80'],
    rating: 4.7,
    reviews: 31,
    type: 'Studio',
    verified: true,
    features: ['Studio', '1 Bathroom', 'Furnished'],
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '', email: '' });

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
                  src={propertyData.images[selectedImage]} 
                  alt={propertyData.title}
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
                
                {propertyData.verified && (
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
                  {propertyData.images.map((image, index) => (
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
                      <Badge variant="secondary">{propertyData.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{propertyData.rating}</span>
                        <span className="text-muted-foreground">({propertyData.reviews} reviews)</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{propertyData.title}</CardTitle>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{propertyData.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      ৳{propertyData.price.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">per month</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Property Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{propertyData.details.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{propertyData.details.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{propertyData.details.area}</div>
                    <div className="text-sm text-muted-foreground">Area</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{propertyData.details.floor}</div>
                    <div className="text-sm text-muted-foreground">Floor</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">{propertyData.details.facing}</div>
                    <div className="text-sm text-muted-foreground">Facing</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold text-accent">Available</div>
                    <div className="text-sm text-muted-foreground">Status</div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{propertyData.description}</p>
                </div>

                <Separator />

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {propertyData.amenities.map((amenity, index) => (
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
                  {propertyData.landlord.verified && (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={propertyData.landlord.avatar} />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{propertyData.landlord.name}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{propertyData.landlord.rating}</span>
                      <span>({propertyData.landlord.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response time:</span>
                    <span>{propertyData.landlord.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span>{propertyData.landlord.joinedDate}</span>
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